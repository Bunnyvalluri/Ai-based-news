/* ════════════════════════════════════════════════
   TruthLens — Frontend Application Logic
   ════════════════════════════════════════════════ */

'use strict';

const API_BASE = window.location.origin;

// ── Example texts ──────────────────────────────
const EXAMPLES = {
  real: [
    `Scientists at MIT published findings in Nature showing a direct link between sleep quality and cognitive function in adults aged 35–54. The peer-reviewed study tracked 2,340 participants over 18 months and found that consistent sleep below 6 hours significantly impaired memory consolidation and decision-making. Researchers recommend a minimum of 7–9 hours for optimal cognitive performance.`,
    `The Federal Reserve announced interest rates would remain at 5.25% following its meeting on Wednesday. Fed Chair stated that economic data continues to show resilience and that the committee will remain data-dependent in future decisions regarding monetary policy. Markets responded positively, with major indices rising 0.8% on the news.`
  ],
  fake: [
    `BREAKING: Scientists HIDE evidence that common vitamin D supplements CURES cancer to protect Big Pharma profits! The CDC has been suppressing this information for years — here's the proof they DON'T want you to see! A senior senator was CAUGHT secretly meeting with globalist bankers — TREASON confirmed by insider sources. Share before deleted!`,
    `SHOCKING: Government plans to microchip the entire population by 2025 — whistleblower exposes everything! New 5G towers are causing brain cancer! Your family is in IMMEDIATE danger. Hollywood actor ARRESTED for human trafficking — mainstream media REFUSES to report! The deep state is planning a FALSE FLAG attack this weekend!`
  ]
};

// ── State ───────────────────────────────────────
let currentFile = null;
let lastResult = null;
let modelReady = false;

// ── Init ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  checkSystemStatus();
  loadModelMetrics();
  initScrollEffects();
});

// ── Status Check ────────────────────────────────
async function checkSystemStatus() {
  try {
    const res = await fetch(`${API_BASE}/api/status`);
    const data = await res.json();
    modelReady = data.model_ready;
    updateStatusBanner(modelReady);
  } catch {
    updateStatusBanner(false, true);
  }
}

function updateStatusBanner(ready, error = false) {
  const spinner = document.getElementById('status-spinner');
  const readyEl = document.getElementById('status-ready');
  const notTrainedEl = document.getElementById('status-not-trained');

  spinner.classList.add('hidden');
  if (ready) {
    readyEl.classList.remove('hidden');
    // Fetch model name + gemini status
    fetch(`${API_BASE}/api/status`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        const dot = document.getElementById('gemini-status-dot');
        const txt = document.getElementById('gemini-status-text');
        if (!dot || !txt) return;
        if (data?.gemini_available) {
          dot.classList.add('active');
          txt.classList.add('active');
          txt.textContent = 'Gemini AI active';
        } else {
          dot.classList.add('error');
          txt.textContent = 'Gemini unavailable';
        }
      })
      .catch(() => { });

    fetch(`${API_BASE}/api/metrics`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.best_model) {
          document.getElementById('model-name-banner').textContent = data.best_model;
          const bestM = data.models?.[data.best_model];
          if (bestM?.accuracy) {
            const acc = Math.round(bestM.accuracy * 100);
            document.getElementById('hero-stat-accuracy').textContent = `${acc}%`;
          }
        }
      })
      .catch(() => { });
  } else {
    notTrainedEl.classList.remove('hidden');
  }
}

// ── Tabs ────────────────────────────────────────
function switchTab(tab) {
  ['text', 'file', 'examples'].forEach(t => {
    document.getElementById(`tab-${t}`).classList.toggle('active', t === tab);
    document.getElementById(`content-${t}`).classList.toggle('active', t === tab);
  });
}

// ── Character counter ───────────────────────────
function updateCharCount() {
  const txt = document.getElementById('text-input').value;
  const counter = document.getElementById('char-count');
  const words = txt.trim() ? txt.trim().split(/\s+/).length : 0;
  counter.textContent = `${txt.length} characters · ${words} words`;
}

function clearInput() {
  document.getElementById('text-input').value = '';
  updateCharCount();
  hideError();
  document.getElementById('results-panel').classList.add('hidden');
}

function hideError() {
  const err = document.getElementById('validation-error');
  err.classList.add('hidden');
  err.textContent = '';
}

function showError(msg) {
  const err = document.getElementById('validation-error');
  err.textContent = '⚠ ' + msg;
  err.classList.remove('hidden');
}

