/* Builds the stylized human body entirely from three.js primitives.
   The whole figure shares one flesh tone — the "core" is a slightly
   shadowed version of the same skin color so muscle overlays read as
   anatomy on a human form rather than parts bolted to a mannequin.
   Muscle groups are separate meshes so they can be independently
   hovered, clicked and highlighted; left/right pairs and multi-belly
   groups share one material and highlight together.

   Proportions: ground at y=0, figure ~1.8 tall, facing +Z.
   Landmarks: hips y≈0.93 · waist 1.12 · chest 1.40 · shoulders 1.49 */

import * as THREE from 'three';

/* ---------------------------------------------------------------- palette */

const CORE_COLOR = 0x6d6156;    // shadowed flesh — recesses between muscles

const VISUALS = {
  base:      { color: 0xa0826f, emissive: 0x000000, intensity: 0.0 },
  hover:     { color: 0xb99680, emissive: 0xff5a3c, intensity: 0.22 },
  selected:  { color: 0xff4d3a, emissive: 0xff4d3a, intensity: 0.5 },
  primary:   { color: 0xff4d3a, emissive: 0xff4d3a, intensity: 0.5 },
  secondary: { color: 0xe0a458, emissive: 0xe0a458, intensity: 0.28 }
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
    roughness: 0.62,
    metalness: 0.02,
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
  color: CORE_COLOR, roughness: 0.75, metalness: 0.02
});
/* skin material for the visible neutral parts (head, hands, feet…) —
   same tone as resting muscles so the figure reads as one body */
const skinMaterial = new THREE.MeshStandardMaterial({
  color: VISUALS.base.color, roughness: 0.62, metalness: 0.02
});

function staticMesh(material, geometry, x, y, z, scale, rotation) {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(x, y, z);
  if (scale) m.scale.set(...scale);
  if (rotation) m.rotation.set(...rotation);
  bodyGroup.add(m);
  return m;
}
const coreMesh = (...a) => staticMesh(coreMaterial, ...a);
const skinMesh = (...a) => staticMesh(skinMaterial, ...a);

function blob(id, r, x, y, z, scale, rotation, segs = 24) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, segs, segs), muscleMaterial(id));
  m.position.set(x, y, z);
  if (scale) m.scale.set(...scale);
  if (rotation) m.rotation.set(...rotation);
  return m;
}

function pill(id, r, len, x, y, z, scale, rotation) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 8, 20), muscleMaterial(id));
  m.position.set(x, y, z);
  if (scale) m.scale.set(...scale);
  if (rotation) m.rotation.set(...rotation);
  return m;
}

/* limb segment: capsule whose axis runs exactly from (ax,ay) to (bx,by)
   in the XY plane — lets arms/legs read as one continuous form */
function segment(material, r, ax, ay, bx, by, zOff = 0, sz = 1) {
  const len = Math.hypot(bx - ax, by - ay);
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 8, 20), material);
  m.position.set((ax + bx) / 2, (ay + by) / 2, zOff);
  m.rotation.z = Math.atan2(ax - bx, by - ay);
  m.scale.set(1, 1, sz);
  bodyGroup.add(m);
  return m;
}

/* joint landmarks (right side; left is mirrored) */
const J = {
  shoulder: [0.185, 1.485],
  elbow: [0.250, 1.195],
  wrist: [0.288, 0.945],
  hip: [0.092, 0.935],
  knee: [0.105, 0.515],
  ankle: [0.105, 0.085]
};

/* ------------------------------------------------------------ core body */

