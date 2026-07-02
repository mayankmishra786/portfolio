/* Loads the realistic écorché body (gym/assets/body.glb) and overlays
   invisible per-muscle "hotspot" volumes built from primitives.

   The GLB is one fused mesh, so it can't be picked per muscle; the
   hotspots do that job: they are raycast targets (raycasting ignores
   visibility) and, when a muscle is hovered/selected/highlighted, they
   render as a translucent glow hugging that region of the model.

   Open the page with ?debug to see all hotspot volumes faintly, for
   alignment tuning.

   Normalized space: ground y=0, body 1.8 tall, facing +Z. */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const DEBUG = typeof location !== 'undefined' &&
  new URLSearchParams(location.search).has('debug');

/* --------------------------------------------------------------- states */

const VISUALS = {
  base:      { color: 0xff4d3a, opacity: DEBUG ? 0.3 : 0.0 },
  hover:     { color: 0xff6a4d, opacity: 0.38 },
  selected:  { color: 0xff4d3a, opacity: 0.6 },
  primary:   { color: 0xff4d3a, opacity: 0.6 },
  secondary: { color: 0xe0a458, opacity: 0.45 }
};

/* ------------------------------------------------------------- registry */

const registry = new Map();       // muscleId -> { meshes:[], material }
const interactiveMeshes = [];
const bodyGroup = new THREE.Group();

let reduceMotion = false;

function muscleMaterial(id) {
  if (registry.has(id)) return registry.get(id).material;
  const material = new THREE.MeshBasicMaterial({
    color: VISUALS.base.color,
    transparent: true,
    opacity: VISUALS.base.opacity,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  material.userData = {
    state: 'base',
    targetColor: new THREE.Color(VISUALS.base.color),
    targetOpacity: VISUALS.base.opacity
  };
  registry.set(id, { meshes: [], material });
  return material;
}

function registerMuscle(id, ...meshes) {
  const entry = registry.get(id);
  meshes.forEach(m => {
    m.userData.muscleId = id;
    interactiveMeshes.push(m);
    entry.meshes.push(m);
    bodyGroup.add(m);
  });
}

/* Mirror a right-side (+x) mesh across the YZ plane.
   Valid for geometries symmetric about their local X axis. */
function mirrored(mesh) {
  const left = mesh.clone();
  left.position.x *= -1;
  left.rotation.y *= -1;
  left.rotation.z *= -1;
  return left;
}

function addMirrored(id, mesh) {
  registerMuscle(id, mesh, mirrored(mesh));
}

/* ------------------------------------------------------ mesh helpers */

function blob(id, r, x, y, z, scale, rotation) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), muscleMaterial(id));
  m.position.set(x, y, z);
  if (scale) m.scale.set(...scale);
  if (rotation) m.rotation.set(...rotation);
  return m;
}

function pill(id, r, len, x, y, z, scale, rotation) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 6, 14), muscleMaterial(id));
  m.position.set(x, y, z);
  if (scale) m.scale.set(...scale);
  if (rotation) m.rotation.set(...rotation);
  return m;
}

/* ------------------------------------------------------------ hotspots
   Tuned against the écorché model (T-pose: arms straight out along X,
   so arm hotspots lie along X and the lateral delt faces up). */

const LAY = -Math.PI / 2;   // rotation.z that lays a capsule along +X
const ARM_SLOPE = 0.087;    // arms droop slightly from shoulder to fingertip
const LEG_SLANT = 0.09;     // legs angle outward toward a wide stance

/* Positions/depths below come from measuring the normalized mesh
   (vertex slices in ?debug mode). Note the model's torso axis sits at
   z≈-0.06 — the bbox is centred by the forward-pointing feet — and the
   T-pose arms lie at z≈-0.09. */