// ── Text Analysis ───────────────────────────────
async function analyzeText() {
  const text = document.getElementById('text-input').value.trim();

  hideError();

  if (!text) { showError('Please enter a news article or headline before analyzing.'); return; }
  if (text.length < 20) { showError('Input is too short. Please provide at least 20 characters.'); return; }

  setAnalyzeLoading(true);

  try {
    const res = await fetch(`${API_BASE}/api/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    if (!res.ok) {
      showError(data.error || 'An error occurred during analysis.');
      if (data.code === 'MODEL_NOT_READY') showTrainingInstructions();
      return;
    }

    displayResults(data);
    document.getElementById('results-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    showError('Could not connect to the server. Make sure the backend is running.');
  } finally {
    setAnalyzeLoading(false);
  }
}

function setAnalyzeLoading(loading) {
  const btn = document.getElementById('analyze-btn');
  const icon = btn.querySelector('.analyze-icon');
  const text = btn.querySelector('.analyze-text');
  const loader = document.getElementById('btn-loader');

  btn.disabled = loading;
  icon.style.display = loading ? 'none' : '';
  text.style.display = loading ? 'none' : '';
  loader.classList.toggle('hidden', !loading);
}

// ── File Analysis ───────────────────────────────
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) setSelectedFile(file);
}

function handleDragOver(event) {
  event.preventDefault();
  document.getElementById('upload-zone').classList.add('drag-over');
}

function handleDragLeave() {
  document.getElementById('upload-zone').classList.remove('drag-over');
}

function handleDrop(event) {
  event.preventDefault();
  document.getElementById('upload-zone').classList.remove('drag-over');
  const file = event.dataTransfer.files[0];
  if (file) setSelectedFile(file);
}

function setSelectedFile(file) {
  const allowed = ['text/plain', 'text/csv', 'application/csv'];
  const ext = file.name.split('.').pop().toLowerCase();
  if (!allowed.includes(file.type) && !['txt', 'csv'].includes(ext)) {
    alert('Invalid file type. Only .txt and .csv files are supported.');
    return;
  }
  currentFile = file;
  document.getElementById('file-selected').classList.remove('hidden');
  document.getElementById('file-name').textContent = file.name;
}

async function analyzeFile() {
  if (!currentFile) { alert('Please select a file first.'); return; }

  const btn = document.getElementById('analyze-file-btn');
  btn.disabled = true;
  btn.textContent = 'Analyzing…';

  const formData = new FormData();
  formData.append('file', currentFile);

  try {
    const res = await fetch(`${API_BASE}/api/predict/file`, { method: 'POST', body: formData });
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || 'An error occurred.');
      if (data.code === 'MODEL_NOT_READY') showTrainingInstructions();
      return;
    }

    displayResults(data);
    switchTab('text');
    document.getElementById('results-panel').scrollIntoView({ behavior: 'smooth' });

  } catch {
    alert('Could not connect to the server.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      Analyze File`;
  }
}

// ── Load examples ───────────────────────────────
function loadExample(type, index) {
  const text = EXAMPLES[type][index];
  document.getElementById('text-input').value = text;
  updateCharCount();
  switchTab('text');
  hideError();
}

// ── Display Results ─────────────────────────────
function displayResults(data) {
  lastResult = data;

  const panel = document.getElementById('results-panel');
  panel.classList.remove('hidden');

  const isFake = data.is_fake || data.label === 'FAKE';
  const label = data.label || (isFake ? 'FAKE' : 'REAL');
  const confidence = data.confidence || 0;

  // Verdict badge
  const badge = document.getElementById('verdict-badge');
  badge.className = 'verdict-badge ' + (isFake ? 'fake-verdict' : 'real-verdict');

  document.getElementById('verdict-icon').textContent = isFake ? '✗' : '✓';
  document.getElementById('verdict-label').textContent = label;
  document.getElementById('verdict-subtitle').textContent =
    isFake
      ? 'This content shows patterns consistent with misinformation'
      : 'This content shows patterns consistent with credible reporting';

  // Confidence
  const confValue = document.getElementById('confidence-value');
  confValue.textContent = `${confidence}%`;
  confValue.style.color = isFake ? 'var(--fake-color)' : 'var(--real-color)';

  const bar = document.getElementById('confidence-bar-fill');
  bar.style.width = '0%';
  bar.style.background = isFake
    ? 'linear-gradient(90deg, #ef4444, #f97316)'
    : 'linear-gradient(90deg, #10b981, #06d6a0)';

  setTimeout(() => { bar.style.width = `${confidence}%`; }, 100);

  document.getElementById('confidence-explanation').textContent =
    `A ${confidence}% confidence score means the model is ${confidence >= 90 ? 'highly certain' : confidence >= 70 ? 'fairly confident' : 'moderately confident'
    } in its ${label} classification. ${confidence < 70 ? 'Consider seeking additional sources to verify this content.' : ''
    }`;

  // Meta
  document.getElementById('meta-model').textContent = data.model_name || '—';
  document.getElementById('meta-accuracy').textContent =
    data.model_accuracy ? `${data.model_accuracy}%` : '—';
  document.getElementById('meta-time').textContent =
    data.response_time_ms ? `${data.response_time_ms}ms` : '—';

  // Keywords
  const kwList = document.getElementById('keywords-list');
  kwList.innerHTML = '';
  if (data.top_keywords && data.top_keywords.length > 0) {
    document.getElementById('keywords-section').style.display = '';
    data.top_keywords.forEach((kw, i) => {
      const tier = i < 3 ? 'high' : i < 6 ? 'mid' : 'low';
      const chip = document.createElement('div');
      chip.className = `keyword-chip ${tier}`;
      chip.style.animationDelay = `${i * 60}ms`;
      chip.innerHTML = `
        <span>${kw.word}</span>
        <span class="keyword-score">${kw.score.toFixed(3)}</span>
      `;
      kwList.appendChild(chip);
    });
  } else {
    document.getElementById('keywords-section').style.display = 'none';
  }

  // Explanation
  document.getElementById('explanation-icon').textContent = isFake ? '\u26a0\ufe0f' : '\u2705';
  document.getElementById('explanation-text').innerHTML = isFake
    ? `<strong>Why FAKE?</strong> The AI detected linguistic patterns commonly associated with misinformation: sensationalist language, emotional manipulation, unverified claims, or conspiracy-style rhetoric. This does not mean the content is definitely false \u2014 always cross-reference with trusted sources.`
    : `<strong>Why REAL?</strong> The AI detected language patterns typical of credible news: measured tone, attributable claims, factual reporting style, and absence of manipulative rhetoric. While promising, we recommend verifying important claims through multiple reputable sources.`;

  // Gemini panel
  renderGeminiPanel(data.gemini, isFake);
}

// ── Gemini Panel Renderer ────────────────────────
function renderGeminiPanel(gemini, isFake) {
  const loading = document.getElementById('gemini-loading');
  const content = document.getElementById('gemini-content');
  const unavail = document.getElementById('gemini-unavailable');
  const chip = document.getElementById('gemini-verdict-chip');

  // Reset
  loading.classList.remove('hidden');
  content.classList.add('hidden');
  unavail.classList.add('hidden');
  chip.className = 'gemini-verdict-chip';
  chip.textContent = '—';

  if (!gemini || !gemini.gemini_available) {
    loading.classList.add('hidden');
    unavail.classList.remove('hidden');
    return;
  }

  // Slight delay so it feels like it's "thinking"
  setTimeout(() => {
    loading.classList.add('hidden');
    content.classList.remove('hidden');

    // Verdict chip
    const v = (gemini.gemini_verdict || '').toUpperCase();
    chip.textContent = v || '—';
    if (v === 'REAL') chip.classList.add('real');
    else if (v === 'FAKE') chip.classList.add('fake');
    else chip.classList.add('uncertain');

    // Credibility bar (0–10 → 0–100%)
    const score = gemini.credibility_score ?? 5;
    const pct = (score / 10) * 100;
    const barEl = document.getElementById('credibility-bar-fill');
    const valEl = document.getElementById('credibility-score-val');
    barEl.style.width = '0%';
    setTimeout(() => { barEl.style.width = `${pct}%`; }, 80);
    valEl.textContent = `${score}/10`;

    // Red flags
    const redList = document.getElementById('red-flags-list');
    const redFlags = gemini.red_flags || [];
    redList.innerHTML = redFlags.length
      ? redFlags.map(f => `<li>${f}</li>`).join('')
      : `<li style="color:var(--text-muted);font-style:italic">None detected</li>`;

    // Credibility signals
    const credList = document.getElementById('cred-signals-list');
    const credSignals = gemini.credibility_signals || [];
    credList.innerHTML = credSignals.length
      ? credSignals.map(s => `<li>${s}</li>`).join('')
      : `<li style="color:var(--text-muted);font-style:italic">None detected</li>`;

    // Language analysis
    const langText = document.getElementById('lang-analysis-text');
    langText.textContent = gemini.language_analysis || '—';

    // Fact-check verdict
    const factText = document.getElementById('fact-verdict-text');
    factText.textContent = gemini.fact_check_verdict || '—';

    // Recommendation
    const recText = document.getElementById('rec-text');
    recText.textContent = gemini.recommendation || '—';

  }, 600);
}

// ── Reset ───────────────────────────────────────
function resetAnalysis() {
  document.getElementById('results-panel').classList.add('hidden');
  document.getElementById('text-input').focus();
  document.getElementById('detector').scrollIntoView({ behavior: 'smooth' });
}

// ── Copy results ─────────────────────────────────
function copyResults() {
  if (!lastResult) return;
  const text = [
    `TruthLens AI Fake News Detection Report`,
    `=====================================`,
    `Verdict:    ${lastResult.label}`,
    `Confidence: ${lastResult.confidence}%`,
    `Model:      ${lastResult.model_name || '—'}`,
    `Accuracy:   ${lastResult.model_accuracy ? lastResult.model_accuracy + '%' : '—'}`,
    `Time:       ${lastResult.response_time_ms ? lastResult.response_time_ms + 'ms' : '—'}`,
    ``,
    `Top Keywords:`,
    ...(lastResult.top_keywords || []).map(k => `  - ${k.word} (${k.score.toFixed(3)})`),
    ``,
    `Generated by TruthLens v1.0 — AI Fake News Detection System`
  ].join('\n');

  navigator.clipboard.writeText(text)
    .then(() => {
      const btn = document.querySelector('.btn-copy');
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Copied!';
      btn.style.color = 'var(--real-color)';
      setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
    })
    .catch(() => alert('Could not copy to clipboard.'));
}

// ── Load Metrics ────────────────────────────────
async function loadModelMetrics() {
  const loading = document.getElementById('metrics-loading');
  const content = document.getElementById('metrics-content');
  const notAvail = document.getElementById('metrics-not-available');

  try {
    const res = await fetch(`${API_BASE}/api/metrics`);

    if (!res.ok) {
      loading.classList.add('hidden');
      notAvail.classList.remove('hidden');
      return;
    }

    const data = await res.json();
    loading.classList.add('hidden');
    content.classList.remove('hidden');
    renderMetrics(data);

  } catch {
    loading.classList.add('hidden');
    notAvail.classList.remove('hidden');
  }
}

function renderMetrics(data) {
  const bestName = data.best_model;
  const bestData = data.models?.[bestName] || {};

  // Best model card
  document.getElementById('bm-title').textContent = bestName || 'Best Model';

  const metricsEl = document.getElementById('bm-metrics');
  const metricDefs = [
    { label: 'Accuracy', key: 'accuracy' },
    { label: 'Precision', key: 'precision' },
    { label: 'Recall', key: 'recall' },
    { label: 'F1-Score', key: 'f1_score' },
    { label: 'Fake F1', key: 'f1_fake_class' },
  ];
  metricsEl.innerHTML = metricDefs.map(m => {
    const val = bestData[m.key];
    const pct = val !== undefined ? Math.round(val * 100) + '%' : '—';
    return `<div class="bm-metric"><span class="bm-metric-val">${pct}</span><span class="bm-metric-label">${m.label}</span></div>`;
  }).join('');

  // All models grid
  const grid = document.getElementById('models-grid');
  const models = data.models || {};
  grid.innerHTML = Object.entries(models)
    .filter(([name]) => name !== bestName)
    .map(([name, m]) => {
      if (m.error) return `<div class="model-card"><div class="model-card-header"><span class="model-card-name">${name}</span><span style="color:var(--fake-color)">Error</span></div><p style="font-size:0.78rem;color:var(--text-muted)">${m.error}</p></div>`;
      const rows = [
        { k: 'Accuracy', v: m.accuracy },
        { k: 'Precision', v: m.precision },
        { k: 'Recall', v: m.recall },
        { k: 'F1-Score', v: m.f1_score },
      ].map(r => `<div class="model-metric-row"><span class="model-metric-key">${r.k}</span><span class="model-metric-val">${r.v !== undefined ? Math.round(r.v * 100) + '%' : '—'}</span></div>`).join('');
      const acc = m.accuracy !== undefined ? Math.round(m.accuracy * 100) + '%' : '—';
      return `<div class="model-card"><div class="model-card-header"><span class="model-card-name">${name}</span><span class="model-card-acc">${acc}</span></div>${rows}</div>`;
    }).join('');
}

// ── Training instructions modal ─────────────────
function showTrainingInstructions() {
  document.getElementById('training-modal').classList.remove('hidden');
}

// ── Scroll effects ───────────────────────────────
function initScrollEffects() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}