function buildCore() {
  // skull + jaw — slightly egg-shaped, chin narrower and tucked in
  skinMesh(new THREE.SphereGeometry(0.102, 28, 28), 0, 1.695, 0, [0.86, 1.06, 0.94]);
  skinMesh(new THREE.SphereGeometry(0.062, 24, 24), 0, 1.642, 0.03, [0.72, 0.72, 0.78]);

  // torso silhouette — chest fuller, waist drawn in, hips flared
  const profile = [
    new THREE.Vector2(0.001, 0.895),
    new THREE.Vector2(0.118, 0.915),
    new THREE.Vector2(0.140, 1.000),
    new THREE.Vector2(0.121, 1.115),
    new THREE.Vector2(0.132, 1.230),
    new THREE.Vector2(0.153, 1.335),
    new THREE.Vector2(0.161, 1.425),
    new THREE.Vector2(0.148, 1.495),
    new THREE.Vector2(0.085, 1.545),
    new THREE.Vector2(0.001, 1.555)
  ];
  coreMesh(new THREE.LatheGeometry(profile, 36), 0, 0, 0, [1, 1, 0.60]);

  // clavicle / upper-chest shelf smoothing the neck-to-pec transition
  skinMesh(new THREE.SphereGeometry(0.09, 24, 20), 0, 1.475, 0.028, [1.55, 0.42, 0.55]);

  // pelvis block + lower-abdomen wedge
  skinMesh(new THREE.SphereGeometry(0.13, 24, 24), 0, 0.965, 0.004, [1.08, 0.92, 0.72]);
  skinMesh(new THREE.SphereGeometry(0.09, 20, 20), 0, 1.03, 0.045, [1.15, 0.75, 0.55]);

  // tendinous lines across the rectus — reads as ab segmentation
  [1.245, 1.185, 1.125].forEach(y => {
    coreMesh(new THREE.BoxGeometry(0.128, 0.006, 0.02), 0, y, 0.098);
  });
  // linea alba (vertical centre groove)
  coreMesh(new THREE.BoxGeometry(0.007, 0.19, 0.02), 0, 1.185, 0.099);
  // spine groove
  coreMesh(new THREE.BoxGeometry(0.012, 0.45, 0.02), 0, 1.25, -0.093);

  const sides = [1, -1];
  sides.forEach(s => {
    // arm core: one continuous tapered limb, thick enough that the
    // muscle overlays merge into it with no visible joints
    segment(skinMaterial, 0.047, s * J.shoulder[0], J.shoulder[1], s * J.elbow[0], J.elbow[1]);
    segment(skinMaterial, 0.038, s * J.elbow[0], J.elbow[1], s * J.wrist[0], J.wrist[1]);
    // hand mitt + thumb hint
    skinMesh(new THREE.SphereGeometry(0.045, 20, 20), s * 0.298, 0.868, 0.012, [0.72, 1.25, 0.42], [0.1, 0, s * -0.15]);
    skinMesh(new THREE.CapsuleGeometry(0.015, 0.035, 4, 10), s * 0.272, 0.90, 0.035, null, [0.5, 0, s * 0.5]);

    // leg core: thigh and shin as continuous tapered segments
    segment(skinMaterial, 0.064, s * J.hip[0], J.hip[1], s * J.knee[0], J.knee[1]);
    segment(skinMaterial, 0.043, s * J.knee[0], J.knee[1], s * J.ankle[0], J.ankle[1]);
    // knee cap smoothing
    skinMesh(new THREE.SphereGeometry(0.047, 20, 20), s * J.knee[0], J.knee[1], 0.012, [1, 1.1, 0.95]);
    // foot: heel + instep + toe box
    skinMesh(new THREE.SphereGeometry(0.042, 20, 20), s * J.ankle[0], 0.052, -0.015);
    skinMesh(new THREE.CapsuleGeometry(0.040, 0.115, 6, 14), s * 0.108, 0.045, 0.065, [1, 1, 0.82], [Math.PI / 2, 0, 0]);
    skinMesh(new THREE.SphereGeometry(0.043, 20, 20), s * 0.106, 0.042, 0.135, [1.05, 0.75, 0.9]);
  });
}

/* ------------------------------------------------------------- muscles */

