/* ------------------------------------------------------------------
   AI Case Spinner: app logic. No dependencies, no build step.
------------------------------------------------------------------- */
(function () {
  'use strict';

  const D = window.CASE_DATA;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const rnd = (n) => Math.floor(Math.random() * n);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const strip = (s) => String(s).replace(/[.!?\s]+$/, '');
  // lower-case the first letter unless the word is an acronym like "AI" or "EV"
  const lc = (s) => (s.length > 1 && s[1] === s[1].toUpperCase() && s[1] !== s[1].toLowerCase()) ? s : s.charAt(0).toLowerCase() + s.slice(1);
  const pad = (n, w) => String(n).padStart(w, '0');
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode: fine */ } }
  };

  /* ---------------- modes & reels ---------------- */
  const MODES = [
    { label: 'Warm-up',    cons: 1, twist: false, assign: false },
    { label: 'Consultant', cons: 1, twist: true,  assign: false },
    { label: 'Chaos',      cons: 2, twist: true,  assign: true  }
  ];
  const REELS = [
    { k: 'ind',     label: 'Industry',           color: '--maize' },
    { k: 'client',  label: 'Client',             color: '--peach' },
    { k: 'user',    label: 'Your user',          color: '--sky',  follow: true },
    { k: 'problem', label: 'The problem',        color: '--pink', wide: true },
    { k: 'metric',  label: 'Success looks like', color: '--lime', follow: true },
    { k: 'c1',      label: 'Constraint',         color: '--lilac' },
    { k: 'c2',      label: 'Constraint #2',      color: '--lilac', need: (m) => MODES[m].cons > 1 },
    { k: 'twist',   label: 'The twist',          color: '--mint',  need: (m) => MODES[m].twist },
    { k: 'ai',      label: 'Your AI role',       color: '--amber', need: (m) => MODES[m].assign }
  ];
  const DEP = ['client', 'user', 'problem', 'metric', 'c1', 'c2'];            // depend on the industry
  const ALLKEYS = ['ind'].concat(DEP, ['twist', 'ai', 'curve']);

  const ICON_LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  const ICON_DICE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.5-5.8"/><path d="M20 4v5h-5"/></svg>';

  /* ---------------- state ---------------- */
  let S = null;             // { mode, i: { ind, client, user, ... } }
  let W = {};               // worksheet answers for the current case
  let team = store.get('cs:team') || '';
  const locks = {};
  let busy = false;
  let soundOn = store.get('cs:sound') === '1';
  let activeTab = 'kickoff';
  const edits = {};         // manual edits to generated text, per tab

  const ind = () => D.industries[S.i.ind];
  const visible = (r) => !r.need || r.need(S.mode);
  const isLocked = (k) => { const r = REELS.find((x) => x.k === k); return !!(locks[k] && r && visible(r)); };

  function pool(k) {
    switch (k) {
      case 'ind': return D.industries;
      case 'client': return ind().clients;
      case 'user': case 'problem': case 'metric': return ind().cases;   // user + metric follow the problem
      case 'c1': case 'c2': return ind().constraints.concat(D.globalConstraints);
      case 'twist': return D.twists;
      case 'curve': return D.curveballs;
      case 'ai': return D.aiRoles;
    }
    return [];
  }
  function view(k, idx) {
    const item = pool(k)[idx];
    switch (k) {
      case 'ind': return { ico: item.icon, val: item.name, sub: '' };
      case 'client': return { ico: '', val: item.n, sub: item.d };
      case 'problem': return { ico: '', val: item.p, sub: '' };
      case 'user': return { ico: '', val: item.u, sub: '' };
      case 'metric': return { ico: '', val: item.m, sub: '' };
      case 'ai': return { ico: '', val: item.name, sub: 'Use AI to ' + item.verb };
      default: return { ico: '', val: item, sub: '' };
    }
  }
  const text = (k) => view(k, S.i[k]).val;

  /* ---------------- sound ---------------- */
  let AC = null;
  function beep(freq, dur, type, vol) {
    if (!soundOn) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      const o = AC.createOscillator(), g = AC.createGain();
      o.type = type || 'square'; o.frequency.value = freq; g.gain.value = vol || 0.04;
      o.connect(g); g.connect(AC.destination); o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, AC.currentTime + dur);
      o.stop(AC.currentTime + dur + 0.02);
    } catch (e) { /* no audio: fine */ }
  }

  /* ---------------- toast ---------------- */
  let toastT;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------------- hash (shareable case) ---------------- */
  const KEYS = ['ind', 'client', 'user', 'problem', 'c1', 'c2', 'twist', 'curve', 'metric', 'ai', 'fn', 'ln', 'title'];
  function caseKey() { return KEYS.map((k) => S.i[k]).join('.'); }
  function encode() { return 'v1.' + S.mode + '.' + caseKey(); }
  function decode(h) {
    const p = h.replace(/^#/, '').split('.');
    if (p[0] !== 'v1' || p.length !== KEYS.length + 2) return null;
    const nums = p.slice(1).map(Number);
    if (nums.some((n) => !Number.isInteger(n) || n < 0)) return null;
    const mode = nums[0];
    if (mode > 2) return null;
    const st = { mode, i: {} };
    KEYS.forEach((k, j) => { st.i[k] = nums[j + 1]; });
    st.i.user = st.i.metric = st.i.problem;
    const keep = S; S = st;                                  // validate against the pools
    const ok = st.i.ind < D.industries.length &&
      st.i.client < pool('client').length && st.i.user < pool('user').length &&
      st.i.problem < pool('problem').length && st.i.metric < pool('metric').length &&
      st.i.c1 < pool('c1').length && st.i.c2 < pool('c2').length &&
      st.i.twist < D.twists.length && st.i.curve < D.curveballs.length && st.i.ai < D.aiRoles.length &&
      st.i.fn < D.contactFirst.length && st.i.ln < D.contactLast.length && st.i.title < D.contactTitle.length;
    S = keep;
    return ok ? st : null;
  }
  function writeHash() {
    try { history.replaceState(null, '', location.pathname + location.search + '#' + encode()); } catch (e) { /* file:// quirks */ }
  }
  function caseNumber() {
    let h = 7; caseKey().split('.').forEach((n) => { h = (h * 31 + Number(n)) % 9973; });
    return pad(h, 4);
  }

  /* ---------------- rolling ---------------- */
  function rollKeys(keys) {
    if (keys.includes('ind')) S.i.ind = rnd(D.industries.length);
    keys.forEach((k) => { if (k !== 'ind') S.i[k] = rnd(pool(k).length); });
    S.i.user = S.i.metric = S.i.problem;                       // coherent: they come from the same case
    const n = pool('c1').length;
    if (S.i.c1 === S.i.c2) S.i.c2 = (S.i.c1 + 1 + rnd(n - 1)) % n;
    if (keys.includes('client') || S.i.fn === undefined) {
      S.i.fn = rnd(D.contactFirst.length); S.i.ln = rnd(D.contactLast.length); S.i.title = rnd(D.contactTitle.length);
    }
  }

  function paintReel(k, override) {
    const el = $('.reel[data-k="' + k + '"]'); if (!el) return;
    const v = override || view(k, S.i[k]);
    $('.reel-ico', el).textContent = v.ico || '';
    $('.reel-ico', el).hidden = !v.ico;
    $('.reel-val', el).textContent = v.val;
    $('.reel-sub', el).textContent = v.sub || '';
    $('.reel-sub', el).hidden = !v.sub;
  }

  function buildReels() {
    const host = $('#reels'); host.innerHTML = '';
    REELS.forEach((r) => {
      if (!visible(r)) return;
      const el = document.createElement('div');
      el.className = 'reel' + (r.wide ? ' wide' : '') + (locks[r.k] ? ' locked' : '');
      el.dataset.k = r.k;
      el.style.setProperty('--c', 'var(' + r.color + ')');
      const tools = r.follow ? '<span class="reel-follow">from the problem</span>' :
        '<span class="reel-tools">' +
        '<button class="icon-btn" data-act="lock" aria-pressed="' + (!!locks[r.k]) + '" title="Lock it, so it stays when you spin" aria-label="Lock ' + r.label + '">' + ICON_LOCK + '</button>' +
        '<button class="icon-btn" data-act="roll" title="Re-roll just this one" aria-label="Re-roll ' + r.label + '">' + ICON_DICE + '</button></span>';
      el.innerHTML =
        '<div class="reel-bar"><span class="reel-label">' + r.label + '</span>' + tools +
        '</div><div class="reel-body"><div class="reel-ico"></div><div class="reel-val"></div><div class="reel-sub"></div></div>';
      host.appendChild(el);
      paintReel(r.k);
    });
    const extra = $$('.reel', host).slice(5);              // everything after the first two rows
    extra.forEach((el) => el.style.setProperty('--span', 12 / extra.length));
  }

  function doSpin(keys) {
    busy = true;
    rollKeys(keys);
    const vis = REELS.filter((r) => visible(r) && keys.includes(r.k));
    vis.forEach((r, n) => {
      const el = $('.reel[data-k="' + r.k + '"]');
      const p = pool(r.k);
      const dur = reduced ? 0 : 650 + n * 230;
      el.classList.add('spinning'); el.classList.remove('landed');
      const iv = reduced ? null : setInterval(() => { paintReel(r.k, view(r.k, rnd(p.length))); beep(260 + rnd(260), 0.03); }, 70);
      setTimeout(() => {
        if (iv) clearInterval(iv);
        el.classList.remove('spinning');
        paintReel(r.k);
        void el.offsetWidth; el.classList.add('landed');
        beep(660, 0.1, 'triangle', 0.08); setTimeout(() => beep(990, 0.12, 'triangle', 0.07), 90);
      }, dur);
    });
    const total = vis.length && !reduced ? 650 + (vis.length - 1) * 230 + 80 : 0;
    setTimeout(afterSpin, total);
  }

  function afterSpin() {
    busy = false;
    loadW();
    renderMemo(true);
    renderEnvelope();
    renderInterview();
    renderWork();
    $('#caseNo').textContent = 'CASE #' + caseNumber();
    const st = $('#stamp'); st.classList.remove('slam'); void st.offsetWidth; st.classList.add('slam');
    Object.keys(edits).forEach((k) => delete edits[k]);
    updateBrief();
    writeHash();
  }

  function spinAll() {
    if (busy || !S) return;
    if (!isLocked('ind')) DEP.forEach((k) => { locks[k] = false; });
    const keys = ALLKEYS.filter((k) => !isLocked(k));
    refreshLockUI();
    doSpin(keys);
  }
  function rollOne(k) {
    if (busy || !S) return;
    let keys = [k];
    if (k === 'ind') { DEP.forEach((d) => { locks[d] = false; }); keys = ['ind'].concat(DEP); refreshLockUI(); }
    doSpin(keys);
  }
  function refreshLockUI() {
    $$('.reel').forEach((el) => {
      const on = !!locks[el.dataset.k];
      el.classList.toggle('locked', on);
      const lk = $('[data-act="lock"]', el); if (lk) lk.setAttribute('aria-pressed', on);
    });
  }

  /* ---------------- client memo ---------------- */
  function renderMemo(fresh) {
    const c = ind().clients[S.i.client];
    const who = D.contactFirst[S.i.fn] + ' ' + D.contactLast[S.i.ln];
    const first = D.contactFirst[S.i.fn];
    const title = D.contactTitle[S.i.title];
    const m = MODES[S.mode];
    let cons = '<p>One non-negotiable: ' + esc(strip(lc(text('c1')))) + '.</p>';
    if (m.cons > 1) cons = '<p>Two non-negotiables. First, ' + esc(strip(lc(text('c1')))) + '. Second, ' + esc(strip(lc(text('c2')))) + '.</p>';
    const el = $('#memo');
    el.innerHTML =
      '<div class="memo-head"><span><b>From:</b> ' + esc(who) + ', ' + esc(title) + ', ' + esc(c.n) + '</span>' +
      '<span><b>To:</b> ' + esc(team || 'Our consulting team') + '</span>' +
      '<span><b>Subject:</b> Please help (and fast)</span></div>' +
      '<div class="memo-body">' +
      '<p>Thanks for taking this on. We are ' + esc(c.n) + ', ' + esc(c.d) + ', and we are stuck.</p>' +
      '<p><mark>' + esc(strip(text('problem'))) + '.</mark> Our ' + esc(lc(text('user'))) + ' feel it the most.</p>' +
      '<p>Here is what a win looks like for us: &ldquo;' + esc(strip(text('metric'))) + '.&rdquo;</p>' +
      cons +
      (m.twist ? '<p>Oh, and one more thing: ' + esc(strip(lc(text('twist')))) + '.</p>' : '') +
      '<p>Show us something we can try this week.<br>&mdash; ' + esc(first) + '</p></div>';
    if (fresh) { el.classList.remove('fresh'); void el.offsetWidth; el.classList.add('fresh'); }
  }

  /* ---------------- curveball ---------------- */
  function renderEnvelope() {
    const env = $('#envelope');
    env.classList.toggle('open', !!W.curveOpen);
    if (W.curveOpen) {
      $('#envTitle').textContent = 'Curveball!';
      $('#envText').textContent = D.curveballs[S.i.curve];
      $('#breakSeal').hidden = true; $('#copyCurve').hidden = false;
    } else {
      $('#envTitle').textContent = 'Sealed curveball';
      $('#envText').textContent = 'Opens automatically halfway through the 45-minute build timer. Or break the seal early if you’re feeling brave.';
      $('#breakSeal').hidden = false; $('#copyCurve').hidden = true;
    }
  }
  function openCurve(auto) {
    if (!S || W.curveOpen) return;
    W.curveOpen = true; saveW(); renderEnvelope(); updateBrief();
    toast(auto ? 'Halfway there. The curveball just opened!' : 'Seal broken. Good luck.');
    beep(180, 0.25, 'sawtooth', 0.08); setTimeout(() => beep(140, 0.35, 'sawtooth', 0.08), 200);
    if (auto) $('#caseSection').scrollIntoView({ behavior: 'smooth' });
  }

  /* ---------------- worksheet ---------------- */
  function wkey() { return 'cs:w:' + caseKey(); }
  function loadW() { try { W = JSON.parse(store.get(wkey()) || '{}') || {}; } catch (e) { W = {}; } }
  function saveW() { store.set(wkey(), JSON.stringify(W)); }

  const QS = [
    { id: 'problem', title: 'Problem', ask: 'What is not working?', color: '--pink',
      hint: () => 'Be concrete: who loses time or money, and how often? The client says: “' + strip(text('problem')) + '.”',
      seed: () => 'At ' + ind().clients[S.i.client].n + ', ' + lc(strip(text('problem'))) + '. It hurts because ' },
    { id: 'user', title: 'User', ask: 'Who experiences it?', color: '--sky',
      hint: () => 'Pick ONE main user. What does their day look like right before and right after this problem hits?',
      seed: () => 'Our main user: ' + lc(text('user')) + '.\nA typical day for them: ' },
    { id: 'process', title: 'Process', ask: 'What happens today?', color: '--lime',
      hint: () => 'List 4 to 6 steps as they happen now. Circle the step that hurts most. That is where your build goes.',
      seed: () => '1. \n2. \n3. \n4. \nThe painful step is: ' },
    { id: 'context', title: 'Context', ask: 'What must the solution know?', color: '--lilac',
      hint: () => 'What would a smart new hire need to know? Rules, examples, sample data (you will invent it). Reminder: ' + strip(text('c1')) + '.',
      seed: () => 'Sample data we will invent:\n- \nRules the solution must follow:\n- ' },
    { id: 'ai', title: 'AI role', ask: 'Where does AI add value?', color: '--amber',
      hint: () => MODES[S.mode].assign ? 'Chaos mode: the AI role was assigned to you. Make it shine.' : 'Choose ONE capability instead of sprinkling “AI” everywhere.' },
    { id: 'outcome', title: 'Outcome', ask: 'How will we know it helped?', color: '--mint',
      hint: () => 'Pick something you can show in a demo. The client wants: “' + strip(text('metric')) + '.”',
      seed: () => 'We will know it worked when ' + lc(strip(text('metric'))) + '.\nIn the demo we will show: ' }
  ];

  function renderWork() {
    const host = $('#qgrid'); host.innerHTML = '';
    QS.forEach((q, idx) => {
      const d = document.createElement('div');
      d.className = 'q'; d.dataset.q = q.id; d.style.setProperty('--c', 'var(' + q.color + ')');
      d.innerHTML =
        '<div class="q-head"><span class="q-num"><span>' + (idx + 1) + '</span></span><div><div class="q-title">' + q.title + '</div><div class="q-ask">' + q.ask + '</div></div></div>' +
        '<p class="q-hint">' + esc(q.hint()) + '</p>' +
        (q.id === 'ai'
          ? '<div class="roles"></div><div class="role-tip" hidden></div>'
          : '<textarea data-q="' + q.id + '" rows="4" placeholder="Rough notes are fine"></textarea>' +
            '<div class="q-actions"><button class="btn small ghost" data-seed="' + q.id + '">Start from the case</button></div>');
      host.appendChild(d);
      if (q.id === 'ai') {
        const roles = $('.roles', d);
        D.aiRoles.forEach((r, n) => {
          const b = document.createElement('button');
          b.className = 'role'; b.type = 'button'; b.dataset.role = n; b.textContent = r.name;
          roles.appendChild(b);
        });
      } else {
        $('textarea', d).value = W[q.id] || '';
      }
    });
    $('#teamName').value = team;
    $('#sName').value = W.sName || '';
    $('#sGoal').value = W.sGoal || '';
    $('#sOutcome').value = W.sOutcome || '';
    $('#sOutcome').placeholder = 'Measure it. Case says: ' + strip(text('metric'));
    refreshWork();
  }

  function aiRole() {
    if (!S) return null;
    if (MODES[S.mode].assign) return D.aiRoles[S.i.ai];
    return W.ai !== undefined && D.aiRoles[W.ai] ? D.aiRoles[W.ai] : null;
  }
  function refreshWork() {
    const assigned = MODES[S.mode].assign;
    const cur = aiRole();
    $$('.role').forEach((b) => {
      const on = cur && D.aiRoles[Number(b.dataset.role)] === cur;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.disabled = assigned;
    });
    const tip = $('.role-tip');
    if (tip) { tip.hidden = !cur; if (cur) tip.textContent = cur.tip; }
    let done = 0;
    QS.forEach((q) => {
      const ok = q.id === 'ai' ? !!cur : ((W[q.id] || '').trim().length >= 3);
      if (ok) done++;
      const el = $('.q[data-q="' + q.id + '"]'); if (el) el.classList.toggle('done', ok);
    });
    $('#progFill').style.width = Math.round(done / QS.length * 100) + '%';
    $('#progText').textContent = done + ' of ' + QS.length + ' answered' + (done === QS.length ? ' ✨' : '');
    renderSentence();
  }

  function sentenceParts() {
    const role = aiRole();
    return {
      name: (W.sName || '').trim(),
      user: lc(text('user')),
      goal: (W.sGoal || '').trim(),
      role: role ? role.verb : '',
      outcome: (W.sOutcome || '').trim()
    };
  }
  function sentenceText(partial) {
    const p = sentenceParts();
    const gap = (v, label) => v || '[' + label + ']';
    const s = 'We are building ' + gap(p.name, 'solution') + ' for ' + p.user + ' to help them ' + gap(p.goal, 'goal') +
      ' by using AI to ' + gap(p.role, 'AI role') + ', improving ' + gap(p.outcome, 'outcome') + '.';
    const complete = p.name && p.goal && p.role && p.outcome;
    return partial || complete ? s : null;
  }
  function renderSentence() {
    const p = sentenceParts();
    const f = (v, label) => v ? '<span class="fill">' + esc(v) + '</span>' : '<span class="gap">[' + label + ']</span>';
    $('#sOut').innerHTML = 'We are building ' + f(p.name, 'solution') + ' for <span class="fill">' + esc(p.user) + '</span> to help them ' +
      f(p.goal, 'goal') + ' by using AI to ' + f(p.role, 'AI role') + ', improving ' + f(p.outcome, 'outcome') + '.';
  }

  /* ---------------- client interview ---------------- */
  const MAX_Q = 4;
  const IV = [
    { id: 'today',   q: 'What happens today?',            save: 'process' },
    { id: 'tried',   q: 'What have you already tried?',   save: 'context' },
    { id: 'volume',  q: 'How big is this problem?',       save: 'context' },
    { id: 'tools',   q: 'What tools do you use now?',     save: 'context' },
    { id: 'signoff', q: 'Who has to approve this?',       save: 'context' },
    { id: 'win',     q: 'What does a win look like?',     save: 'outcome' }
  ];
  const contactName = () => D.contactFirst[S.i.fn] + ' ' + D.contactLast[S.i.ln];
  function ivAnswer(id) {
    if (id === 'win') return 'Simple: ' + lc(strip(text('metric'))) + '. And if I can see it working in a demo with realistic examples, I can sell it to my boss. Show me something I can click.';
    const d = (window.INTERVIEW || {})[ind().name];
    if (!d) return 'Good question. Honestly, we don’t have a clean answer. Use your best judgment and write it down as an assumption.';
    return (id === 'today' || id === 'tried') ? d[id][S.i.problem] : d[id];
  }
  function ivFacts() {
    return (W.asked || []).map((id) => ({ q: IV.find((x) => x.id === id).q, a: ivAnswer(id) }));
  }
  function ivBubble(id, fresh) {
    const q = IV.find((x) => x.id === id);
    const you = document.createElement('div'); you.className = 'iv-row you';
    you.innerHTML = '<div class="iv-bub"><div class="iv-who">You</div>' + esc(q.q) + '</div>';
    const row = document.createElement('div'); row.className = 'iv-row';
    const initials = D.contactFirst[S.i.fn][0] + D.contactLast[S.i.ln][0];
    const saved = !!(W.saved && W.saved[id]);
    row.innerHTML = '<div class="iv-av" aria-hidden="true">' + esc(initials) + '</div><div class="iv-bub"><div class="iv-who">' + esc(contactName()) + '</div>' +
      '<div class="iv-text"></div><button class="btn small ghost" data-save="' + id + '"' + (saved ? ' disabled' : '') + '>' + (saved ? 'Saved ✓' : 'Save to worksheet') + '</button></div>';
    const log = $('#ivLog'); log.appendChild(you); log.appendChild(row);
    const box = $('.iv-text', row); const ans = ivAnswer(id);
    const btn = $('[data-save]', row);
    if (fresh && !reduced) {
      btn.hidden = true; box.innerHTML = '<span class="iv-dots"></span>';
      setTimeout(() => {
        box.textContent = ''; let n = 0;
        const iv = setInterval(() => {
          n += 2; box.textContent = ans.slice(0, n);
          if (n % 12 === 0) beep(380 + rnd(60), 0.015, 'square', 0.015);
          if (n >= ans.length) { clearInterval(iv); box.textContent = ans; btn.hidden = false; }
        }, 16);
      }, 450);
    } else box.textContent = ans;
  }
  function renderInterview(freshId) {
    const asked = W.asked || [];
    const left = MAX_Q - asked.length;
    $('#ivLeft').textContent = left > 0 ? left + ' question' + (left === 1 ? '' : 's') + ' left' : 'Out of time';
    $('#ivSub').textContent = contactName() + ' has time for ' + MAX_Q + ' questions before their next meeting. Choose wisely, then save the useful answers to your worksheet.';
    const chips = $('#ivChips'); chips.innerHTML = '';
    IV.forEach((q) => {
      const b = document.createElement('button');
      b.className = 'role'; b.type = 'button'; b.dataset.iv = q.id; b.textContent = q.q;
      const done = asked.includes(q.id);
      b.setAttribute('aria-pressed', done ? 'true' : 'false');
      b.disabled = done || left <= 0;
      chips.appendChild(b);
    });
    $('#ivLog').innerHTML = '';
    asked.forEach((id) => ivBubble(id, id === freshId));
    if (left <= 0) {
      const row = document.createElement('div'); row.className = 'iv-row';
      row.innerHTML = '<div class="iv-av" aria-hidden="true">' + esc(D.contactFirst[S.i.fn][0] + D.contactLast[S.i.ln][0]) + '</div><div class="iv-bub"><div class="iv-who">' + esc(contactName()) + '</div>I have to run to another meeting. Anything you still don’t know, make a sensible assumption and tell me what it was.</div>';
      $('#ivLog').appendChild(row);
    }
  }
  function askClient(id) {
    W.asked = W.asked || [];
    if (W.asked.includes(id) || W.asked.length >= MAX_Q) return;
    W.asked.push(id); saveW(); beep(520, 0.06, 'triangle', 0.07);
    renderInterview(id); updateBrief();
  }
  function saveAnswer(id) {
    const q = IV.find((x) => x.id === id);
    const line = 'Client says: ' + ivAnswer(id);
    W[q.save] = (W[q.save] ? W[q.save].trim() + '\n' : '') + line;
    W.saved = W.saved || {}; W.saved[id] = true; saveW();
    const ta = $('textarea[data-q="' + q.save + '"]'); if (ta) ta.value = W[q.save];
    const b = $('[data-save="' + id + '"]'); if (b) { b.disabled = true; b.textContent = 'Saved ✓'; }
    refreshWork(); updateBrief();
    const title = QS.find((x) => x.id === q.save).title;
    toast('Saved to ' + title + ' in your worksheet.');
  }

  /* ---------------- brief generators ---------------- */
  function caseFacts() {
    const c = ind().clients[S.i.client];
    const m = MODES[S.mode];
    const cons = [text('c1')]; if (m.cons > 1) cons.push(text('c2'));
    return { c, m, cons, industry: ind().name };
  }
  function worksheetNotes() {
    const out = [];
    const role = aiRole();
    if ((W.process || '').trim()) out.push('Process today:\n' + W.process.trim());
    if ((W.context || '').trim()) out.push('Context and sample data:\n' + W.context.trim());
    if ((W.problem || '').trim()) out.push('Our take on the problem:\n' + W.problem.trim());
    if ((W.user || '').trim()) out.push('Our main user:\n' + W.user.trim());
    if (role) out.push('AI role: ' + role.name + ' (use AI to ' + role.verb + ')');
    if ((W.outcome || '').trim()) out.push('How we will know it helped:\n' + W.outcome.trim());
    return out;
  }

  function genKickoff() {
    const f = caseFacts();
    const L = [];
    L.push('Hi Claude! I’m on a team at a university AI hackathon' + (team ? ' (team: ' + team + ')' : '') + '. We’re playing AI consultants for a fictional client, and we have about 45 minutes to build a working prototype.');
    L.push('');
    L.push('Please read CLAUDE.md in this folder first. It has the ground rules.');
    L.push('');
    L.push('THE CLIENT');
    L.push(f.c.n + ', ' + f.c.d + ' (' + f.industry + ').');
    L.push('');
    L.push('THE PROBLEM');
    L.push(strip(text('problem')) + '.');
    L.push('');
    L.push('WHO FEELS IT');
    L.push(text('user'));
    L.push('');
    L.push('WHAT SUCCESS LOOKS LIKE');
    L.push(strip(text('metric')) + '.');
    L.push('');
    L.push('CONSTRAINTS');
    f.cons.forEach((c) => L.push('- ' + strip(c)));
    if (f.m.twist) { L.push(''); L.push('THE TWIST'); L.push(strip(text('twist')) + '.'); }
    const idea = sentenceText(false);
    if (idea) { L.push(''); L.push('OUR IDEA'); L.push(idea); }
    const facts = ivFacts();
    if (facts.length) {
      L.push(''); L.push('WHAT THE CLIENT TOLD US IN THE INTERVIEW');
      facts.forEach((x) => { L.push('Q: ' + x.q); L.push('A: ' + x.a); });
    }
    const notes = worksheetNotes();
    if (notes.length) { L.push(''); L.push('NOTES FROM OUR WORKSHEET'); notes.forEach((n) => { L.push(n); L.push(''); }); L.pop(); }
    L.push('');
    L.push('HOW I WANT TO WORK');
    L.push('1. Do not write any code yet. Ask me up to five questions to fill important gaps.');
    L.push('2. After I answer, write a short build brief: objective, user workflow, three must-have features, assumptions, and how we will test it.');
    L.push('3. Then propose a plan in plain English with small milestones, and wait for my OK.');
    L.push('4. Build one milestone at a time. After each one, tell me exactly what to click to test it, and commit it.');
    return L.join('\n');
  }

  function genClaudeMd() {
    const f = caseFacts();
    const L = [];
    L.push('# ' + (team || 'Our team') + ': AI prototype for ' + f.c.n);
    L.push('');
    L.push('## Who I am');
    L.push('I’m a student or entry-level developer at a hackathon. Please explain things simply and avoid jargon. I would rather understand what you did than get a clever solution I can’t follow.');
    L.push('');
    L.push('## The challenge (fictional client)');
    L.push('- Client: ' + f.c.n + ', ' + f.c.d + ' (' + f.industry + ')');
    L.push('- Problem: ' + strip(text('problem')));
    L.push('- Main user: ' + text('user'));
    L.push('- Success: ' + strip(text('metric')));
    f.cons.forEach((c) => L.push('- Constraint: ' + strip(c)));
    if (f.m.twist) L.push('- Twist: ' + strip(text('twist')));
    const role = aiRole();
    if (role) L.push('- AI role: ' + role.name + ' (use AI to ' + role.verb + ')');
    L.push('');
    L.push('## Ground rules');
    L.push('- Explain every change in plain English after you make it.');
    L.push('- Ask before deleting or overwriting anything.');
    L.push('- Use git. Commit after each working step with a clear message. If I say “roll back”, return to the last working commit.');
    L.push('- Keep the scope small: aim for three must-have features. Tell me if I’m asking for too much for 45 minutes.');
    L.push('- Never ask me to paste API keys, passwords, or secrets.');
    L.push('');
    L.push('## Technical rules');
    L.push('- Build a plain static web app: index.html, style.css, script.js. No frameworks, no build step, no npm install, no backend.');
    L.push('- It must work by double-clicking index.html in a browser.');
    L.push('- No API keys, accounts, or network requests. Use only invented sample data and no real personal information.');
    L.push('- The AI in this prototype is simulated. Put it behind one clearly named function (for example askAI(input) in ai.js) that uses sample data, rules, and templates to return realistic results. Label simulated output in the interface as “Prototype AI (simulated)”. Write it so a real model call could replace that one function later.');
    L.push('- Make it look polished: large readable text, high contrast, works on a phone and on a projector.');
    L.push('');
    L.push('## How we work');
    L.push('1. Ask first, plan next, build last.');
    L.push('2. Build small milestones and test each one before starting the next.');
    L.push('3. After building, open or run the app and tell me what you checked.');
    L.push('4. If something breaks, I will paste the exact error message. Fix it.');
    L.push('');
    L.push('## Definition of done');
    L.push('- Opens by double-clicking index.html.');
    L.push('- Walks the main user (' + lc(text('user')) + ') through the whole workflow using sample data.');
    L.push('- Shows a clear before and after for the success metric: “' + strip(text('metric')) + '”.');
    L.push('- Handles one bad or missing input politely.');
    L.push('- Includes a README.md with three lines: what it is, how to open it, and what is simulated.');
    return L.join('\n');
  }

  function genFull() {
    const f = caseFacts();
    const role = aiRole();
    const L = [];
    L.push('# Case #' + caseNumber() + ': ' + f.c.n);
    if (team) L.push('Team: ' + team);
    L.push('');
    L.push('Client: ' + f.c.n + ', ' + f.c.d);
    L.push('Industry: ' + f.industry);
    L.push('Contact: ' + D.contactFirst[S.i.fn] + ' ' + D.contactLast[S.i.ln] + ', ' + D.contactTitle[S.i.title]);
    L.push('Mode: ' + f.m.label);
    L.push('');
    L.push('## The brief');
    L.push('- Problem: ' + strip(text('problem')));
    L.push('- User: ' + text('user'));
    L.push('- Success: ' + strip(text('metric')));
    f.cons.forEach((c, n) => L.push('- Constraint ' + (n + 1) + ': ' + strip(c)));
    if (f.m.twist) L.push('- Twist: ' + strip(text('twist')));
    L.push('- Curveball: ' + (W.curveOpen ? strip(D.curveballs[S.i.curve]) : '(sealed)'));
    L.push('');
    L.push('## Our answers');
    QS.forEach((q, n) => {
      let v;
      if (q.id === 'ai') v = role ? role.name + ': use AI to ' + role.verb : '';
      else v = (W[q.id] || '').trim();
      L.push((n + 1) + '. ' + q.title.toUpperCase() + ': ' + q.ask);
      L.push(v ? v : '(not answered yet)');
      L.push('');
    });
    const facts = ivFacts();
    if (facts.length) {
      L.push('## Client interview');
      facts.forEach((x) => { L.push('Q: ' + x.q); L.push('A: ' + x.a); L.push(''); });
    }
    L.push('## One sentence');
    L.push(sentenceText(true));
    return L.join('\n');
  }

  const TABS = {
    kickoff:  { gen: genKickoff,  file: 'kickoff-prompt.md', hint: 'Paste this into Claude Code after saving CLAUDE.md.' },
    claudemd: { gen: genClaudeMd, file: 'CLAUDE.md',         hint: 'Save as CLAUDE.md in your project folder. Claude reads it every session.' },
    full:     { gen: genFull,     file: 'case-brief.md',     hint: 'Your whole case on one page, handy for the share-out.' }
  };
  let briefT;
  function updateBrief() { clearTimeout(briefT); briefT = setTimeout(paintBrief, 120); }
  function paintBrief() {
    if (!S) return;
    const ta = $('#briefText');
    if (edits[activeTab] !== undefined) {
      ta.value = edits[activeTab];
      $('#briefHint').innerHTML = 'You edited this. <button class="chip-btn" id="resetEdit">Reset</button>';
    } else {
      ta.value = TABS[activeTab].gen();
      $('#briefHint').textContent = TABS[activeTab].hint;
    }
  }

  /* ---------------- clipboard & download ---------------- */
  function copyText(t, okMsg) {
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta);
      ta.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (e) { /* ignore */ }
      document.body.removeChild(ta); toast(ok ? okMsg : 'Copy failed. Select the text and press Ctrl/Cmd+C.');
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(() => toast(okMsg), fallback);
    else fallback();
  }
  function download(name, blobOrText, type) {
    const blob = blobOrText instanceof Blob ? blobOrText : new Blob([blobOrText], { type: type || 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ---------------- pitch card ---------------- */
  function pitchCard() {
    const f = caseFacts();
    const cv = document.createElement('canvas'); cv.width = 1600; cv.height = 900;
    const x = cv.getContext('2d');
    const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const INK = css('--ink'), PAPER = css('--paper'), MAIZE = css('--maize'), CORAL = css('--coral');
    const SERIF = '"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif';
    const MONO = 'ui-monospace,Menlo,Consolas,monospace';
    function wrap(t, px, y, maxW, lh, maxLines) {
      const words = t.split(/\s+/); let line = ''; let lines = [];
      words.forEach((w) => { const tt = line ? line + ' ' + w : w; if (x.measureText(tt).width > maxW && line) { lines.push(line); line = w; } else line = tt; });
      if (line) lines.push(line);
      if (maxLines && lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…'; }
      lines.forEach((l, n) => x.fillText(l, px, y + n * lh));
      return y + lines.length * lh;
    }
    x.fillStyle = PAPER; x.fillRect(0, 0, 1600, 900);
    x.fillStyle = INK; x.fillRect(46, 46, 1540, 840);
    x.fillStyle = PAPER; x.fillRect(20, 20, 1540, 840);
    x.fillStyle = MAIZE; x.fillRect(20, 20, 1540, 92);
    x.strokeStyle = INK; x.lineWidth = 8; x.strokeRect(20, 20, 1540, 840);
    x.beginPath(); x.moveTo(20, 112); x.lineTo(1560, 112); x.stroke();
    x.fillStyle = INK; x.textBaseline = 'alphabetic';
    x.font = '800 34px ' + MONO; x.textAlign = 'left'; x.fillText('CASE #' + caseNumber(), 60, 80);
    x.textAlign = 'right'; x.fillText((team || 'Our team').toUpperCase(), 1520, 80);
    x.textAlign = 'left';
    x.font = '800 28px ' + MONO; x.fillStyle = INK;
    x.fillText(ind().icon + '  ' + f.industry.toUpperCase(), 60, 170);
    x.font = '900 76px ' + SERIF; x.fillText(f.c.n, 60, 252);
    x.font = '800 22px ' + MONO; x.fillStyle = CORAL; x.fillText('THE PROBLEM', 60, 320);
    x.font = '700 44px ' + SERIF; x.fillStyle = INK;
    const endY = wrap(strip(text('problem')) + '.', 60, 376, 1480, 56, 3);
    const boxY = Math.max(endY + 10, 470);
    x.fillStyle = INK; x.fillRect(60, boxY, 1480, 768 - boxY);
    x.fillStyle = MAIZE; x.font = '800 20px ' + MONO; x.fillText('OUR SOLUTION', 90, boxY + 40);
    x.fillStyle = PAPER; x.font = '700 42px ' + SERIF;
    wrap(sentenceText(true), 90, boxY + 104, 1420, 56, 4);
    x.fillStyle = INK; x.font = '800 24px ' + MONO;
    x.fillText('SUCCESS: ' + strip(text('metric')).toUpperCase(), 60, 820);
    x.textAlign = 'right'; x.font = '700 20px ' + MONO; x.fillStyle = '#6b6258';
    x.fillText('FICTIONAL CLIENT · AI CASE SPINNER', 1520, 820);
    cv.toBlob((b) => { download('pitch-card-' + caseNumber() + '.png', b); toast('Pitch card downloaded.'); }, 'image/png');
  }

  /* ---------------- sprint clock ---------------- */
  const T = { dur: 2700, left: 2700, end: 0, run: false, iv: null };
  const LABELS = { 10: 'Define', 45: 'Build', 15: 'Share-out' };
  const fmt = (s) => pad(Math.floor(s / 60), 2) + ':' + pad(s % 60, 2);
  function paintClock() {
    $('#clockTime').textContent = fmt(T.left);
    $('#clock').classList.toggle('hot', T.run && T.left <= 300);
    document.title = T.run ? fmt(T.left) + ' · AI Case Spinner' : 'AI Case Spinner';
    $('#clockGo').textContent = T.run ? 'Pause' : (T.left < T.dur && T.left > 0 ? 'Resume' : 'Start');
    $('#clockLabel').textContent = (LABELS[T.dur / 60] || 'Sprint') + ' clock';
  }
  function tick() {
    T.left = Math.max(0, Math.ceil((T.end - Date.now()) / 1000));
    if (T.dur === 2700 && S && !W.curveOpen && T.left <= T.dur / 2) openCurve(true);
    if (T.left === 0) {
      clearInterval(T.iv); T.run = false; paintClock();
      const c = $('#clock'); c.classList.add('done'); setTimeout(() => c.classList.remove('done'), 1700);
      toast('Time! Pencils down.');
      [0, 220, 440].forEach((d) => setTimeout(() => beep(880, 0.2, 'square', 0.07), d));
      return;
    }
    paintClock();
  }
  function clockGo() {
    if (T.run) { clearInterval(T.iv); T.run = false; paintClock(); return; }
    if (T.left <= 0) T.left = T.dur;
    T.end = Date.now() + T.left * 1000; T.run = true;
    clearInterval(T.iv); T.iv = setInterval(tick, 250); tick();
  }
  function clockSet(min) {
    clearInterval(T.iv); T.run = false; T.dur = min * 60; T.left = T.dur;
    $$('.clock-presets button').forEach((b) => b.classList.toggle('on', Number(b.dataset.min) === min));
    paintClock();
  }

  /* ---------------- wiring ---------------- */
  function showSections() { ['#caseSection', '#work', '#brief'].forEach((s) => { $(s).hidden = false; }); }

  function startNew() {
    S = { mode: 1, i: {} };
    rollKeys(ALLKEYS);
    showSections(); setModeUI(); buildReels();
    // start blank, then spin so the reels animate on first view
    spinAll();
    setTimeout(() => $('#caseSection').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }), 60);
  }
  function setModeUI() {
    $$('.seg button').forEach((b) => b.setAttribute('aria-checked', Number(b.dataset.mode) === S.mode ? 'true' : 'false'));
  }

  function init() {
    // marquee of industries
    const items = D.industries.map((x) => '<span>' + x.icon + ' ' + esc(x.name) + '</span>').join('');
    $('#marquee').innerHTML = items + items;

    $('#takeCase').addEventListener('click', startNew);

    $('#spinAll').addEventListener('click', spinAll);
    $('#reels').addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      const k = b.closest('.reel').dataset.k;
      if (b.dataset.act === 'lock') { locks[k] = !locks[k]; refreshLockUI(); beep(400, 0.05); }
      else rollOne(k);
    });
    $$('.seg button').forEach((b) => b.addEventListener('click', () => {
      if (!S || busy) return;
      S.mode = Number(b.dataset.mode); setModeUI(); buildReels(); renderMemo(false); renderWork(); updateBrief(); writeHash();
    }));

    $('#breakSeal').addEventListener('click', () => openCurve(false));
    $('#copyCurve').addEventListener('click', () => copyText('New requirement from the client: ' + D.curveballs[S.i.curve], 'Copied. Paste it into Claude Code.'));

    // interview
    $('#ivChips').addEventListener('click', (e) => { const b = e.target.closest('[data-iv]'); if (b && !b.disabled) askClient(b.dataset.iv); });
    $('#ivLog').addEventListener('click', (e) => { const b = e.target.closest('[data-save]'); if (b && !b.disabled) saveAnswer(b.dataset.save); });

    // worksheet
    $('#qgrid').addEventListener('input', (e) => {
      const q = e.target.dataset.q; if (!q) return;
      W[q] = e.target.value; saveW(); refreshWork(); updateBrief();
    });
    $('#qgrid').addEventListener('click', (e) => {
      const seed = e.target.closest('[data-seed]');
      if (seed) {
        const q = QS.find((x) => x.id === seed.dataset.seed); const ta = $('textarea[data-q="' + q.id + '"]');
        if (ta.value.trim()) { toast('Clear the box first to use the starter text.'); return; }
        ta.value = q.seed(); W[q.id] = ta.value; saveW(); refreshWork(); updateBrief(); ta.focus();
        return;
      }
      const role = e.target.closest('.role');
      if (role && !role.disabled) {
        const n = Number(role.dataset.role); W.ai = (W.ai === n) ? undefined : n; saveW(); refreshWork(); updateBrief();
      }
    });
    [['#sName', 'sName'], ['#sGoal', 'sGoal'], ['#sOutcome', 'sOutcome']].forEach((p) => {
      $(p[0]).addEventListener('input', (e) => { W[p[1]] = e.target.value; saveW(); renderSentence(); updateBrief(); });
    });
    $('#teamName').addEventListener('input', (e) => { team = e.target.value; store.set('cs:team', team); renderMemo(false); updateBrief(); });
    $('#teamRoll').addEventListener('click', () => {
      team = D.teamAdj[rnd(D.teamAdj.length)] + ' ' + D.teamNoun[rnd(D.teamNoun.length)];
      $('#teamName').value = team; store.set('cs:team', team); renderMemo(false); updateBrief(); beep(520, 0.08, 'triangle', 0.07);
    });

    // brief
    $$('.tabs button').forEach((b) => b.addEventListener('click', () => {
      activeTab = b.dataset.tab;
      $$('.tabs button').forEach((x) => x.setAttribute('aria-selected', x === b ? 'true' : 'false'));
      paintBrief();
    }));
    $('#briefText').addEventListener('input', (e) => { edits[activeTab] = e.target.value; $('#briefHint').innerHTML = 'You edited this. <button class="chip-btn" id="resetEdit">Reset</button>'; });
    $('#briefHint').addEventListener('click', (e) => { if (e.target.id === 'resetEdit') { delete edits[activeTab]; paintBrief(); } });
    $('#copyBrief').addEventListener('click', () => copyText($('#briefText').value, 'Copied. Paste it into Claude Code.'));
    $('#dlBrief').addEventListener('click', () => { download(TABS[activeTab].file, $('#briefText').value); toast('Saved ' + TABS[activeTab].file); });
    $('#pitchBtn').addEventListener('click', pitchCard);
    $('#shareBtn').addEventListener('click', () => {
      writeHash();
      copyText(location.href, location.protocol === 'file:' ? 'Copied, but this is a local file path. Open the hosted page to share a working link.' : 'Case link copied. Anyone who opens it gets this exact case.');
    });

    // sound
    const sb = $('#soundBtn');
    const paintSound = () => { sb.textContent = 'Sound: ' + (soundOn ? 'on' : 'off'); sb.setAttribute('aria-pressed', soundOn); };
    paintSound();
    sb.addEventListener('click', () => { soundOn = !soundOn; store.set('cs:sound', soundOn ? '1' : '0'); paintSound(); beep(660, 0.1, 'triangle', 0.08); });

    // clock
    $('#clockGo').addEventListener('click', clockGo);
    $('#clockReset').addEventListener('click', () => clockSet(T.dur / 60));
    $$('.clock-presets button').forEach((b) => b.addEventListener('click', () => clockSet(Number(b.dataset.min))));
    $('#clockMin').addEventListener('click', () => {
      const c = $('#clock'); c.classList.toggle('mini');
      $('#clockMin').textContent = c.classList.contains('mini') ? '+' : '−';
    });
    paintClock();
    if (window.innerWidth < 760) { $('#clock').classList.add('mini'); $('#clockMin').textContent = '+'; }

    // space = spin
    document.addEventListener('keydown', (e) => {
      if (e.code !== 'Space' || !S) return;
      if (/^(INPUT|TEXTAREA|BUTTON|A|SELECT)$/.test(e.target.tagName)) return;
      e.preventDefault(); spinAll();
    });

    // nav highlight
    if ('IntersectionObserver' in window) {
      const map = { caseSection: 'case', work: 'work', brief: 'brief' };
      const io = new IntersectionObserver((ents) => {
        ents.forEach((en) => { if (en.isIntersecting) $$('.steps a').forEach((a) => a.classList.toggle('on', a.dataset.nav === map[en.target.id])); });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(map).forEach((id) => io.observe($('#' + id)));
    }

    // shared link?
    const shared = location.hash.length > 3 ? decode(location.hash) : null;
    if (shared) {
      S = shared; showSections(); setModeUI(); buildReels();
      loadW(); renderMemo(true); renderEnvelope(); renderInterview(); renderWork(); updateBrief();
      $('#caseNo').textContent = 'CASE #' + caseNumber();
      setTimeout(() => $('#caseSection').scrollIntoView(), 50);
    }
  }

  init();
})();
