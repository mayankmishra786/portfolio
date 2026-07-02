/* Builds the stylized human body entirely from three.js primitives.
   Two layers:
     - a dark non-interactive "mannequin core" (bones, joints, head, hands, feet)
     - interactive muscle meshes, one shared material per muscle group so
       left/right pairs and multi-belly groups highlight together.
   Exposes the registry, the raycast list and the highlight resolver. */

import * as THREE from 'three';

/* ---------------------------------------------------------------- palette */

const CORE_COLOR = 0x23262c;

const VISUALS = {
  base:      { color: 0x8a5f52, emissive: 0x000000, intensity: 0.0 },
  hover:     { color: 0xa8705f, emissive: 0xff5a3c, intensity: 0.28 },
  selected:  { color: 0xff4d3a, emissive: 0xff4d3a, intensity: 0.55 },
  primary:   { color: 0xff4d3a, emissive: 0xff4d3a, intensity: 0.55 },
  secondary: { color: 0xe0a458, emissive: 0xe0a458, intensity: 0.30 }
};

/* ------------------------------------------------------------- registry */

const registry = new Map();       // muscleId -> { meshes:[], material }
const interactiveMeshes = [];
const bodyGroup = new THREE.Group();

let reduceMotion = false;

function muscleMaterial(id) {
  if (registry.has(id)) return registry.get(id).material;
  const material = new THREE.MeshStandardMaterial({
    color: VISUALS.base.color,
    roughness: 0.6,
    metalness: 0.05,
    emissive: 0x000000,
    emissiveIntensity: 0,
    side: THREE.DoubleSide
  });
  material.userData = {
    state: 'base',
    targetColor: new THREE.Color(VISUALS.base.color),
    targetEmissive: new THREE.Color(VISUALS.base.emissive),
    targetIntensity: 0
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
   Valid for geometries symmetric about their local X axis
   (spheres, capsules, cylinders) — everything here except delt wedges,
   which are built explicitly per side. */
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

const coreMaterial = new THREE.MeshStandardMaterial({
  color: CORE_COLOR, roughness: 0.9, metalness: 0.05
});

function coreMesh(geometry, x, y, z, scale, rotation) {
  const m = new THREE.Mesh(geometry, coreMaterial);
  m.position.set(x, y, z);
  if (scale) m.scale.set(...scale);
  if (rotation) m.rotation.set(...rotation);
  bodyGroup.add(m);
  return m;
}

function blob(id, r, x, y, z, scale, rotation, segs = 20) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, segs, segs), muscleMaterial(id));
  m.position.set(x, y, z);
  if (scale) m.scale.set(...scale);
  if (rotation) m.rotation.set(...rotation);
  return m;
}

function pill(id, r, len, x, y, z, scale, rotation) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 6, 16), muscleMaterial(id));
  m.position.set(x, y, z);
  if (scale) m.scale.set(...scale);
  if (rotation) m.rotation.set(...rotation);
  return m;
}

/* ------------------------------------------------------------ the body
   Ground at y=0, total height ~1.8. Faces +Z.
   Landmarks: hips y≈0.92 · waist 1.13 · chest 1.38 · shoulders 1.50 */

