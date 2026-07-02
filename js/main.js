/* Entry point: scene, camera, controls, render loop, camera presets,
   and the glue between state changes and highlight resolution. */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildBody, resolveHighlights, updateHighlights } from './body-model.js';
import { initInteractions, updateHover } from './interactions.js';
import { initUI } from './ui.js';
import { subscribe, getState } from './state.js';
import { MUSCLES } from './muscle-data.js';
import { EXERCISES, SPLITS } from './exercise-data.js';

/* ------------------------------------------------- data sanity checks */

EXERCISES.forEach(ex => {
  [...ex.primaryMuscles, ...ex.secondaryMuscles].forEach(id => {
    console.assert(MUSCLES[id], `exercise "${ex.id}" references unknown muscle "${id}"`);
  });
});
Object.values(SPLITS).forEach(s => {
  s.muscles.forEach(id =>
    console.assert(MUSCLES[id], `split "${s.id}" references unknown muscle "${id}"`));
});

const exercisesById = {};
EXERCISES.forEach(ex => { exercisesById[ex.id] = ex; });

/* --------------------------------------------------------- three.js */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 50);

const TARGET = new THREE.Vector3(0, 0.95, 0);
const VIEWS = {
  initial: new THREE.Vector3(1.5, 1.3, 2.75),
  front: new THREE.Vector3(0, 1.0, 3.1),
  back: new THREE.Vector3(0, 1.0, -3.1)
};
camera.position.copy(viewFor('initial'));

/* Size the canvas to the area NOT covered by UI (desktop: right panel,
   mobile: bottom sheet) so the body sits centred in what the user can
   actually see, with a straight-on, on-axis projection. */
function layout() {
  const w = window.innerWidth, h = window.innerHeight;
  const desktop = window.matchMedia('(min-width: 861px)').matches;
  const vw = desktop ? w - 412 : w;
  const vh = desktop ? h : Math.round(h * 0.66);
  renderer.setSize(vw, vh);
  camera.aspect = vw / vh;
  camera.updateProjectionMatrix();
}

const controls = new OrbitControls(camera, canvas);
controls.target.copy(TARGET);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 1.4;
controls.maxDistance = 6;
controls.maxPolarAngle = Math.PI * 0.92;
controls.update();

/* lights — warm key from the front, a real key for the back view,
   cool rim for separation from the dark backdrop */
scene.add(new THREE.HemisphereLight(0xbfb3a8, 0x24201c, 0.85));
const key = new THREE.DirectionalLight(0xfff1e0, 1.5);
key.position.set(2, 4, 3);
scene.add(key);
const backKey = new THREE.DirectionalLight(0xffe9d6, 1.1);
backKey.position.set(-1.5, 3.5, -3);
scene.add(backKey);
const rim = new THREE.DirectionalLight(0x8f9bff, 0.35);
rim.position.set(-3, 2, 0);
scene.add(rim);

/* ground disc for spatial grounding */
const ground = new THREE.Mesh(
  new THREE.CircleGeometry(1.1, 48),
  new THREE.MeshStandardMaterial({ color: 0x14161b, roughness: 1 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0.002;
scene.add(ground);

/* the body (async: loads the GLB) */
const loadingEl = document.getElementById('loading');
const body = await buildBody(reduceMotion);
scene.add(body);
if (loadingEl) loadingEl.remove();
if (new URLSearchParams(location.search).has('debug')) {
  window.__body = body;
  window.__THREE = THREE;
}

/* -------------------------------------------------- camera presets */

let camTween = null;

/* Small screens get a touch more distance for comfortable framing. */
function viewFor(view) {
  const scale = window.matchMedia('(max-width: 860px)').matches ? 1.15 : 1;
  return VIEWS[view].clone().multiplyScalar(scale);
}

function flyTo(view) {
  idle = false;
  if (reduceMotion) {
    camera.position.copy(viewFor(view));
    controls.target.copy(TARGET);
    body.rotation.y = 0;
    return;
  }
  camTween = {
    from: camera.position.clone(),
    to: viewFor(view),
    fromRot: body.rotation.y,
    start: performance.now(),
    dur: 550
  };
}

document.querySelectorAll('[data-view]').forEach(btn => {
  btn.addEventListener('click', () => flyTo(btn.dataset.view));
});

function updateCamTween(now) {
  if (!camTween) return;
  const t = Math.min(1, (now - camTween.start) / camTween.dur);
  const e = 1 - Math.pow(1 - t, 3); // ease-out cubic
  camera.position.lerpVectors(camTween.from, camTween.to, e);
  controls.target.lerp(TARGET, e);
  body.rotation.y = camTween.fromRot * (1 - e);
  if (t >= 1) camTween = null;
}

/* cancel a fly-to as soon as the user grabs the model */
canvas.addEventListener('pointerdown', () => { camTween = null; });

/* ---------------------------------------------------------- wiring */

initUI();
initInteractions(canvas, camera, document.getElementById('tooltip'));

subscribe(state => resolveHighlights(state, exercisesById, SPLITS));
resolveHighlights(getState(), exercisesById, SPLITS);

/* idle drift: a very slow rotation until the user first interacts */
let idle = !reduceMotion;
canvas.addEventListener('pointerdown', () => { idle = false; }, { once: true });

window.addEventListener('resize', layout);
layout();

renderer.setAnimationLoop(now => {
  if (idle) body.rotation.y = Math.sin(now * 0.0002) * 0.35;
  updateCamTween(now);
  controls.update();
  updateHover();
  updateHighlights();
  renderer.render(scene, camera);
});
