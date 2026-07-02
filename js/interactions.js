/* Pointer interaction: hover tooltips + click/tap selection.
   Raycasts only against muscle meshes, once per frame (not per event).
   A click is a pointerup that moved <6px in <400ms — anything longer
   was an OrbitControls drag and is ignored. */

import * as THREE from 'three';
import { getInteractiveMeshes } from './body-model.js';
import { MUSCLES } from './muscle-data.js';
import { getState, dispatch } from './state.js';

const raycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2();

let canvas, camera, tooltip;
let pointerOnCanvas = false;
let pointerClient = { x: 0, y: 0 };
let downInfo = null;
let coarsePointer = false;

export function initInteractions(rendererCanvas, cam, tooltipEl) {
  canvas = rendererCanvas;
  camera = cam;
  tooltip = tooltipEl;
  coarsePointer = window.matchMedia('(pointer: coarse)').matches;

  canvas.addEventListener('pointermove', e => {
    pointerOnCanvas = true;
    pointerClient = { x: e.clientX, y: e.clientY };
    setNDC(e);
  });

  canvas.addEventListener('pointerleave', () => {
    pointerOnCanvas = false;
    tooltip.hidden = true;
    canvas.style.cursor = 'grab';
    if (getState().hoveredMuscle) dispatch({ hoveredMuscle: null });
  });

  canvas.addEventListener('pointerdown', e => {
    downInfo = { x: e.clientX, y: e.clientY, t: performance.now() };
  });

  canvas.addEventListener('pointerup', e => {
    if (!downInfo) return;
    const moved = Math.hypot(e.clientX - downInfo.x, e.clientY - downInfo.y);
    const held = performance.now() - downInfo.t;
    downInfo = null;
    if (moved > 6 || held > 400) return; // it was an orbit drag

    setNDC(e);
    const id = raycastMuscle();
    if (id) {
      dispatch({ mode: 'explore', selectedMuscle: id, selectedExercise: null, selectedSplit: null });
    } else if (getState().mode === 'explore' && getState().selectedMuscle) {
      dispatch({ selectedMuscle: null });
    }
  });
}

/* NDC relative to the canvas (which no longer spans the full window). */
function setNDC(e) {
  const rect = canvas.getBoundingClientRect();
  pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
}

function raycastMuscle() {
  raycaster.setFromCamera(pointerNDC, camera);
  const hits = raycaster.intersectObjects(getInteractiveMeshes(), false);
  return hits.length ? hits[0].object.userData.muscleId : null;
}

/* Called once per frame from the render loop. */
export function updateHover() {
  if (coarsePointer || !pointerOnCanvas) return;

  const id = raycastMuscle();
  const state = getState();
  if (id !== state.hoveredMuscle) dispatch({ hoveredMuscle: id });

  if (id) {
    tooltip.textContent = MUSCLES[id] ? MUSCLES[id].name : id;
    tooltip.hidden = false;
    const pad = 14;
    let x = pointerClient.x + pad;
    let y = pointerClient.y - 10;
    const rect = tooltip.getBoundingClientRect();
    if (x + rect.width > window.innerWidth - 8) x = pointerClient.x - rect.width - pad;
    if (y + rect.height > window.innerHeight - 8) y = pointerClient.y - rect.height - 10;
    tooltip.style.transform = `translate(${x}px, ${Math.max(8, y)}px)`;
    canvas.style.cursor = 'pointer';
  } else {
    tooltip.hidden = true;
    canvas.style.cursor = 'grab';
  }
}
