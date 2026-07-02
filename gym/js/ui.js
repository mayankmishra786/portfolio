/* DOM side of the app: tab bar, info panel / bottom sheet, exercise
   library, reverse lookup and splits. Re-renders from state on every
   dispatch; never touches three.js directly. */

import { MUSCLES } from './muscle-data.js';
import { EXERCISES, SPLITS } from './exercise-data.js';
import { getState, dispatch, setMode, subscribe } from './state.js';

const exercisesById = {};
EXERCISES.forEach(ex => { exercisesById[ex.id] = ex; });

let panelBody, tabButtons, sheet;
let exerciseFilter = '';

export function initUI() {
  panelBody = document.getElementById('panel-body');
  sheet = document.getElementById('panel');
  tabButtons = [...document.querySelectorAll('.tab')];

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.mode);
      expandSheet(true);
    });
  });

  document.getElementById('sheet-handle').addEventListener('click', () => {
    sheet.classList.toggle('expanded');
  });

  subscribe(render);
  render(getState());
}

function expandSheet(force) {
  if (window.matchMedia('(max-width: 860px)').matches && force) {
    sheet.classList.add('expanded');
  }
}

function render(state) {
  tabButtons.forEach(btn =>
    btn.classList.toggle('active', btn.dataset.mode === state.mode));

  if (state.mode === 'explore') renderExplore(state);
  else if (state.mode === 'exercises') renderExercises(state);
  else renderSplits(state);
}

/* ------------------------------------------------------------ explore */

function renderExplore(state) {
  const id = state.selectedMuscle;
  if (!id) {
    panelBody.innerHTML = `
      <div class="empty">
        <div class="empty-icon">☝</div>
        <h2>Tap a muscle</h2>
        <p>Rotate the body and click any muscle to learn what it does,
        how to <em>feel</em> it working, and the best exercises for it.</p>
        <p class="hint">Drag to rotate · scroll or pinch to zoom</p>
      </div>`;
    return;
  }

  const m = MUSCLES[id];
  const primary = EXERCISES.filter(ex => ex.primaryMuscles.includes(id));
  const secondary = EXERCISES.filter(ex => ex.secondaryMuscles.includes(id));

  panelBody.innerHTML = `
    <div class="muscle-head">
      <h2>${m.name}</h2>
      <span class="anatomical">${m.anatomical}</span>
    </div>
    <section>
      <h3>What it does</h3>
      <p>${m.function}</p>
    </section>
    <section>
      <h3>How to feel it</h3>
      <ul class="cues">${m.feelCues.map(c => `<li>${c}</li>`).join('')}</ul>
    </section>
    <section>
      <h3>Best exercises</h3>
      ${primary.map(ex => exerciseCard(ex, 'primary')).join('')}
      ${secondary.length ? `<h4 class="also">Also worked by</h4>` : ''}
      ${secondary.map(ex => exerciseCard(ex, 'secondary')).join('')}
    </section>`;
}

function exerciseCard(ex, role) {
  return `
    <details class="ex">
      <summary>
        <span class="ex-name">${ex.name}</span>
        <span class="tag tag-${role}">${role}</span>
      </summary>
      <div class="ex-body">
        <span class="equip">${ex.equipment}</span>
        <h5>Form</h5>
        <ul>${ex.formCues.map(c => `<li>${c}</li>`).join('')}</ul>
        <h5>Tension &amp; tempo</h5>
        <ul>${ex.tensionTips.map(c => `<li>${c}</li>`).join('')}</ul>
        <h5>Avoid</h5>
        <ul class="avoid">${ex.mistakes.map(c => `<li>${c}</li>`).join('')}</ul>
      </div>
    </details>`;
}

/* ---------------------------------------------------------- exercises */

function renderExercises(state) {
  const ex = state.selectedExercise ? exercisesById[state.selectedExercise] : null;

  panelBody.innerHTML = `
    <div class="search-wrap">
      <input id="ex-search" type="search" placeholder="Search ${EXERCISES.length} exercises…"
             value="${exerciseFilter}" autocomplete="off" />
    </div>
    <div id="ex-list" class="ex-list"></div>
    <div id="ex-detail"></div>`;

  const listEl = panelBody.querySelector('#ex-list');
  const detailEl = panelBody.querySelector('#ex-detail');
  const searchEl = panelBody.querySelector('#ex-search');

  const renderList = () => {
    const q = exerciseFilter.trim().toLowerCase();
    const matches = EXERCISES.filter(e =>
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.equipment.toLowerCase().includes(q) ||
      e.primaryMuscles.some(id => MUSCLES[id].name.toLowerCase().includes(q)));
    listEl.innerHTML = matches.length
      ? matches.map(e => `
          <button class="ex-item ${e.id === (ex && ex.id) ? 'active' : ''}" data-ex="${e.id}">
            <span>${e.name}</span>
            <span class="ex-muscles">${e.primaryMuscles.map(id => MUSCLES[id].name).join(' · ')}</span>
          </button>`).join('')
      : `<p class="no-results">No exercises match “${exerciseFilter}”.</p>`;
    listEl.querySelectorAll('.ex-item').forEach(btn => {
      btn.addEventListener('click', () => dispatch({ selectedExercise: btn.dataset.ex }));
    });
  };

  searchEl.addEventListener('input', () => {
    exerciseFilter = searchEl.value;
    renderList();
  });
  renderList();

  if (ex) {
    detailEl.innerHTML = `
      <div class="ex-selected">
        <h2>${ex.name}</h2>
        <p class="legend">
          <span class="dot dot-primary"></span>${ex.primaryMuscles.map(id => MUSCLES[id].name).join(', ')}
          ${ex.secondaryMuscles.length
            ? `&nbsp;&nbsp;<span class="dot dot-secondary"></span>${ex.secondaryMuscles.map(id => MUSCLES[id].name).join(', ')}`
            : ''}
        </p>
        ${exerciseCard(ex, 'primary').replace('<details class="ex">', '<details class="ex" open>')}
      </div>`;
  } else {
    detailEl.innerHTML = `<p class="hint pad">Pick an exercise to light up the muscles it trains —
      <span class="dot dot-primary"></span> primary,
      <span class="dot dot-secondary"></span> secondary.</p>`;
  }
}

/* ------------------------------------------------------------- splits */

function renderSplits(state) {
  const split = state.selectedSplit ? SPLITS[state.selectedSplit] : null;

  panelBody.innerHTML = `
    <p class="hint pad">Choose a training day to see every muscle it targets.</p>
    <div class="split-grid">
      ${Object.values(SPLITS).map(s => `
        <button class="split-btn ${split && split.id === s.id ? 'active' : ''}" data-split="${s.id}">
          ${s.label}
        </button>`).join('')}
    </div>
    <div id="split-detail"></div>`;

  panelBody.querySelectorAll('.split-btn').forEach(btn => {
    btn.addEventListener('click', () => dispatch({ selectedSplit: btn.dataset.split }));
  });

  if (split) {
    panelBody.querySelector('#split-detail').innerHTML = `
      <div class="split-info">
        <p>${split.blurb}</p>
        <h3>Muscles trained</h3>
        <div class="chip-row">
          ${split.muscles.map(id => `
            <button class="chip" data-muscle="${id}">${MUSCLES[id].name}</button>`).join('')}
        </div>
        <p class="hint">Tap a muscle to jump to its exercises.</p>
      </div>`;
    panelBody.querySelectorAll('.chip').forEach(btn => {
      btn.addEventListener('click', () =>
        dispatch({ mode: 'explore', selectedMuscle: btn.dataset.muscle, selectedSplit: null }));
    });
  }
}