function buildMuscles() {
  /* --- neck --- */
  registerMuscle('neck', pill('neck', 0.042, 0.07, 0, 1.50, -0.05, [1.15, 1, 1.4]));

  /* --- traps: neck-to-shoulder slopes + mid kite on the upper back --- */
  addMirrored('traps', blob('traps', 0.07, 0.095, 1.47, -0.07, [1.3, 0.5, 0.9], [0, 0, -0.22]));
  registerMuscle('traps', blob('traps', 0.06, 0, 1.38, -0.18, [0.95, 1.55, 0.6]));

  /* --- delts: front / top(lateral) / rear around the shoulder ball --- */
  addMirrored('deltsFront', blob('deltsFront', 0.05, 0.25, 1.43, -0.01, [1.15, 1, 0.85]));
  addMirrored('deltsSide', blob('deltsSide', 0.055, 0.255, 1.465, -0.08, [1.25, 0.85, 1]));
  addMirrored('deltsRear', blob('deltsRear', 0.05, 0.25, 1.42, -0.15, [1.15, 1, 0.85]));

  /* --- pecs --- */
  addMirrored('pecs', blob('pecs', 0.09, 0.12, 1.31, 0.04, [1.25, 0.78, 0.6], [0.1, 0, -0.08]));

  /* --- abs: two rectus columns --- */
  addMirrored('abs', pill('abs', 0.035, 0.15, 0.042, 1.14, 0.05, [1.25, 1, 1.2]));

  /* --- obliques --- */
  addMirrored('obliques', blob('obliques', 0.05, 0.11, 1.12, -0.03, [0.8, 1.5, 1.2]));

  /* --- lats --- */
  addMirrored('lats', blob('lats', 0.09, 0.10, 1.21, -0.145, [0.9, 1.45, 0.7], [0, 0.2, -0.25]));

  /* --- mid back --- */
  registerMuscle('midBack', blob('midBack', 0.07, 0, 1.34, -0.16, [1.15, 0.95, 0.7]));

  /* --- lower back --- */
  addMirrored('lowerBack', pill('lowerBack', 0.03, 0.15, 0.04, 0.99, -0.175, [1, 1, 1.1]));

  /* --- glutes --- */
  addMirrored('glutes', blob('glutes', 0.085, 0.085, 0.92, -0.14, [1, 1.05, 0.9]));

  /* --- arms (horizontal along X at z≈-0.09, drooping slightly) --- */
  addMirrored('biceps', pill('biceps', 0.045, 0.20, 0.42, 1.435, -0.05, [0.85, 1, 1], [0, 0, LAY - ARM_SLOPE]));
  addMirrored('triceps', pill('triceps', 0.045, 0.22, 0.43, 1.425, -0.125, [0.9, 1, 1], [0, 0, LAY - ARM_SLOPE]));
  addMirrored('forearms', pill('forearms', 0.04, 0.18, 0.67, 1.41, -0.085, [0.9, 1, 1.4], [0, 0, LAY - ARM_SLOPE]));

  /* --- legs (slanting outward with the stance) --- */
  addMirrored('quads', pill('quads', 0.06, 0.26, 0.12, 0.70, 0.03, [1.1, 1, 0.85], [0, 0, LEG_SLANT]));
  addMirrored('hamstrings', pill('hamstrings', 0.055, 0.24, 0.12, 0.70, -0.115, [1, 1, 0.85], [0, 0, LEG_SLANT]));
  addMirrored('adductors', pill('adductors', 0.045, 0.15, 0.06, 0.78, -0.03, [0.8, 1, 0.9], [0, 0, 0.12]));
  addMirrored('calves', pill('calves', 0.05, 0.14, 0.18, 0.33, -0.085, [1, 1, 1], [0, 0, LEG_SLANT]));
}

/* ------------------------------------------------------------ highlight */

export function resolveHighlights(state, exercisesById, splitsById) {
  const target = {};
  registry.forEach((_, id) => { target[id] = 'base'; });

  if (state.mode === 'explore' && state.selectedMuscle) {
    target[state.selectedMuscle] = 'selected';
  } else if (state.mode === 'exercises' && state.selectedExercise) {
    const ex = exercisesById[state.selectedExercise];
    if (ex) {
      ex.secondaryMuscles.forEach(id => { target[id] = 'secondary'; });
      ex.primaryMuscles.forEach(id => { target[id] = 'primary'; });
    }
  } else if (state.mode === 'splits' && state.selectedSplit) {
    const split = splitsById[state.selectedSplit];
    if (split) split.muscles.forEach(id => { target[id] = 'primary'; });
  }

  if (state.hoveredMuscle && target[state.hoveredMuscle] === 'base') {
    target[state.hoveredMuscle] = 'hover';
  }

  registry.forEach((entry, id) => setMuscleVisual(id, target[id]));
}

export function setMuscleVisual(id, visualState) {
  const entry = registry.get(id);
  if (!entry) return;
  const v = VISUALS[visualState] || VISUALS.base;
  const ud = entry.material.userData;
  if (ud.state === visualState) return;
  ud.state = visualState;
  ud.targetColor.setHex(v.color);
  ud.targetOpacity = v.opacity;
  if (reduceMotion) {
    entry.material.color.copy(ud.targetColor);
    entry.material.opacity = ud.targetOpacity;
  }
}

/* Called every frame: eases the overlays toward their targets. */
export function updateHighlights() {
  if (reduceMotion) return;
  registry.forEach(entry => {
    const mat = entry.material;
    const ud = mat.userData;
    mat.color.lerp(ud.targetColor, 0.18);
    mat.opacity += (ud.targetOpacity - mat.opacity) * 0.18;
  });
}

/* ------------------------------------------------------------- exports */

export async function buildBody(prefersReducedMotion) {
  reduceMotion = prefersReducedMotion;

  const gltf = await new GLTFLoader().loadAsync('assets/body.glb');
  const model = gltf.scene;

  // normalize: 1.8 units tall, feet on the ground, centred, facing +Z
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const s = 1.8 / size.y;
  model.scale.setScalar(s);
  box.setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.x -= center.x;
  model.position.z -= center.z;
  model.position.y -= box.min.y;
  bodyGroup.add(model);

  buildMuscles();
  return bodyGroup;
}

export function getInteractiveMeshes() {
  return interactiveMeshes;
}

export function getMuscleIds() {
  return [...registry.keys()];
}
