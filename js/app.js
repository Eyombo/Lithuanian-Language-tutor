/* Linksniai — app logic. Plain JS, no build step. */
(() => {
  'use strict';
  const D = window.LT_DATA;
  const CASES = D.CASES;
  const CASE_KEYS = ['gen', 'dat', 'acc', 'ins', 'loc'];
  const $ = (s, el = document) => el.querySelector(s);
  const app = $('#app');

  /* ---------- helpers ---------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);
  const DAY = 864e5;
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const stripMarks = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const norm = s => s.toLowerCase().trim().replace(/[.,!?;:"“”„]/g, '').replace(/\s+/g, ' ');
  const chip = (c, label) => c === 'pp'
    ? `<span class="chip c-pp">dėl + Genitive</span>`
    : `<span class="chip c-${c}">${label || CASES[c].name}</span>`;

  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    slow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 10.5a2 2 0 0 1 0 3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    flame: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2s5 4.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 1-3.5S9 11 11 11c0-4 1-9 1-9z" fill="currentColor"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" fill="currentColor"/></svg>',
    gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.4 13.5l1.6 1.2-2 3.4-1.9-.7a7.6 7.6 0 0 1-2 1.2L14.8 21h-4l-.3-2.4a7.6 7.6 0 0 1-2-1.2l-1.9.7-2-3.4 1.6-1.2a7.4 7.4 0 0 1 0-2.4L4.6 9.9l2-3.4 1.9.7a7.6 7.6 0 0 1 2-1.2L10.8 3h4l.3 2.4a7.6 7.6 0 0 1 2 1.2l1.9-.7 2 3.4-1.6 1.2a7.4 7.4 0 0 1 0 2.4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ---------- verbs ---------- */
  function parseSentence(s) {
    const m = s.match(/\[([^|\]]+)\|([^\]]+)\]/);
    if (!m) return { pre: s, form: '', lemma: '', post: '', plain: s };
    return { pre: s.slice(0, m.index), form: m[1], lemma: m[2], post: s.slice(m.index + m[0].length), plain: s.slice(0, m.index) + m[1] + s.slice(m.index + m[0].length) };
  }
  const VERBS = [];
  CASE_KEYS.forEach(c => D.VERBS[c].forEach(r => {
    const p = parseSentence(r[2]);
    VERBS.push({ id: `${c}:${r[0]}`, verb: r[0], meaning: r[1], case: c, tr: r[3], lesson: r[4], note: r[5] || '', ...p });
  }));
  const VERB = Object.fromEntries(VERBS.map(v => [v.id, v]));
  const verbsOf = lessonId => VERBS.filter(v => v.lesson === lessonId);
  const marked = (v, cls = `c-${v.case}`) => `${esc(v.pre)}<mark class="obj ${cls}">${esc(v.form)}</mark>${esc(v.post)}`;
  const blanked = v => `${esc(v.pre)}<span class="blank">${' '.repeat(Math.max(4, v.form.length))}</span>${esc(v.post)}`;

  /* ---------- state ---------- */
  const KEY = 'linksniai-v1';
  const fresh = () => ({ xp: 0, days: {}, streak: 0, lastDay: null, lessons: {}, cards: {}, settings: { rate: 0.85, showEn: false, unlockAll: false, goal: 50 } });
  let S = fresh();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved) S = { ...fresh(), ...saved, settings: { ...fresh().settings, ...(saved.settings || {}) } };
  } catch (e) { /* storage unavailable: run without persistence */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };
  const LS = id => (S.lessons[id] = S.lessons[id] || { practice: 0, convo: false, done: false, cards: 0, goals: [] });

  function touchDay() {
    const t = dayKey();
    if (S.lastDay === t) return;
    const y = dayKey(new Date(Date.now() - DAY));
    S.streak = S.lastDay === y ? S.streak + 1 : 1;
    S.lastDay = t;
  }
  function addXP(n) {
    if (!n) return;
    touchDay();
    const t = dayKey();
    const before = S.days[t] || 0;
    S.xp += n; S.days[t] = before + n;
    save(); renderHeader();
    if (before < S.settings.goal && S.days[t] >= S.settings.goal) toast('Daily goal reached. Puiku!');
  }
  const todayXP = () => S.days[dayKey()] || 0;
  const streakNow = () => (S.lastDay === dayKey() || S.lastDay === dayKey(new Date(Date.now() - DAY))) ? S.streak : 0;

  /* SRS — Leitner boxes */
  const INTERVALS = [0, 1, 3, 7, 14, 30, 60];
  function enroll(id, known) {
    if (!VERB[id] || S.cards[id]) return;
    S.cards[id] = { box: known ? 1 : 0, due: Date.now() + (known ? DAY : 0) };
  }
  function grade(id, ok) {
    if (!VERB[id]) return;
    const c = S.cards[id] || (S.cards[id] = { box: 0, due: 0 });
    c.box = ok ? Math.min(c.box + 1, INTERVALS.length - 1) : 1;
    c.due = Date.now() + INTERVALS[ok ? c.box : 1] * DAY - (ok ? 0 : DAY / 2);
  }
  const dueCards = () => Object.keys(S.cards).filter(k => VERB[k] && S.cards[k].due <= Date.now());
  const isKnown = id => S.cards[id] && S.cards[id].box >= 3;

  /* lesson gating */
  function unlocked(i) {
    if (i === 0 || S.settings.unlockAll) return true;
    return !!(S.lessons[D.LESSONS[i - 1].id] || {}).done;
  }
  function status(i) {
    const l = D.LESSONS[i], s = S.lessons[l.id];
    if (s && s.done) return 'done';
    if (!unlocked(i)) return 'locked';
    return s && (s.practice || s.convo || s.cards) ? 'progress' : 'open';
  }

  /* ---------- speech ---------- */
  let ltVoice = null, voiceNoted = false;
  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const vs = speechSynthesis.getVoices();
    ltVoice = vs.find(v => /^lt/i.test(v.lang)) || null;
  }
  if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(text, slow) {
    if (!('speechSynthesis' in window)) { toast('Audio is not supported in this browser.'); return Promise.resolve(); }
    if (!ltVoice && !voiceNoted) { voiceNoted = true; toast('No Lithuanian voice is installed on this device, so the default voice is used. Pronunciation may be off.'); }
    return new Promise(res => {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/[\[\]]/g, ''));
      u.lang = 'lt-LT'; if (ltVoice) u.voice = ltVoice;
      u.rate = slow ? 0.6 : S.settings.rate;
      u.onend = u.onerror = res;
      speechSynthesis.speak(u);
    });
  }
  const audioBtns = (text, small) => `<span class="audio${small ? ' sm' : ''}"><button class="icon-btn" data-act="say" data-text="${esc(text)}" aria-label="Play audio" title="Play">${ICON.play}</button><button class="icon-btn" data-act="say" data-slow="1" data-text="${esc(text)}" aria-label="Play slowly" title="Slow">${ICON.slow}</button></span>`;

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function lev(a, b) {
    const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function listen(target, out) {
    if (!SR) { out.innerHTML = '<span class="muted">Speech recognition isn’t available in this browser. Say the line aloud, then play it to compare.</span>'; return; }
    const r = new SR(); r.lang = 'lt-LT'; r.interimResults = false; r.maxAlternatives = 3;
    out.innerHTML = '<span class="muted">Listening… speak now.</span>';
    r.onresult = e => {
      const alts = Array.from(e.results[0]).map(a => a.transcript);
      const t = norm(stripMarks(target));
      let best = 0, said = alts[0];
      alts.forEach(a => { const s = norm(stripMarks(a)); const sc = 1 - lev(s, t) / Math.max(s.length, t.length, 1); if (sc > best) { best = sc; said = a; } });
      const pct = Math.round(best * 100);
      out.innerHTML = `<span class="${pct >= 75 ? 'good' : 'warn'}">${pct}% match.</span> <span class="muted">Heard: “${esc(said)}”</span>`;
      if (pct >= 75) addXP(3);
    };
    r.onerror = e => { out.innerHTML = `<span class="muted">${e.error === 'not-allowed' || e.error === 'service-not-allowed' ? 'Microphone access is blocked here. Say the line aloud, then play it to compare.' : 'Didn’t catch that. Try again.'}</span>`; };
    try { r.start(); } catch (e) { out.innerHTML = '<span class="muted">Couldn’t start the microphone.</span>'; }
  }

  /* ---------- toast ---------- */
  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
    $('#toasts').appendChild(t);
    setTimeout(() => t.classList.add('out'), 3200); setTimeout(() => t.remove(), 3700);
  }

  /* ---------- header ---------- */
  function renderHeader() {
    const due = dueCards().length;
    const pct = Math.min(100, Math.round(todayXP() / S.settings.goal * 100));
    $('#hdr-stats').innerHTML = `
      <span class="stat" title="Day streak">${ICON.flame}<b>${streakNow()}</b></span>
      <span class="stat goal" title="Daily goal: ${todayXP()} of ${S.settings.goal} XP" style="--p:${pct}"><i></i><b>${todayXP()}</b><small>/${S.settings.goal}</small></span>`;
    const b = $('#nav-review-badge'); b.textContent = due; b.hidden = !due;
    document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('on', a.dataset.nav === route.name));
  }

  /* ---------- router ---------- */
  let route = { name: 'home' };
  function parseHash() {
    const h = location.hash.replace('#', '');
    if (/^l\d+$/.test(h) && D.LESSONS.some(l => l.id === h)) return { name: 'lesson', id: h };
    if (['review', 'reference', 'science', 'home'].includes(h)) return { name: h };
    return { name: 'home' };
  }
  function go(h) { if (location.hash === '#' + h) onRoute(); else location.hash = h; }
  function onRoute() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    route = parseHash();
    if (route.name === 'lesson') {
      const i = D.LESSONS.findIndex(l => l.id === route.id);
      if (!unlocked(i)) { toast('Finish the previous lesson to unlock this one, or turn on "Unlock all lessons" in Settings.'); route = { name: 'home' }; }
    }
    ({ home: renderHome, lesson: () => openLesson(route.id), review: renderReview, reference: renderReference, science: renderScience })[route.name]();
    renderHeader();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', onRoute);

  /* ---------- home ---------- */
  function renderHome() {
    const learned = Object.keys(S.cards).filter(k => VERB[k]).length;
    const due = dueCards().length;
    const nextI = D.LESSONS.findIndex((l, i) => unlocked(i) && !(S.lessons[l.id] || {}).done);
    const next = D.LESSONS[nextI];
    const perCase = CASE_KEYS.map(c => {
      const all = VERBS.filter(v => v.case === c);
      const seen = all.filter(v => S.cards[v.id]).length, known = all.filter(v => isKnown(v.id)).length;
      return `<div class="cbar"><div class="cbar-h"><span class="dot c-${c}"></span><b>${CASES[c].name}</b><span class="q">${CASES[c].q}</span><span class="n">${seen}<small>/${all.length}</small></span></div>
        <div class="track"><span class="seen c-${c}" style="width:${seen / all.length * 100}%"></span><span class="known c-${c}" style="width:${known / all.length * 100}%"></span></div></div>`;
    }).join('');

    const levels = D.LEVELS.map(lv => {
      const ls = D.LESSONS.map((l, i) => ({ l, i })).filter(x => x.l.level === lv.id);
      return `<section class="level">
        <header class="level-h"><span class="cefr">${lv.id}</span><div><h3>${lv.lt} <span class="muted">· ${lv.en}</span></h3><p>${lv.blurb}</p></div></header>
        <ol class="lessons">${ls.map(({ l, i }) => lessonRow(l, i)).join('')}</ol></section>`;
    }).join('');

    app.innerHTML = `
      <section class="hero">
        <div class="hero-text">
          <p class="eyebrow">Lithuanian verb case government</p>
          <h1>Which case does the verb want?</h1>
          <p class="lede">Every Lithuanian verb decides the case of the word after it. Learn all 174 verbs from the <i>Spoken Lithuanian</i> reference in 15 short lessons, with role-play conversations, from first steps to mastery.</p>
          <div class="hero-cta">
            ${next ? `<a class="btn primary" href="#${next.id}">${status(nextI) === 'progress' ? 'Continue' : 'Start'}: ${esc(next.title)} ${ICON.arrow}</a>` : `<a class="btn primary" href="#review">All lessons complete. Review ${ICON.arrow}</a>`}
            ${due ? `<a class="btn" href="#review">Review ${due} due</a>` : ''}
          </div>
        </div>
        <div class="qwheel" aria-label="The five case questions">
          ${CASE_KEYS.map(c => `<div class="qw c-${c}"><b>${CASES[c].q}</b><span>${CASES[c].lt}</span></div>`).join('')}
        </div>
      </section>

      <section class="dash">
        <div class="tiles">
          <div class="tile"><span class="lbl">Streak</span><b>${streakNow()}</b><span class="unit">day${streakNow() === 1 ? '' : 's'}</span></div>
          <div class="tile"><span class="lbl">Today</span><b>${todayXP()}</b><span class="unit">/ ${S.settings.goal} XP</span></div>
          <div class="tile"><span class="lbl">Verbs started</span><b>${learned}</b><span class="unit">/ ${VERBS.length}</span></div>
          <div class="tile"><span class="lbl">Due for review</span><b>${due}</b><span class="unit">cards</span></div>
        </div>
        <div class="cases-card">
          <h2 class="h-sm">Progress by case</h2>
          ${perCase}
          <p class="legend"><span class="sw seen"></span>started <span class="sw known"></span>known (reviewed 3+ times)</p>
        </div>
      </section>

      <h2 class="section-h">Your path</h2>
      <div class="path">${levels}</div>`;
  }
  function lessonRow(l, i) {
    const st = status(i), s = S.lessons[l.id] || {};
    const n = l.special === 'neg' ? D.NEGATION.length + ' contrasts' : l.special === 'pairs' ? D.PAIRS.length + ' pairs' : l.special === 'mix' ? 'all 174 verbs' : verbsOf(l.id).length + ' verbs';
    const pill = { done: `<span class="pill good">${ICON.check} Complete</span>`, locked: `<span class="pill">${ICON.lock} Locked</span>`, progress: `<span class="pill amber">In progress</span>`, open: `<span class="pill amber-o">Ready</span>` }[st];
    const inner = `<span class="ln">${i + 1}</span>
      <span class="lt-body"><span class="lt-title">${esc(l.title)}</span><span class="lt-sub"><i>${esc(l.lt)}</i> · ${n} · ${l.minutes} min</span></span>
      <span class="lt-cases">${l.cases.map(c => `<span class="dot c-${c}" title="${CASES[c].name}"></span>`).join('')}</span>
      <span class="lt-meta">${s.practice ? `<span class="score">${s.practice}%</span>` : ''}${pill}</span>`;
    return `<li class="lrow ${st}">${st === 'locked' ? `<div class="lrow-in" aria-disabled="true">${inner}</div>` : `<a class="lrow-in" href="#${l.id}">${inner}</a>`}</li>`;
  }

  /* ---------- lesson ---------- */
  const STEPS = [['goals', 'Goals'], ['discover', 'Discover'], ['learn', 'Learn'], ['practice', 'Practice'], ['converse', 'Converse'], ['reflect', 'Reflect']];
  const STEP_SCIENCE = { goals: 'Goal setting', discover: 'Noticing', learn: 'Retrieval practice', practice: 'Retrieval · Interleaving · Feedback', converse: 'Interaction · Output', reflect: 'Self-assessment' };
  let L = null;

  function openLesson(id) {
    const lesson = D.LESSONS.find(l => l.id === id);
    L = { lesson, step: 'goals', deck: buildDeck(lesson), di: 0, flipped: false };
    renderLesson();
  }
  function renderLesson() {
    const { lesson, step } = L, s = LS(lesson.id), idx = D.LESSONS.indexOf(lesson);
    const stepDone = { goals: true, discover: true, learn: s.cards >= L.deck.length, practice: s.practice >= 70, converse: s.convo, reflect: s.done };
    app.innerHTML = `
      <div class="lesson">
        <div class="lesson-top">
          <a class="back" href="#home">${ICON.back} Path</a>
          <div class="lesson-title">
            <p class="eyebrow">${lesson.level} · Lesson ${idx + 1} · <i>${esc(lesson.lt)}</i></p>
            <h1>${esc(lesson.title)}</h1>
          </div>
        </div>
        <nav class="stepper" aria-label="Lesson steps">
          ${STEPS.map(([k, label], n) => `<button class="step ${k === step ? 'on' : ''} ${stepDone[k] && k !== 'goals' && k !== 'discover' ? 'done' : ''}" data-act="step" data-step="${k}"><span class="sn">${stepDone[k] && k !== 'goals' && k !== 'discover' ? ICON.check : n + 1}</span>${label}</button>`).join('')}
        </nav>
        <p class="sci-tag">Research basis: ${STEP_SCIENCE[step]} · <a href="#science">why this works</a></p>
        <div id="stage" class="stage"></div>
      </div>`;
    ({ goals: stepGoals, discover: stepDiscover, learn: stepLearn, practice: stepPractice, converse: stepConverse, reflect: stepReflect })[step]($('#stage'));
  }
  function setStep(k) { L.step = k; renderLesson(); window.scrollTo(0, 0); }
  const nextStepBtn = (k, label) => `<button class="btn primary" data-act="step" data-step="${k}">${label} ${ICON.arrow}</button>`;

  function stepGoals(el) {
    const l = L.lesson;
    const vs = l.special === 'mix' ? [] : l.special === 'neg' ? [] : l.special === 'pairs' ? [] : verbsOf(l.id);
    el.innerHTML = `
      <div class="goals">
        <h2 class="h-md">By the end of this lesson you can:</h2>
        <ol class="goal-list">${l.goals.map(g => `<li>${esc(g)}</li>`).join('')}</ol>
        <div class="meta-row">
          <span>${ICON.star} About ${l.minutes} minutes</span>
          <span>Focus: ${l.cases.map(c => chip(c)).join(' ')}</span>
        </div>
        ${vs.length ? `<h3 class="h-sm">Verbs in this lesson</h3><div class="verb-cloud">${vs.map(v => `<span class="vchip c-${v.case}">${esc(v.verb)}</span>`).join('')}</div>` : ''}
        <div class="actions">${nextStepBtn('discover', 'Start')}</div>
      </div>`;
  }

  function endingsTable(focus) {
    const E = D.ENDINGS;
    return `<div class="table-wrap"><table class="endings">
      <thead><tr><th>Nominative</th>${CASE_KEYS.map(c => `<th class="${focus.includes(c) ? 'focus c-' + c : ''}">${CASES[c].name}<small>${CASES[c].q}</small></th>`).join('')}</tr></thead>
      <tbody>${E.rows.map(r => `<tr><th>${esc(r[0])}</th>${r.slice(1).map((f, i) => `<td class="${focus.includes(CASE_KEYS[i]) ? 'focus c-' + CASE_KEYS[i] : ''}">${esc(f)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  }
  function stepDiscover(el) {
    const l = L.lesson;
    let examples = '';
    if (l.special === 'neg') {
      examples = `<div class="neg-grid">${D.NEGATION.slice(0, 4).concat(D.NEGATION.slice(8, 10)).map(n => `
        <div class="neg-card"><p class="lt">${esc(n[0])}</p><p class="arrow-down">${n[4] ? 'stays ' + CASES[n[4]].name : 'Accusative → Genitive'}</p><p class="lt strong">${esc(n[1])} ${audioBtns(n[1], 1)}</p><p class="en">${esc(n[3])}</p></div>`).join('')}</div>`;
    } else if (l.special === 'pairs') {
      examples = `<div class="pairs">${D.PAIRS.map(p => pairCard(p)).join('')}</div>`;
    } else if (l.special === 'mix') {
      examples = `<div class="case-grid">${CASE_KEYS.map(c => `<div class="case-card c-${c}"><div class="cc-h"><b>${CASES[c].q}</b><span>${CASES[c].name} · <i>${CASES[c].lt}</i></span></div><p>${esc(CASES[c].idea)}</p><p class="cc-n">${VERBS.filter(v => v.case === c).length} verbs</p></div>`).join('')}</div>`;
    } else {
      const vs = pick(verbsOf(l.id), 4);
      examples = `<h3 class="h-sm">Spot the pattern</h3><p class="muted">The coloured word is the one the verb controls. Look at its ending.</p>
        <ul class="ex-list">${vs.map(v => `<li><p class="lt">${marked(v)} ${audioBtns(v.plain, 1)}</p><p class="en">${esc(v.tr)} <span class="muted">· ${esc(v.verb)} → ${CASES[v.case].name}; ${esc(v.lemma)} → ${esc(v.form)}</span></p></li>`).join('')}</ul>`;
    }
    const caseCards = l.special === 'mix' || l.special === 'pairs' ? '' : `<div class="case-grid">${l.cases.map(c => `<div class="case-card c-${c}"><div class="cc-h"><b>${CASES[c].q}</b><span>${CASES[c].name} · <i>${CASES[c].lt}</i></span></div><p>${CASES[c].qEn[0].toUpperCase() + CASES[c].qEn.slice(1)} Used for ${esc(CASES[c].idea)}</p></div>`).join('')}</div>`;
    el.innerHTML = `
      <div class="discover">
        <div class="prose">${l.intro}</div>
        ${caseCards}
        <div class="tip"><b>Pattern to notice</b><p>${l.tip}</p></div>
        ${examples}
        <details class="endings-box" ${l.level === 'A1' ? 'open' : ''}><summary>Case endings at a glance</summary>${endingsTable(l.cases)}</details>
        <div class="actions">${nextStepBtn('learn', 'Learn the verbs')}</div>
      </div>`;
  }
  function pairCard(p) {
    const side = x => { const s = parseSentence(x[1]); const c = x[0]; return `<div class="pside"><div>${chip(c)}</div><p class="lt">${esc(s.pre)}<mark class="obj c-${c}">${esc(s.form)}</mark>${esc(s.post)} ${audioBtns(s.plain, 1)}</p><p class="en">${esc(x[2])}</p><p class="why">${esc(x[3])}</p></div>`; };
    return `<div class="pair"><h4>${esc(p.verb)}</h4><div class="pair-sides">${side(p.a)}${side(p.b)}</div></div>`;
  }

  /* flashcards */
  function buildDeck(l) {
    if (l.special === 'neg') return D.NEGATION.map(n => ({ front: `<p class="card-lt">${esc(n[0])}</p><p class="card-q">Say it in the negative.</p>`, back: `<p class="card-lt">${esc(n[1])}</p><p class="card-en">${esc(n[3])}</p><p>${n[4] ? `${chip(n[4])} stays ${CASES[n[4]].name}: only the Accusative changes.` : `${chip('acc')} → ${chip('gen')} after <i>ne-</i>`}</p>`, say: n[1] }));
    if (l.special === 'pairs') return D.PAIRS.flatMap(p => [p.a, p.b].map(x => { const s = parseSentence(x[1]); return { front: `<p class="card-lt">${esc(s.plain)}</p><p class="card-q">Which case, and what does it add?</p>`, back: `<p>${chip(x[0])}</p><p class="card-lt">${esc(s.pre)}<mark class="obj c-${x[0]}">${esc(s.form)}</mark>${esc(s.post)}</p><p class="card-en">${esc(x[2])}</p><p class="muted">${esc(x[3])}</p>`, say: s.plain }; }));
    const vs = l.special === 'mix' ? pick(VERBS, 20) : verbsOf(l.id);
    return vs.map(v => ({ id: v.id, front: `<p class="card-verb">${esc(v.verb)}</p><p class="card-mean">${esc(v.meaning)}</p><p class="card-q">Which case does it take? Decide, then flip.</p>`, back: `<p>${chip(v.case)} <span class="muted">answers ${CASES[v.case].q}</span></p><p class="card-lt">${marked(v)}</p><p class="card-en">${esc(v.tr)}</p>${v.note ? `<p class="card-note">${esc(v.note)}</p>` : ''}`, say: v.plain, case: v.case }));
  }
  function stepLearn(el) {
    const d = L.deck, i = L.di, s = LS(L.lesson.id);
    if (i >= d.length) {
      el.innerHTML = `<div class="done-panel"><h2 class="h-md">Deck complete</h2><p>${d.filter(c => c.id).length ? 'These verbs are now in your review queue. You will see them again just before you are likely to forget them.' : 'You have seen every card in this set.'}</p>
        <div class="actions"><button class="btn" data-act="deck-restart">Go through again</button>${nextStepBtn('practice', 'Practise')}</div></div>`;
      return;
    }
    const c = d[i];
    el.innerHTML = `
      <div class="learn">
        <div class="deck-progress"><span style="width:${i / d.length * 100}%"></span></div>
        <p class="muted center">Card ${i + 1} of ${d.length}</p>
        <button class="flash ${L.flipped ? 'flipped' : ''} ${c.case ? 'k-' + c.case : ''}" data-act="flip" aria-label="Flip card">
          <span class="face front">${c.front}<span class="hint">Tap or press Space to flip</span></span>
          <span class="face back">${c.back}</span>
        </button>
        <div class="flash-actions">
          ${audioBtns(c.say)}
          ${L.flipped ? `<button class="btn" data-act="rate" data-ok="0">Again</button><button class="btn primary" data-act="rate" data-ok="1">Got it</button>` : `<button class="btn primary" data-act="flip">Show answer</button>`}
        </div>
      </div>`;
    s.cards = Math.max(s.cards, i);
  }

  /* ---------- quiz engine ---------- */
  let Q = null;
  const OPT_CASES = CASE_KEYS.map(c => ({ v: c, html: `${chip(c)} <span class="muted">${CASES[c].q}</span>` }));

  function itemFor(v, type, pool) {
    const base = { key: v.id, v };
    switch (type) {
      case 'case': return { ...base, type: 'choice', prompt: `Which case does <b>${esc(v.verb)}</b> <span class="muted">(${esc(v.meaning)})</span> take?`, body: `<p class="q-lt">${blanked(v)}</p><p class="q-en">${esc(v.tr)}</p>`, options: OPT_CASES, answer: v.case };
      case 'question': return { ...base, type: 'choice', prompt: 'Which case question does the highlighted word answer?', body: `<p class="q-lt">${marked(v, 'neutral')}</p><p class="q-en">${esc(v.tr)}</p>`, options: CASE_KEYS.map(c => ({ v: c, html: `<b class="qword">${CASES[c].q}</b> <span class="muted">${CASES[c].qEn}</span>` })), answer: v.case };
      case 'meaning': {
        const others = pick(pool.filter(x => x.meaning !== v.meaning), 3).map(x => x.meaning);
        while (others.length < 3) { const r = VERBS[Math.floor(Math.random() * VERBS.length)].meaning; if (r !== v.meaning && !others.includes(r)) others.push(r); }
        return { ...base, type: 'choice', prompt: `What does <b class="big-lt">${esc(v.verb)}</b> mean?`, body: '', options: shuffle([v.meaning, ...others]).map(m => ({ v: m, html: esc(m) })), answer: v.meaning };
      }
      case 'produce': return { ...base, type: 'type', prompt: `Type the missing word. <span class="muted">Nominative given in brackets.</span>`, body: `<p class="q-lt">${blanked(v)} <span class="lemma">(${esc(v.lemma)})</span></p><p class="q-en">${esc(v.tr)}</p>`, answers: [v.form] };
      case 'detect': {
        const pre = v.pre.trim() ? v.pre.trim().split(/\s+/) : [];
        const formN = v.form.split(' ').length;
        const words = v.plain.split(/\s+/);
        const target = []; for (let k = 0; k < formN; k++) target.push(pre.length + k);
        return { ...base, type: 'detect', prompt: `Tap the word whose case <b>${esc(v.verb)}</b> controls.`, words, target, body: `<p class="q-en">${esc(v.tr)}</p>` };
      }
      case 'build': return { ...base, type: 'build', prompt: 'Listen, then build the sentence.', words: v.plain.split(/\s+/), body: `<p class="q-en">${esc(v.tr)}</p>`, say: v.plain };
    }
  }
  function explainVerb(v) {
    return `<p><b>${esc(v.verb)}</b> takes the ${chip(v.case)}, which answers <b>${CASES[v.case].q}</b></p>
      <p class="q-lt">${marked(v)} ${audioBtns(v.plain, 1)}</p><p class="q-en">${esc(v.tr)}</p>${v.note ? `<p class="card-note">${esc(v.note)}</p>` : ''}`;
  }
  function negItems() {
    return shuffle(D.NEGATION).map(n => ({ type: 'choice', prompt: `Make it negative: <span class="q-en">“${esc(n[3])}”</span>`, body: `<p class="q-lt">${esc(n[0])}</p>`, options: shuffle([n[1], n[2]]).map(o => ({ v: o, html: `<span class="lt">${esc(o)}</span>` })), answer: n[1],
      explain: `<p class="q-lt">${esc(n[1])} ${audioBtns(n[1], 1)}</p><p>${n[4] ? `This verb takes the ${chip(n[4])}, so negation changes nothing.` : `A negated Accusative object shifts to the ${chip('gen')}.`}</p>` }));
  }
  function pairItems() {
    const items = [];
    D.PAIRS.forEach(p => [p.a, p.b].forEach(x => {
      const s = parseSentence(x[1]), other = x === p.a ? p.b : p.a;
      items.push({ type: 'choice', prompt: `What does the case add in this sentence with <b>${esc(p.verb)}</b>?`, body: `<p class="q-lt">${esc(s.pre)}<mark class="obj neutral">${esc(s.form)}</mark>${esc(s.post)}</p>`,
        options: shuffle([x, other]).map(o => ({ v: o[3], html: `${chip(o[0])} ${esc(o[3])}` })), answer: x[3],
        explain: `<p class="q-lt">${esc(s.pre)}<mark class="obj c-${x[0]}">${esc(s.form)}</mark>${esc(s.post)} ${audioBtns(s.plain, 1)}</p><p class="q-en">${esc(x[2])}</p><p>Compare: <i>${esc(parseSentence(other[1]).plain)}</i> (${esc(other[2])})</p>` });
    }));
    return pick(items, 12);
  }
  const TYPES = ['case', 'produce', 'meaning', 'detect', 'question', 'build'];
  function verbItems(vs, n, pool) {
    const order = shuffle(vs), out = [];
    const types = shuffle(TYPES);
    for (let k = 0; k < n; k++) {
      const v = order[k % order.length];
      let t = types[k % types.length];
      if (t === 'build' && v.plain.split(/\s+/).length < 3) t = 'case';
      out.push(itemFor(v, t, pool));
    }
    return shuffle(out);
  }

  function startQuiz(host, items, onDone) {
    Q = { host, items: items.map((it, n) => ({ ...it, n })), i: 0, firstCorrect: 0, total: items.length, retried: new Set(), wrongOnce: new Set(), state: 'ask', onDone };
    renderQ();
  }
  function renderQ() {
    const { host } = Q;
    if (Q.i >= Q.items.length) {
      const score = Math.round(Q.firstCorrect / Q.total * 100);
      Q.onDone(score); return;
    }
    const it = Q.items[Q.i];
    if (Q.state === 'ask') { it._opts = it._opts || it.options; it._tiles = it._tiles || (it.words ? shuffle(it.words.map((w, k) => ({ w, k }))) : null); it._built = it._built || []; }
    const prog = `<div class="qprog"><span style="width:${Math.min(Q.i, Q.total) / Q.total * 100}%"></span></div><p class="muted qcount">${it.retry ? 'Second try' : `Question ${Math.min(it.n + 1, Q.total)} of ${Q.total}`}</p>`;
    let body = '';
    if (it.type === 'choice') {
      body = `<div class="opts">${it._opts.map((o, k) => `<button class="opt ${Q.state === 'fb' ? (o.v === it.answer ? 'right' : (o.v === Q.picked ? 'wrong' : 'dim')) : ''}" data-act="opt" data-k="${k}" ${Q.state === 'fb' ? 'disabled' : ''}><kbd>${k + 1}</kbd>${o.html}</button>`).join('')}</div>`;
    } else if (it.type === 'type') {
      body = `<form class="typer" data-form="type"><input id="q-input" class="tin ${Q.state === 'fb' ? (Q.ok ? 'right' : 'wrong') : ''}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type the form" value="${Q.state === 'fb' ? esc(Q.typed) : ''}" ${Q.state === 'fb' ? 'disabled' : ''} aria-label="Your answer">
        ${Q.state === 'ask' ? `<button class="btn primary" type="submit">Check</button>` : ''}</form>
        ${Q.state === 'ask' ? ltKeys() : ''}`;
    } else if (it.type === 'detect') {
      body = `<div class="detect">${it.words.map((w, k) => `<button class="tok ${Q.state === 'fb' ? (it.target.includes(k) ? 'right c-' + it.v.case : (k === Q.picked ? 'wrong' : '')) : ''}" data-act="tok" data-k="${k}" ${Q.state === 'fb' ? 'disabled' : ''}>${esc(w)}</button>`).join('')}</div>`;
    } else if (it.type === 'build') {
      body = `<div class="build-head">${audioBtns(it.say)}</div>
        <div class="built ${Q.state === 'fb' ? (Q.ok ? 'right' : 'wrong') : ''}" aria-label="Your sentence">${it._built.map((t, k) => `<button class="tile" data-act="unbuild" data-k="${k}" ${Q.state === 'fb' ? 'disabled' : ''}>${esc(t.w)}</button>`).join('') || '<span class="muted">Tap the words in order</span>'}</div>
        <div class="tiles-pool">${it._tiles.map((t, k) => it._built.includes(t) ? `<span class="tile ghost">${esc(t.w)}</span>` : `<button class="tile" data-act="build" data-k="${k}" ${Q.state === 'fb' ? 'disabled' : ''}>${esc(t.w)}</button>`).join('')}</div>
        ${Q.state === 'ask' ? `<div class="actions left"><button class="btn primary" data-act="build-check" ${it._built.length === it.words.length ? '' : 'disabled'}>Check</button></div>` : ''}`;
    }
    let fb = '';
    if (Q.state === 'fb') {
      const ex = it.explain || (it.v ? explainVerb(it.v) : '');
      fb = `<div class="feedback ${Q.ok ? 'ok' : 'no'}" role="status">
        <p class="fb-h">${Q.ok ? (Q.almost ? 'Almost. Watch the accents' : pick(['Teisingai!', 'Puiku!', 'Šaunu!', 'Labai gerai!'], 1)[0]) : 'Not quite'}</p>
        ${Q.almost ? `<p>You typed <b>${esc(Q.typed)}</b>; the exact form is <b>${esc(it.answers[0])}</b>.</p>` : ''}
        ${!Q.ok && it.type === 'type' ? `<p>The answer is <b>${esc(it.answers[0])}</b>.</p>` : ''}
        ${ex}
        ${!Q.ok && !it.retry ? '<p class="muted">This one will come back at the end of the round.</p>' : ''}
        <div class="actions left"><button class="btn primary" data-act="qnext" id="qnext">Continue ${ICON.arrow}</button></div></div>`;
    }
    host.innerHTML = `<div class="quiz">${prog}<div class="qcard"><p class="q-prompt">${it.prompt}</p>${it.body || ''}${body}</div>${fb}</div>`;
    if (Q.state === 'ask' && it.type === 'type') $('#q-input', host).focus();
    if (Q.state === 'ask' && it.type === 'build' && !it._spoken) { it._spoken = true; }
    if (Q.state === 'fb') $('#qnext', host).focus();
  }
  function ltKeys() { return `<div class="ltkeys" aria-label="Lithuanian letters">${'ą č ę ė į š ų ū ž'.split(' ').map(c => `<button type="button" class="key" data-act="key" data-c="${c}">${c}</button>`).join('')}</div>`; }
  function answerQ(ok, extra = {}) {
    const it = Q.items[Q.i];
    Object.assign(Q, { state: 'fb', ok, almost: false, ...extra });
    if (!it.retry) {
      if (ok) { Q.firstCorrect++; addXP(10); }
      else Q.items.push({ ...it, retry: true, _opts: null, _tiles: null, _built: null });
    } else if (ok) addXP(4);
    if (it.key) { grade(it.key, ok); save(); }
    renderQ();
  }
  function quizNext() { Q.i++; Q.state = 'ask'; Q.picked = null; renderQ(); }

  function stepPractice(el) {
    const l = L.lesson, s = LS(l.id);
    let items;
    if (l.special === 'neg') items = negItems();
    else if (l.special === 'pairs') items = pairItems();
    else if (l.special === 'mix') items = verbItems(pick(VERBS, 15), 15, VERBS);
    else { const vs = verbsOf(l.id); items = verbItems(vs, Math.min(12, Math.max(10, vs.length)), vs); }
    el.innerHTML = `<div class="practice-intro">
        <p>${items.length} questions, mixing six exercise types. Anything you miss comes back at the end. Score <b>70%</b> or more to pass.</p>
        ${s.practice ? `<p class="muted">Best score so far: <b>${s.practice}%</b></p>` : ''}
        <div class="actions left"><button class="btn primary" data-act="practice-go">Begin practice ${ICON.arrow}</button></div></div>`;
    L.pendingItems = items;
  }
  function practiceDone(score) {
    const s = LS(L.lesson.id);
    const best = Math.max(s.practice || 0, score); s.practice = best; save();
    const pass = score >= 70;
    if (pass) addXP(20);
    $('#stage').innerHTML = `<div class="done-panel">
      <div class="score-ring ${pass ? 'pass' : ''}" style="--p:${score}"><b>${score}%</b><span>first try</span></div>
      <h2 class="h-md">${pass ? 'Practice passed' : 'Keep going'}</h2>
      <p>${pass ? 'Now use these verbs in a real conversation.' : 'You need 70% to pass. Go through the flashcards again or try another round; each round uses new questions.'}</p>
      <div class="actions"><button class="btn" data-act="step" data-step="practice">Another round</button>${pass ? nextStepBtn('converse', 'Start the conversation') : `<button class="btn" data-act="step" data-step="learn">Back to flashcards</button>`}</div></div>`;
  }

  /* ---------- conversation ---------- */
  let C = null;
  function stepConverse(el) {
    const d = L.lesson.dialogue;
    C = { d, i: 0, log: [], showEn: S.settings.showEn, tries: 0, opts: null };
    el.innerHTML = `
      <div class="convo">
        <div class="convo-h">
          <div class="avatar">${esc(d.partner[0])}</div>
          <div><p class="eyebrow">${esc(d.en)}</p><h2 class="h-md">${esc(d.title)}</h2><p class="muted">With ${esc(d.partner)}, ${esc(d.role)}</p></div>
          <label class="toggle"><input type="checkbox" id="en-toggle" ${C.showEn ? 'checked' : ''}><span>Show English</span></label>
        </div>
        <div class="chat" id="chat" aria-live="polite"></div>
        <div class="reply" id="reply"></div>
      </div>`;
    advance();
  }
  function bubble(who, lt, en) {
    return `<div class="msg ${who}"><div class="bub"><p class="lt">${esc(lt)}</p>${en ? `<p class="en ${C.showEn ? '' : 'hide'}">${esc(en)}</p>` : ''}</div>${audioBtns(lt, 1)}</div>`;
  }
  function advance() {
    const lines = C.d.lines;
    while (C.i < lines.length && lines[C.i][0] === 'n') {
      C.log.push(['them', lines[C.i][1], lines[C.i][2]]); C.i++;
    }
    drawChat();
    const last = C.log[C.log.length - 1];
    if (last && last[0] === 'them' && S.settings.autoplay !== false) speak(last[1]);
    if (C.i >= lines.length) return finishConvo();
    C.tries = 0; C.opts = lines[C.i][0] === 'c' ? shuffle(lines[C.i][2]) : null;
    drawReply();
  }
  function drawChat() {
    const chat = $('#chat');
    chat.innerHTML = C.log.map(m => bubble(m[0], m[1], m[2])).join('');
    chat.lastElementChild && chat.lastElementChild.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  function drawReply(fb) {
    const line = C.d.lines[C.i], r = $('#reply');
    if (line[0] === 'c') {
      r.innerHTML = `<p class="intent"><b>Your turn:</b> ${esc(line[1])}</p>
        <div class="opts">${C.opts.map((o, k) => `<button class="opt lt-opt" data-act="copt" data-k="${k}"><kbd>${k + 1}</kbd><span class="lt">${esc(o[0])}</span></button>`).join('')}</div>
        ${fb || ''}`;
    } else {
      const [, intent, frame, , lemma, en] = line;
      const [a, b] = frame.split('___');
      r.innerHTML = `<p class="intent"><b>Your turn:</b> ${esc(intent)}</p>
        <form class="typer frame" data-form="ctype"><span class="lt">${esc(a)}</span><input id="c-input" class="tin" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Missing word" placeholder="${esc(lemma)}"><span class="lt">${esc(b)}</span><button class="btn primary" type="submit">Say it</button></form>
        ${ltKeys()}
        <p class="muted">Nominative: <i>${esc(lemma)}</i> · ${esc(en)}</p>
        ${fb || ''}`;
      $('#c-input').focus();
    }
  }
  function convoChoice(k) {
    const o = C.opts[k];
    if (o[2]) {
      addXP(C.tries ? 2 : 5);
      C.log.push(['me', o[0], o[1]]); C.i++;
      const fbHtml = `<div class="feedback ok inline"><p>${esc(o[3])}</p></div>`;
      advance();
      if (C.i < C.d.lines.length) $('#reply').insertAdjacentHTML('afterbegin', fbHtml);
    } else {
      C.tries++;
      drawReply(`<div class="feedback no inline"><p><b>${esc(o[0])}</b>: ${esc(o[3])}</p><p class="muted">Try again.</p></div>`);
    }
  }
  function convoType(val) {
    const line = C.d.lines[C.i];
    const answers = line[3].split('|');
    const v = norm(val);
    const exact = answers.find(a => norm(a) === v);
    const loose = answers.find(a => norm(stripMarks(a)) === norm(stripMarks(val)));
    if (exact || loose) {
      const ans = exact || loose;
      addXP(C.tries ? 3 : 8);
      C.log.push(['me', line[2].replace('___', ans), line[5]]); C.i++;
      advance();
      const note = exact ? `Correct: <b>${esc(ans)}</b>.` : `Accepted, but watch the accents: <b>${esc(ans)}</b>.`;
      if (C.i < C.d.lines.length) $('#reply').insertAdjacentHTML('afterbegin', `<div class="feedback ok inline"><p>${note}</p></div>`);
    } else {
      C.tries++;
      drawReply(`<div class="feedback no inline"><p>${C.tries >= 2 ? `The answer is <b>${esc(answers[0])}</b>. Type it to continue.` : `Not quite. Think about the case question for this verb, then try again.`}</p></div>`);
    }
  }
  function finishConvo() {
    const s = LS(L.lesson.id);
    if (!s.convo) { s.convo = true; addXP(20); save(); }
    const mine = C.log.filter(m => m[0] === 'me');
    $('#reply').innerHTML = `
      <div class="done-panel left">
        <h2 class="h-md">Conversation complete</h2>
        <p>Now shadow it: play each of your lines, then say it out loud${SR ? ' or record yourself for a match score' : ''}.</p>
        <ul class="shadow">${mine.map((m, k) => `<li><p class="lt">${esc(m[1])}</p><div class="sh-act">${audioBtns(m[1], 1)}${SR ? `<button class="icon-btn" data-act="mic" data-k="${k}" aria-label="Record yourself" title="Record">${ICON.mic}</button>` : ''}</div><p class="sh-out" id="sh-${k}"></p></li>`).join('')}</ul>
        <div class="actions"><button class="btn" data-act="replay">Replay the whole conversation</button><button class="btn" data-act="step" data-step="converse">Start over</button>${nextStepBtn('reflect', 'Reflect')}</div>
      </div>`;
    C.mine = mine;
  }
  async function replayConvo() {
    for (const m of C.log) { await speak(m[1]); await new Promise(r => setTimeout(r, 350)); if (route.name !== 'lesson' || L.step !== 'converse') return; }
  }

  /* ---------- reflect ---------- */
  function stepReflect(el) {
    const l = L.lesson, s = LS(l.id), idx = D.LESSONS.indexOf(l);
    const reqs = [['Practice score of 70% or more', s.practice >= 70, 'practice'], ['Conversation finished', s.convo, 'converse']];
    const ready = reqs.every(r => r[1]);
    const next = D.LESSONS[idx + 1];
    el.innerHTML = `
      <div class="reflect">
        <h2 class="h-md">How confident do you feel?</h2>
        <p class="muted">Rate yourself honestly against each goal. Your answers shape what you review next.</p>
        <ol class="rate-list">${l.goals.map((g, k) => `<li><p>${esc(g)}</p><div class="seg" role="group" aria-label="Confidence">${['Not yet', 'Getting there', 'Confident'].map((lab, n) => `<button class="${s.goals[k] === n ? 'on' : ''}" data-act="goal" data-k="${k}" data-n="${n}">${lab}</button>`).join('')}</div></li>`).join('')}</ol>
        <h3 class="h-sm">To complete this lesson</h3>
        <ul class="reqs">${reqs.map(r => `<li class="${r[1] ? 'ok' : ''}">${r[1] ? ICON.check : '<span class="ring"></span>'} ${r[0]} ${r[1] ? '' : `<button class="link" data-act="step" data-step="${r[2]}">Go</button>`}</li>`).join('')}</ul>
        ${s.goals.some(g => g === 0) ? `<p class="tip-inline">You marked a goal as "Not yet". Run another Practice round or replay the conversation before you move on.</p>` : ''}
        <div class="actions">
          ${s.done ? `<span class="pill good">${ICON.check} Lesson complete</span>${next ? `<a class="btn primary" href="#${next.id}">Next: ${esc(next.title)} ${ICON.arrow}</a>` : `<a class="btn primary" href="#review">Go to review ${ICON.arrow}</a>`}`
            : `<button class="btn primary" data-act="complete" ${ready ? '' : 'disabled'}>Complete lesson</button>`}
        </div>
      </div>`;
  }

  /* ---------- review ---------- */
  function renderReview() {
    const due = dueCards();
    const total = Object.keys(S.cards).filter(k => VERB[k]).length;
    const boxes = INTERVALS.map((_, b) => Object.values(S.cards).filter(c => c.box === b).length);
    app.innerHTML = `
      <div class="page">
        <p class="eyebrow">Spaced repetition</p>
        <h1>Review</h1>
        <p class="lede">Verbs come back just before you would forget them. Each correct answer pushes the next review further away: 1, 3, 7, 14, 30, then 60 days.</p>
        <div class="boxes">${boxes.slice(0, 7).map((n, b) => `<div class="box"><b>${n}</b><span>${b === 0 ? 'new' : INTERVALS[b] + 'd'}</span></div>`).join('')}</div>
        <div id="rv">${total === 0 ? `<div class="empty"><h2 class="h-md">Nothing to review yet</h2><p>Go through the flashcards in a lesson and the verbs will appear here.</p><a class="btn primary" href="#l1">Start lesson 1 ${ICON.arrow}</a></div>`
          : due.length === 0 ? `<div class="empty"><h2 class="h-md">All caught up</h2><p>No verbs are due right now. ${total} verbs are scheduled.</p><div class="actions"><button class="btn" data-act="review-extra">Practise 10 anyway</button></div></div>`
          : `<div class="empty"><h2 class="h-md">${due.length} verb${due.length === 1 ? '' : 's'} due</h2><p>Mixed across cases and exercise types.</p><div class="actions"><button class="btn primary" data-act="review-go">Start review ${ICON.arrow}</button></div></div>`}</div>
      </div>`;
  }
  function startReview(ids) {
    const vs = ids.map(k => VERB[k]);
    const items = shuffle(vs).slice(0, 15).map(v => itemFor(v, pick(['case', 'produce', 'question', 'case', 'produce'], 1)[0], VERBS));
    startQuiz($('#rv'), items, score => {
      $('#rv').innerHTML = `<div class="done-panel"><div class="score-ring ${score >= 70 ? 'pass' : ''}" style="--p:${score}"><b>${score}%</b><span>first try</span></div><h2 class="h-md">Review done</h2><p>${dueCards().length ? dueCards().length + ' more due.' : 'Your queue is clear. Come back tomorrow.'}</p><div class="actions"><a class="btn" href="#home">Back to path</a>${dueCards().length ? `<button class="btn primary" data-act="review-go">Keep going</button>` : ''}</div></div>`;
      renderHeader();
    });
  }

  /* ---------- reference ---------- */
  let refFilter = { q: '', c: 'all' };
  function renderReference() {
    app.innerHTML = `
      <div class="page">
        <p class="eyebrow">All 174 verbs</p>
        <h1>Reference</h1>
        <p class="lede">Search by Lithuanian or English, or filter by case. Tap any sentence to hear it.</p>
        <div class="ref-tools">
          <input id="ref-q" class="search" type="search" placeholder="Search verbs, e.g. padėti or help" value="${esc(refFilter.q)}" aria-label="Search verbs">
          <div class="filters" role="group" aria-label="Filter by case">
            <button class="fchip ${refFilter.c === 'all' ? 'on' : ''}" data-act="rf" data-c="all">All</button>
            ${CASE_KEYS.map(c => `<button class="fchip c-${c} ${refFilter.c === c ? 'on' : ''}" data-act="rf" data-c="${c}">${CASES[c].name}</button>`).join('')}
          </div>
        </div>
        <div class="table-wrap"><table class="ref"><thead><tr><th>Verb</th><th>Meaning</th><th>Case</th><th>Example</th></tr></thead><tbody id="ref-body"></tbody></table></div>
        <p class="muted" id="ref-count"></p>
        <h2 class="section-h">Same verb, different case</h2>
        <div class="pairs">${D.PAIRS.map(pairCard).join('')}</div>
        <h2 class="section-h">The negation rule</h2>
        <div class="prose"><p>When a verb that normally takes an Accusative object is negated, the object shifts into the Genitive. Verbs that already govern the Genitive, Dative or Instrumental keep their case.</p></div>
        <div class="neg-grid">${D.NEGATION.map(n => `<div class="neg-card"><p class="lt">${esc(n[0])}</p><p class="arrow-down">${n[4] ? 'stays ' + CASES[n[4]].name : 'Accusative → Genitive'}</p><p class="lt strong">${esc(n[1])}</p><p class="en">${esc(n[3])}</p></div>`).join('')}</div>
      </div>`;
    drawRef();
    $('#ref-q').addEventListener('input', e => { refFilter.q = e.target.value; drawRef(); });
  }
  function drawRef() {
    const q = norm(stripMarks(refFilter.q));
    const rows = VERBS.filter(v => (refFilter.c === 'all' || v.case === refFilter.c) && (!q || norm(stripMarks(`${v.verb} ${v.meaning} ${v.plain} ${v.tr}`)).includes(q)));
    $('#ref-body').innerHTML = rows.map(v => `<tr><td class="v">${esc(v.verb)}</td><td>${esc(v.meaning)}</td><td>${chip(v.case)}</td><td><button class="say-row" data-act="say" data-text="${esc(v.plain)}"><span class="lt">${marked(v)}</span><span class="en">${esc(v.tr)}</span></button>${v.note ? `<span class="note">${esc(v.note)}</span>` : ''}</td></tr>`).join('') || `<tr><td colspan="4" class="muted">No verbs match “${esc(refFilter.q)}”.</td></tr>`;
    $('#ref-count').textContent = `${rows.length} of ${VERBS.length} verbs`;
  }

  /* ---------- science ---------- */
  function renderScience() {
    app.innerHTML = `
      <div class="page">
        <p class="eyebrow">How Linksniai teaches</p>
        <h1>Why it works</h1>
        <p class="lede">Each part of a lesson is built on a technique with strong research support in memory science or second language acquisition.</p>
        <div class="sci-grid">${D.RESEARCH.map(r => `<article class="sci"><p class="sci-where">${esc(r.where)}</p><h3>${esc(r.name)}</h3><p>${esc(r.how)}</p><p class="cite">${esc(r.cite)}</p></article>`).join('')}</div>
        <h2 class="section-h">Each lesson, step by step</h2>
        <ol class="flow">${STEPS.map(([k, label]) => `<li><b>${label}</b><span>${STEP_SCIENCE[k]}</span></li>`).join('')}</ol>
      </div>`;
  }

  /* ---------- settings ---------- */
  function renderSettings() {
    const p = $('#settings');
    p.innerHTML = `
      <div class="set-h"><h2 class="h-sm">Settings</h2><button class="icon-btn" data-act="settings-close" aria-label="Close settings">✕</button></div>
      <label class="set-row" for="set-rate"><span>Speech speed <b id="rate-val">${S.settings.rate.toFixed(2)}×</b></span><input id="set-rate" type="range" min="0.5" max="1.2" step="0.05" value="${S.settings.rate}"></label>
      <label class="set-row check" for="set-auto"><input id="set-auto" type="checkbox" ${S.settings.autoplay !== false ? 'checked' : ''}><span>Read conversation lines aloud automatically</span></label>
      <label class="set-row check" for="set-en"><input id="set-en" type="checkbox" ${S.settings.showEn ? 'checked' : ''}><span>Show English in conversations by default</span></label>
      <label class="set-row check" for="set-unlock"><input id="set-unlock" type="checkbox" ${S.settings.unlockAll ? 'checked' : ''}><span>Unlock all lessons</span></label>
      <label class="set-row" for="set-goal"><span>Daily goal</span><select id="set-goal">${[30, 50, 100, 150].map(g => `<option value="${g}" ${S.settings.goal === g ? 'selected' : ''}>${g} XP</option>`).join('')}</select></label>
      <p class="muted small">${ltVoice ? `Lithuanian voice: ${esc(ltVoice.name)}` : 'No Lithuanian voice found on this device. Audio uses the default voice.'}</p>
      <div class="danger" id="reset-zone"><button class="btn ghost" data-act="reset-ask">Reset all progress</button></div>`;
    p.hidden = false;
    $('#set-rate').oninput = e => { S.settings.rate = +e.target.value; $('#rate-val').textContent = S.settings.rate.toFixed(2) + '×'; save(); };
    $('#set-auto').onchange = e => { S.settings.autoplay = e.target.checked; save(); };
    $('#set-en').onchange = e => { S.settings.showEn = e.target.checked; save(); };
    $('#set-unlock').onchange = e => { S.settings.unlockAll = e.target.checked; save(); if (route.name === 'home') renderHome(); };
    $('#set-goal').onchange = e => { S.settings.goal = +e.target.value; save(); renderHeader(); if (route.name === 'home') renderHome(); };
  }

  /* ---------- theme ---------- */
  function applyTheme(t) {
    if (t) document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme');
    const dark = t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    $('#theme-btn').innerHTML = dark ? ICON.sun : ICON.moon;
    $('#theme-btn').setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  let theme = null; try { theme = localStorage.getItem('linksniai-theme'); } catch (e) { /* ignore */ }

  /* ---------- events ---------- */
  const ACT = {
    say: d => speak(d.text, d.slow === '1'),
    step: d => setStep(d.step),
    flip: () => { L.flipped = !L.flipped; stepLearn($('#stage')); },
    rate: d => { const c = L.deck[L.di]; if (c.id) { enroll(c.id, d.ok === '1'); if (d.ok !== '1') grade(c.id, false); } addXP(d.ok === '1' ? 2 : 1); L.di++; L.flipped = false; LS(L.lesson.id).cards = Math.max(LS(L.lesson.id).cards, L.di); save(); stepLearn($('#stage')); if (L.di >= L.deck.length) renderLesson(); },
    'deck-restart': () => { L.di = 0; L.flipped = false; L.deck = shuffle(L.deck); stepLearn($('#stage')); },
    'practice-go': () => { (L.pendingItems || []).forEach(it => it.key && enroll(it.key, false)); startQuiz($('#stage'), L.pendingItems, practiceDone); },
    opt: d => { const it = Q.items[Q.i], o = it._opts[+d.k]; Q.picked = o.v; answerQ(o.v === it.answer); },
    tok: d => { const it = Q.items[Q.i]; Q.picked = +d.k; answerQ(it.target.includes(+d.k)); },
    build: d => { const it = Q.items[Q.i]; it._built.push(it._tiles[+d.k]); renderQ(); },
    unbuild: d => { const it = Q.items[Q.i]; it._built.splice(+d.k, 1); renderQ(); },
    'build-check': () => { const it = Q.items[Q.i]; answerQ(it._built.map(t => t.w).join(' ') === it.words.join(' ')); },
    qnext: () => quizNext(),
    key: (d, el) => { const inp = el.closest('.quiz, .reply').querySelector('input.tin'); if (!inp || inp.disabled) return; const s = inp.selectionStart ?? inp.value.length; inp.value = inp.value.slice(0, s) + d.c + inp.value.slice(inp.selectionEnd ?? s); inp.focus(); inp.setSelectionRange(s + 1, s + 1); },
    copt: d => convoChoice(+d.k),
    replay: () => replayConvo(),
    mic: d => listen(C.mine[+d.k][1], $('#sh-' + d.k)),
    goal: d => { const s = LS(L.lesson.id); s.goals[+d.k] = +d.n; save(); stepReflect($('#stage')); },
    complete: () => { const s = LS(L.lesson.id); if (!s.done) { s.done = true; addXP(50); save(); toast('Lesson complete! The next lesson is unlocked.'); } renderLesson(); },
    'review-go': () => { const due = dueCards(); if (due.length) startReview(due); },
    'review-extra': () => startReview(pick(Object.keys(S.cards).filter(k => VERB[k]), 10)),
    rf: d => { refFilter.c = d.c; document.querySelectorAll('.fchip').forEach(b => b.classList.toggle('on', b.dataset.c === d.c)); drawRef(); },
    settings: () => { const p = $('#settings'); if (p.hidden) renderSettings(); else p.hidden = true; },
    'settings-close': () => { $('#settings').hidden = true; },
    'reset-ask': () => { $('#reset-zone').innerHTML = `<p>Erase all progress on this device? This can’t be undone.</p><div class="actions left"><button class="btn danger-btn" data-act="reset-yes">Erase progress</button><button class="btn" data-act="settings-close">Cancel</button></div>`; },
    'reset-yes': () => { S = fresh(); save(); $('#settings').hidden = true; toast('Progress erased.'); go('home'); },
    theme: () => {
      const dark = theme ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      theme = dark ? 'light' : 'dark';
      try { localStorage.setItem('linksniai-theme', theme); } catch (e) { /* ignore */ }
      applyTheme(theme);
    }
  };
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    const fn = ACT[el.dataset.act];
    if (fn) { e.preventDefault(); fn(el.dataset, el, e); }
  });
  document.addEventListener('submit', e => {
    const f = e.target.closest('form[data-form]');
    if (!f) return;
    e.preventDefault();
    if (f.dataset.form === 'type') {
      const val = $('#q-input').value, it = Q.items[Q.i];
      if (!val.trim()) return;
      const exact = it.answers.some(a => norm(a) === norm(val));
      const loose = !exact && it.answers.some(a => norm(stripMarks(a)) === norm(stripMarks(val)));
      answerQ(exact || loose, { typed: val });
      if (loose) { Q.almost = true; renderQ(); }
    } else if (f.dataset.form === 'ctype') {
      const val = $('#c-input').value; if (val.trim()) convoType(val);
    }
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'en-toggle') { C.showEn = e.target.checked; document.querySelectorAll('.chat .en').forEach(p => p.classList.toggle('hide', !C.showEn)); }
  });
  document.addEventListener('keydown', e => {
    if (e.target.matches('input, select, textarea')) return;
    if (route.name === 'lesson' && L && L.step === 'learn' && e.key === ' ' && L.di < L.deck.length) { e.preventDefault(); ACT.flip(); return; }
    if (Q && Q.host && document.body.contains(Q.host) && $('.quiz', Q.host)) {
      const it = Q.items[Q.i];
      if (Q.state === 'ask' && it && it.type === 'choice' && /^[1-5]$/.test(e.key) && it._opts[+e.key - 1]) { ACT.opt({ k: +e.key - 1 }); return; }
    }
    if (C && $('#reply') && C.opts && /^[1-4]$/.test(e.key) && C.opts[+e.key - 1] && C.d.lines[C.i] && C.d.lines[C.i][0] === 'c') convoChoice(+e.key - 1);
  });

  /* ---------- boot ---------- */
  applyTheme(theme);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => applyTheme(theme));
  onRoute();
})();