function buildMuscles() {
  /* --- neck: column + sternocleidomastoid hints --- */
  const neckCol = new THREE.Mesh(new THREE.CylinderGeometry(0.054, 0.075, 0.11, 20), muscleMaterial('neck'));
  neckCol.position.set(0, 1.575, -0.004);
  neckCol.scale.set(1, 1, 0.88);
  registerMuscle('neck', neckCol);
  addMirrored('neck', pill('neck', 0.014, 0.075, 0.032, 1.575, 0.038, [1, 1, 1], [0.18, 0, -0.22]));

  /* --- traps: slopes blending neck into shoulders + mid kite --- */
  addMirrored('traps', blob('traps', 0.085, 0.085, 1.522, -0.012, [1.5, 0.52, 0.72], [0, 0, -0.34]));
  registerMuscle('traps', blob('traps', 0.07, 0, 1.44, -0.085, [0.95, 1.65, 0.35]));

  /* --- delts: 3 sphere wedges per shoulder, built per side ---
     wedge geometry is centred on local -X; rotation.y aims it.
     thetaStart > 0 keeps the wedges from z-fighting at the pole. */
  const deltGeo = () =>
    new THREE.SphereGeometry(0.094, 28, 18, -Math.PI / 3, (Math.PI * 2) / 3, Math.PI * 0.08, Math.PI * 0.58);
  const addDelt = (id, side, rotY) => {
    const m = new THREE.Mesh(deltGeo(), muscleMaterial(id));
    m.position.set(side * 0.192, 1.462, 0);
    m.scale.set(1, 1.08, 0.94);
    m.rotation.y = rotY;
    registerMuscle(id, m);
  };
  [1, -1].forEach(s => {
    addDelt('deltsFront', s, Math.PI / 2);            // faces +Z
    addDelt('deltsSide', s, s === 1 ? Math.PI : 0);   // faces outward
    addDelt('deltsRear', s, -Math.PI / 2);            // faces -Z
  });

  /* --- pecs: broad angled plates, fuller at the sternum --- */
  addMirrored('pecs', blob('pecs', 0.088, 0.079, 1.402, 0.083, [1.28, 0.78, 0.42], [0.16, 0.14, -0.10]));

  /* --- abs: two rectus columns (grooves come from the core lines) --- */
  addMirrored('abs', pill('abs', 0.034, 0.155, 0.031, 1.185, 0.082, [1.12, 1, 0.5], [-0.06, 0, 0]));

  /* --- obliques: slim sheets hugging the waist --- */
  addMirrored('obliques', blob('obliques', 0.05, 0.100, 1.155, 0.028, [0.55, 1.55, 0.5], [0, 0, -0.10]));

  /* --- lats: wide fans from armpit toward the spine --- */
  addMirrored('lats', blob('lats', 0.095, 0.088, 1.285, -0.058, [0.92, 1.65, 0.42], [0, 0.24, -0.28]));

  /* --- mid back (rhomboids) --- */
  registerMuscle('midBack', blob('midBack', 0.075, 0, 1.375, -0.088, [1.2, 0.85, 0.32]));

  /* --- lower back (erectors) --- */
  addMirrored('lowerBack', pill('lowerBack', 0.027, 0.19, 0.033, 1.055, -0.062, [1, 1, 0.9]));

  /* --- glutes: rounded but tucked into the pelvis --- */
  addMirrored('glutes', blob('glutes', 0.092, 0.075, 0.925, -0.048, [0.95, 1.02, 0.74], [-0.1, 0, -0.08]));

  /* --- arms --- */
  const armTilt = Math.atan2(J.elbow[0] - J.shoulder[0], J.shoulder[1] - J.elbow[1]);
  const foreTilt = Math.atan2(J.wrist[0] - J.elbow[0], J.elbow[1] - J.wrist[1]);
  const upperMid = [(J.shoulder[0] + J.elbow[0]) / 2, (J.shoulder[1] + J.elbow[1]) / 2];

  addMirrored('biceps', pill('biceps', 0.036, 0.115, upperMid[0] - 0.004, upperMid[1] + 0.005, 0.030, [1, 1, 0.82], [0, 0, -armTilt]));
  addMirrored('triceps', pill('triceps', 0.038, 0.125, upperMid[0] + 0.006, upperMid[1] - 0.005, -0.026, [1, 1, 0.88], [0, 0, -armTilt]));
  // forearm belly sits on the upper third, tapering toward the wrist
  addMirrored('forearms', pill('forearms', 0.040, 0.095, J.elbow[0] + 0.014, J.elbow[1] - 0.075, 0.004, [1, 1, 0.85], [0, 0, -foreTilt]));

  /* --- quads: vastus lateralis / medialis + rectus femoris teardrop --- */
  addMirrored('quads', pill('quads', 0.047, 0.185, J.hip[0] + 0.030, 0.735, 0.030, [1, 1, 0.88], [0, 0, -0.04]));
  addMirrored('quads', pill('quads', 0.043, 0.150, J.hip[0] - 0.021, 0.700, 0.040, [1, 1, 0.88], [0, 0, 0.05]));
  addMirrored('quads', pill('quads', 0.040, 0.200, J.hip[0] + 0.006, 0.740, 0.052, [1, 1, 0.8], [0, 0, 0.005]));

  /* --- hamstrings: two-belly rear thigh --- */
  addMirrored('hamstrings', pill('hamstrings', 0.044, 0.185, J.hip[0] + 0.018, 0.715, -0.042, [1, 1, 0.85], [0, 0, -0.02]));
  addMirrored('hamstrings', pill('hamstrings', 0.040, 0.165, J.hip[0] - 0.016, 0.705, -0.044, [1, 1, 0.85], [0, 0, 0.03]));

  /* --- adductors: inner-thigh wedge, high near the groin --- */
  addMirrored('adductors', pill('adductors', 0.040, 0.130, 0.048, 0.775, 0.002, [0.8, 1, 0.85], [0, 0, 0.10]));

  /* --- calves: two gastrocnemius heads + soleus taper --- */
  addMirrored('calves', blob('calves', 0.042, J.knee[0] + 0.012, 0.395, -0.035, [0.85, 1.3, 0.72]));
  addMirrored('calves', blob('calves', 0.040, J.knee[0] - 0.014, 0.39, -0.037, [0.8, 1.25, 0.70]));
  addMirrored('calves', pill('calves', 0.030, 0.10, J.knee[0], 0.30, -0.030, [1.15, 1, 0.8]));
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
