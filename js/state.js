/* Tiny pub/sub store. Every UI + highlight decision derives from this
   single state object, so the four features never fight over the model. */

const state = {
  mode: 'explore',        // 'explore' | 'exercises' | 'splits'
  hoveredMuscle: null,    // muscleId | null
  selectedMuscle: null,   // muscleId | null   (explore mode)
  selectedExercise: null, // exerciseId | null (exercises mode)
  selectedSplit: null     // splitId | null    (splits mode)
};

const listeners = [];

export function subscribe(fn) {
  listeners.push(fn);
}

export function dispatch(patch) {
  Object.assign(state, patch);
  listeners.forEach(fn => fn(state));
}

export function getState() {
  return state;
}

/* Switching tabs resets the other modes' selections so
   highlights never leak between features. */
export function setMode(mode) {
  dispatch({
    mode,
    selectedMuscle: null,
    selectedExercise: null,
    selectedSplit: null,
    hoveredMuscle: null
  });
}