function buildCore() {
  // head + jaw
  coreMesh(new THREE.SphereGeometry(0.10, 24, 24), 0, 1.68, 0, [0.9, 1.15, 0.95]);
  coreMesh(new THREE.SphereGeometry(0.06, 16, 16), 0, 1.595, 0.025, [0.85, 0.7, 0.85]);

  // torso silhouette (lathe), flattened front-to-back
  const profile = [
    new THREE.Vector2(0.001, 0.90),
    new THREE.Vector2(0.135, 0.92),
    new THREE.Vector2(0.148, 1.00),
    new THREE.Vector2(0.126, 1.13),
    new THREE.Vector2(0.150, 1.25),
    new THREE.Vector2(0.166, 1.38),
    new THREE.Vector2(0.158, 1.47),
    new THREE.Vector2(0.095, 1.53),
    new THREE.Vector2(0.001, 1.545)
  ];
  coreMesh(new THREE.LatheGeometry(profile, 28), 0, 0, 0, [1, 1, 0.65]);

  // pelvis
  coreMesh(new THREE.SphereGeometry(0.13, 20, 20), 0, 0.94, 0, [1.1, 0.85, 0.75]);

  const sides = [1, -1];
  sides.forEach(s => {
    // shoulder + elbow + wrist joints
    coreMesh(new THREE.SphereGeometry(0.055, 16, 16), s * 0.20, 1.495, 0);
    coreMesh(new THREE.SphereGeometry(0.040, 16, 16), s * 0.27, 1.22, 0);
    // upper arm bone
    coreMesh(new THREE.CapsuleGeometry(0.038, 0.24, 4, 12), s * 0.24, 1.36, 0, null, [0, 0, s * 0.245]);
    // forearm bone (tapered)
    coreMesh(new THREE.CylinderGeometry(0.024, 0.036, 0.22, 12), s * 0.2925, 1.105, 0, null, [0, 0, s * 0.193]);
    // hand
    coreMesh(new THREE.SphereGeometry(0.035, 14, 14), s * 0.325, 0.93, 0.01, [0.85, 1.3, 0.5]);
    // hip + knee joints
    coreMesh(new THREE.SphereGeometry(0.06, 16, 16), s * 0.10, 0.91, 0);
    coreMesh(new THREE.SphereGeometry(0.048, 16, 16), s * 0.11, 0.50, 0);
    // thigh bone
    coreMesh(new THREE.CapsuleGeometry(0.055, 0.34, 4, 12), s * 0.105, 0.71, 0, null, [0, 0, s * 0.024]);
    // shin (tapered)
    coreMesh(new THREE.CylinderGeometry(0.025, 0.042, 0.40, 12), s * 0.11, 0.29, 0);
    // foot
    coreMesh(new THREE.CapsuleGeometry(0.042, 0.14, 4, 12), s * 0.11, 0.05, 0.055, [1, 1, 0.8], [Math.PI / 2, 0, 0]);
  });
}

function buildMuscles() {
  /* --- neck --- */
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.072, 0.10, 16), muscleMaterial('neck'));
  neck.position.set(0, 1.565, 0);
  neck.scale.set(1, 1, 0.85);
  registerMuscle('neck', neck);

  /* --- traps: two slopes + centre kite on the upper back --- */
  addMirrored('traps', blob('traps', 0.08, 0.10, 1.532, -0.015, [1.35, 0.5, 0.68], [0, 0, -0.30]));
  registerMuscle('traps', blob('traps', 0.07, 0, 1.46, -0.098, [1.0, 1.5, 0.35]));

  /* --- delts: 3 wedges per shoulder, built explicitly per side ---
     Wedge geometry is centred on local -X; rotation.y aims it. */
  // thetaStart > 0 keeps the three wedges from overlapping (and
  // z-fighting) at the pole of the shoulder sphere.
  const deltGeo = () =>
    new THREE.SphereGeometry(0.088, 24, 16, -Math.PI / 3, (Math.PI * 2) / 3, Math.PI * 0.12, Math.PI * 0.52);
  const addDelt = (id, side, rotY) => {
    const m = new THREE.Mesh(deltGeo(), muscleMaterial(id));
    m.position.set(side * 0.205, 1.475, 0);
    m.rotation.y = rotY;
    registerMuscle(id, m);
  };
  [1, -1].forEach(s => {
    addDelt('deltsFront', s, Math.PI / 2);            // faces +Z
    addDelt('deltsSide', s, s === 1 ? Math.PI : 0);   // faces outward
    addDelt('deltsRear', s, -Math.PI / 2);            // faces -Z
  });

  /* --- pecs --- */
  addMirrored('pecs', blob('pecs', 0.085, 0.088, 1.40, 0.096, [1.15, 0.66, 0.5], [0.12, 0, -0.12]));

  /* --- abs: 3x2 grid --- */
  [1.275, 1.20, 1.125].forEach((y, row) => {
    const sy = row === 2 ? 0.9 : 0.75;
    addMirrored('abs', blob('abs', 0.038, 0.034, y, 0.092, [1, sy, 0.5]));
  });

  /* --- obliques --- */
  addMirrored('obliques', blob('obliques', 0.05, 0.112, 1.17, 0.028, [0.6, 1.65, 0.55], [0, 0, -0.08]));

  /* --- lats --- */
  addMirrored('lats', blob('lats', 0.09, 0.098, 1.295, -0.068, [0.85, 1.55, 0.4], [0, 0.22, -0.26]));

  /* --- mid back (rhomboids) --- */
  registerMuscle('midBack', blob('midBack', 0.075, 0, 1.365, -0.096, [1.15, 0.9, 0.35]));

  /* --- lower back (erectors) --- */
  addMirrored('lowerBack', pill('lowerBack', 0.028, 0.17, 0.036, 1.07, -0.068, [1, 1, 0.9]));

  /* --- glutes --- */
  addMirrored('glutes', blob('glutes', 0.088, 0.082, 0.915, -0.055, [1, 0.95, 0.78]));

  const armTilt = 0.245, foreTilt = 0.193;

  /* --- biceps / triceps / forearms --- */
  addMirrored('biceps', pill('biceps', 0.033, 0.12, 0.235, 1.365, 0.036, [1, 1, 0.85], [0, 0, -armTilt]));
  addMirrored('triceps', pill('triceps', 0.035, 0.13, 0.246, 1.355, -0.032, [1, 1, 0.9], [0, 0, -armTilt]));
  addMirrored('forearms', pill('forearms', 0.037, 0.09, 0.287, 1.135, 0, [1, 1, 0.9], [0, 0, -foreTilt]));

  /* --- quads: outer + inner belly per leg --- */
  addMirrored('quads', pill('quads', 0.046, 0.20, 0.128, 0.72, 0.034, [1, 1, 0.9], [0, 0, -0.03]));
  addMirrored('quads', pill('quads', 0.042, 0.18, 0.082, 0.70, 0.044, [1, 1, 0.9], [0, 0, 0.04]));

  /* --- hamstrings --- */
  addMirrored('hamstrings', pill('hamstrings', 0.048, 0.20, 0.105, 0.70, -0.044, [1, 1, 0.85]));

  /* --- adductors --- */
  addMirrored('adductors', pill('adductors', 0.035, 0.15, 0.052, 0.73, 0.004, [0.8, 1, 0.85], [0, 0, 0.07]));

  /* --- calves: belly + upper bulge --- */
  addMirrored('calves', pill('calves', 0.040, 0.09, 0.11, 0.345, -0.032, [1, 1, 0.9]));
  addMirrored('calves', blob('calves', 0.046, 0.11, 0.385, -0.036, [1, 0.85, 0.75]));
}

/* ------------------------------------------------------------ highlight */

/* Recomputes every muscle's visual from the app state. One source of
   truth, so explore/exercise/split modes can never leave stale colors. */
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
  ud.targetEmissive.setHex(v.emissive);
  ud.targetIntensity = v.intensity;
  if (reduceMotion) {
    entry.material.color.copy(ud.targetColor);
    entry.material.emissive.copy(ud.targetEmissive);
    entry.material.emissiveIntensity = ud.targetIntensity;
  }
}

/* Called every frame: eases colors toward their targets. */
export function updateHighlights() {
  if (reduceMotion) return;
  registry.forEach(entry => {
    const mat = entry.material;
    const ud = mat.userData;
    mat.color.lerp(ud.targetColor, 0.16);
    mat.emissive.lerp(ud.targetEmissive, 0.16);
    mat.emissiveIntensity += (ud.targetIntensity - mat.emissiveIntensity) * 0.16;
  });
}

/* ------------------------------------------------------------- exports */

export function buildBody(prefersReducedMotion) {
  reduceMotion = prefersReducedMotion;
  buildCore();
  buildMuscles();
  return bodyGroup;
}

export function getInteractiveMeshes() {
  return interactiveMeshes;
}

export function getMuscleIds() {
  return [...registry.keys()];
}
