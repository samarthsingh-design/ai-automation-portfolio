const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'images');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

function renderCanvas(title, activeText, nodes, connections, groups = []) {
  // Compute SVG content
  let svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 520" width="100%" height="100%" style="background:#13141c; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <!-- Dot grid pattern -->
    <pattern id="dot-grid" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="#242636"/>
    </pattern>
    <!-- Gradients -->
    <linearGradient id="wire-grad-active" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#aa88ff" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#60a5fa" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="wire-grad-sub" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#aa88ff" stop-opacity="0.8"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Canvas Background -->
  <rect width="1000" height="520" fill="#12131b"/>
  <rect width="1000" height="520" fill="url(#dot-grid)"/>

  <!-- Top UI Chrome / Breadcrumb Bar -->
  <rect x="0" y="0" width="1000" height="42" fill="#181924" stroke="#252738" stroke-width="1"/>
  <circle cx="24" cy="21" r="5" fill="#ea4335" opacity="0.8"/>
  <circle cx="40" cy="21" r="5" fill="#fbbc05" opacity="0.8"/>
  <circle cx="56" cy="21" r="5" fill="#34a853" opacity="0.8"/>
  <text x="80" y="25" fill="#8f93a8" font-size="12" font-weight="500">n8n / Workflows / <tspan fill="#ffffff" font-weight="600">${title}</tspan></text>
  
  <rect x="830" y="11" width="76" height="20" rx="10" fill="#1a3826" stroke="#22c55e" stroke-width="1"/>
  <circle cx="842" cy="21" r="3.5" fill="#22c55e"/>
  <text x="852" y="25" fill="#4ade80" font-size="10" font-weight="600">${activeText}</text>
  <rect x="918" y="11" width="62" height="20" rx="4" fill="#252738" stroke="#36394f" stroke-width="1"/>
  <text x="933" y="25" fill="#cfd3e8" font-size="10" font-weight="500">100%</text>

  <!-- Node Groups / Bounding Boxes -->
  ${groups.map(g => `
    <rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="8" fill="${g.fill || 'rgba(170,136,255,0.03)'}" stroke="${g.stroke || '#2c2e42'}" stroke-dasharray="4,4" stroke-width="1"/>
    <text x="${g.x + 14}" y="${g.y + 22}" fill="${g.labelColor || '#aa88ff'}" font-size="11" font-weight="600" letter-spacing="0.04em">${g.label}</text>
  `).join('')}

  <!-- Connection Wires -->
  ${connections.map(c => {
    const fromX = c.x1;
    const fromY = c.y1;
    const toX = c.x2;
    const toY = c.y2;
    const dx = Math.abs(toX - fromX) * 0.5;
    const d = `M ${fromX} ${fromY} C ${fromX + dx} ${fromY}, ${toX - dx} ${toY}, ${toX} ${toY}`;
    const stroke = c.isAi ? 'url(#wire-grad-sub)' : 'url(#wire-grad-active)';
    const strokeWidth = c.isAi ? '2' : '2.5';
    const dash = c.isAi ? 'stroke-dasharray="3,3"' : '';
    return `
      <path d="${d}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" ${dash} opacity="0.85"/>
      <circle cx="${fromX}" cy="${fromY}" r="3" fill="#ffffff" stroke="#aa88ff" stroke-width="1.5"/>
      <circle cx="${toX}" cy="${toY}" r="3" fill="#ffffff" stroke="#60a5fa" stroke-width="1.5"/>
    `;
  }).join('')}

  <!-- Nodes -->
  ${nodes.map(n => {
    return `
    <g transform="translate(${n.x}, ${n.y})">
      <!-- Shadow -->
      <rect x="2" y="3" width="${n.w || 160}" height="64" rx="8" fill="#000000" opacity="0.4"/>
      <!-- Body -->
      <rect x="0" y="0" width="${n.w || 160}" height="64" rx="8" fill="#1b1c26" stroke="${n.stroke || '#2f3245'}" stroke-width="1.5"/>
      <!-- Left color bar / accent -->
      <rect x="0" y="0" width="5" height="64" rx="3" fill="${n.color || '#aa88ff'}"/>
      <!-- Icon pill -->
      <circle cx="26" cy="32" r="14" fill="${n.color}22" stroke="${n.color}55" stroke-width="1"/>
      <text x="26" y="36" text-anchor="middle" font-size="12" fill="${n.color}">${n.icon || '◈'}</text>
      <!-- Title & subtitle -->
      <text x="48" y="27" fill="#ffffff" font-size="11.5" font-weight="600">${n.title}</text>
      <text x="48" y="43" fill="#8e92a8" font-size="9.5">${n.subtitle || 'Node'}</text>
      <!-- Port dots -->
      ${n.hasInput !== false ? `<circle cx="0" cy="32" r="3.5" fill="#ffffff" stroke="#2f3245" stroke-width="1.5"/>` : ''}
      ${n.hasOutput !== false ? `<circle cx="${n.w || 160}" cy="32" r="3.5" fill="#ffffff" stroke="#2f3245" stroke-width="1.5"/>` : ''}
      ${n.badge ? `
        <rect x="${(n.w || 160) - 48}" y="8" width="42" height="14" rx="3" fill="${n.color}33"/>
        <text x="${(n.w || 160) - 27}" y="18" text-anchor="middle" font-size="8" font-weight="600" fill="${n.color}">${n.badge}</text>
      ` : ''}
    </g>
    `;
  }).join('')}
</svg>
  `.trim();

  return svg;
}

// 1. AI Email Drafter (18 nodes)
const emailNodes = [
  { x: 30, y: 150, title: 'Gmail Trigger', subtitle: 'Poll Unread Emails', color: '#ea4335', icon: '✉️', hasInput: false, badge: 'TRIGGER' },
  { x: 230, y: 150, title: 'AI Agent', subtitle: 'LangChain Orchestrator', color: '#a855f7', icon: '🤖', badge: 'AI' },
  { x: 230, y: 310, title: 'OpenRouter Llama', subtitle: 'Hermes 3 70B Model', color: '#06b6d4', icon: '🧠', hasOutput: false, badge: 'LLM' },
  { x: 430, y: 150, title: 'Parse JSON Code', subtitle: 'JavaScript Filter', color: '#eab308', icon: '⚡', badge: 'CODE' },
  { x: 620, y: 150, title: 'If Reply Needed?', subtitle: 'Spam & Intent Logic', color: '#3b82f6', icon: '⑂', badge: 'LOGIC' },
  { x: 810, y: 80, title: 'Telegram Alert', subtitle: 'No Reply Needed', color: '#229ed9', icon: '✈️', hasOutput: false },
  { x: 430, y: 390, title: 'Create Draft', subtitle: 'Gmail HTML Message', color: '#ea4335', icon: '📝' },
  { x: 620, y: 390, title: 'Slack & Telegram', subtitle: 'Interactive Approval', color: '#8b5cf6', icon: '🛎️', badge: 'APPROVAL' },
  { x: 810, y: 390, title: 'If Approved?', subtitle: 'User Action Check', color: '#3b82f6', icon: '⑂' },
  { x: 810, y: 260, title: 'Send via Gmail', subtitle: 'HTTP API Dispatch', color: '#10b981', icon: '🚀', hasOutput: false, badge: 'SENT' },
];

const emailConns = [
  { x1: 190, y1: 182, x2: 230, y2: 182 },
  { x1: 310, y1: 310, x2: 310, y2: 214, isAi: true },
  { x1: 390, y1: 182, x2: 430, y2: 182 },
  { x1: 590, y1: 182, x2: 620, y2: 182 },
  { x1: 780, y1: 165, x2: 810, y2: 112 },
  { x1: 710, y1: 214, x2: 430, y2: 422 },
  { x1: 590, y1: 422, x2: 620, y2: 422 },
  { x1: 780, y1: 422, x2: 810, y2: 422 },
  { x1: 890, y1: 390, x2: 890, y2: 324 },
];

const emailGroups = [
  { x: 20, y: 60, w: 770, h: 220, label: '[ PHASE 1: INBOX MONITORING & AI TRIAGE ]', labelColor: '#aa88ff', fill: 'rgba(170,136,255,0.03)', stroke: '#322d4f' },
  { x: 410, y: 320, w: 580, h: 180, label: '[ PHASE 2: HUMAN-IN-THE-LOOP APPROVAL & DISPATCH ]', labelColor: '#4ade80', fill: 'rgba(34,197,94,0.02)', stroke: '#224a35' },
];

// 2. AI Lead Enrichment & Qualification System (19 nodes)
const leadNodes = [
  { x: 30, y: 160, title: 'Lead Webhook', subtitle: 'POST /lead-intake', color: '#f97316', icon: '⚡', hasInput: false, badge: 'WEBHOOK' },
  { x: 220, y: 160, title: 'Validate Fields', subtitle: 'Schema & Email Check', color: '#3b82f6', icon: '✓' },
  { x: 410, y: 160, title: 'Assign Lead ID', subtitle: 'Normalize & Assign', color: '#8b5cf6', icon: '🆔' },
  { x: 600, y: 160, title: 'Scrape Website', subtitle: 'HTTP Fetch & HTML Meta', color: '#10b981', icon: '🌐', badge: 'SCRAPE' },
  { x: 790, y: 160, title: 'Gemini 2.0 AI', subtitle: 'Intent & Feasibility', color: '#a855f7', icon: '🤖', badge: 'AI AGENT' },
  { x: 790, y: 290, title: 'Structured Parser', subtitle: 'JSON Output Schema', color: '#06b6d4', icon: '📐', hasOutput: false, badge: 'SCHEMA' },
  { x: 180, y: 380, title: '4-Way Router', subtitle: 'Switch Qualification', color: '#f59e0b', icon: '⑂', badge: 'ROUTER' },
  { x: 380, y: 340, title: 'HOT Lead 🔥', subtitle: 'High Intent Tier', color: '#ef4444', icon: '🔥' },
  { x: 380, y: 430, title: 'WARM Lead 🌤️', subtitle: 'Discovery Required', color: '#f59e0b', icon: '🌤️' },
  { x: 570, y: 380, title: 'Google Sheets', subtitle: 'Append Lead Row', color: '#059669', icon: '📊', badge: 'SHEETS' },
  { x: 760, y: 380, title: 'Slack Alert', subtitle: 'Instant Team Notify', color: '#8b5cf6', icon: '💬', badge: 'NOTIFY' },
  { x: 920, y: 380, title: 'Webhook OK', subtitle: 'Return JSON 200', color: '#10b981', icon: '✓', hasOutput: false, badge: 'RESPONSE' },
];

const leadConns = [
  { x1: 190, y1: 192, x2: 220, y2: 192 },
  { x1: 380, y1: 192, x2: 410, y2: 192 },
  { x1: 570, y1: 192, x2: 600, y2: 192 },
  { x1: 760, y1: 192, x2: 790, y2: 192 },
  { x1: 870, y1: 290, x2: 870, y2: 224, isAi: true },
  { x1: 870, y1: 224, x2: 180, y2: 412 },
  { x1: 340, y1: 400, x2: 380, y2: 372 },
  { x1: 340, y1: 420, x2: 380, y2: 462 },
  { x1: 540, y1: 372, x2: 570, y2: 412 },
  { x1: 540, y1: 462, x2: 570, y2: 412 },
  { x1: 730, y1: 412, x2: 760, y2: 412 },
  { x1: 910, y1: 412, x2: 920, y2: 412 },
];

const leadGroups = [
  { x: 20, y: 80, w: 960, h: 220, label: '[ PIPELINE 1: INGESTION, SCRAPING & GEMINI AI ANALYSIS ]', labelColor: '#60a5fa', fill: 'rgba(96,165,250,0.03)', stroke: '#263a56' },
  { x: 160, y: 310, w: 820, h: 190, label: '[ PIPELINE 2: QUALIFICATION ROUTING, CRM SYNC & SLACK ALERTS ]', labelColor: '#34d399', fill: 'rgba(52,211,153,0.02)', stroke: '#1d4837' },
];

// 3. Agency Multi-Touch Lead Nurturing & Inbox Watcher (14 nodes)
const nurtureNodes = [
  { x: 30, y: 150, title: 'Schedule Trigger', subtitle: 'Cron: Mon-Fri 09:00', color: '#f97316', icon: '⏱️', hasInput: false, badge: 'CRON' },
  { x: 220, y: 150, title: 'Fetch Leads', subtitle: 'Google Sheets CRM', color: '#059669', icon: '📊', badge: 'DB' },
  { x: 410, y: 150, title: 'Filter Due Leads', subtitle: 'Count < 3 & Date Check', color: '#3b82f6', icon: '🔍' },
  { x: 600, y: 150, title: 'Loop Batches', subtitle: 'Split in Batches', color: '#8b5cf6', icon: '🔁', badge: 'LOOP' },
  { x: 790, y: 150, title: 'Check Reply', subtitle: 'Gmail Inbound Scan', color: '#ea4335', icon: '📥', badge: 'INBOX' },
  { x: 790, y: 280, title: 'Did Lead Reply?', subtitle: 'Branching Decision', color: '#3b82f6', icon: '⑂' },
  { x: 570, y: 280, title: 'Mark Replied', subtitle: 'Cancel Sequence', color: '#10b981', icon: '🛑', hasOutput: false, badge: 'STOPPED' },
  { x: 60, y: 400, title: 'Touchpoint Switch', subtitle: 'Step 1, 2, or 3', color: '#f59e0b', icon: '⑂', badge: 'SWITCH' },
  { x: 270, y: 350, title: 'Touchpoint #1', subtitle: 'UX Audit Email', color: '#ea4335', icon: '✉️' },
  { x: 470, y: 350, title: 'Update CRM +4d', subtitle: 'Next Due Date', color: '#059669', icon: '📅' },
  { x: 270, y: 440, title: 'Touchpoint #2', subtitle: 'Case Study Email', color: '#ea4335', icon: '📈' },
  { x: 470, y: 440, title: 'Update CRM +7d', subtitle: 'Next Due Date', color: '#059669', icon: '📅' },
  { x: 670, y: 400, title: 'Touchpoint #3', subtitle: 'Break-up Closing', color: '#ea4335', icon: '👋' },
  { x: 840, y: 400, title: 'Completed', subtitle: 'Status: Closed', color: '#6366f1', icon: '🏁', hasOutput: false, badge: 'DONE' },
];

const nurtureConns = [
  { x1: 190, y1: 182, x2: 220, y2: 182 },
  { x1: 380, y1: 182, x2: 410, y2: 182 },
  { x1: 570, y1: 182, x2: 600, y2: 182 },
  { x1: 760, y1: 182, x2: 790, y2: 182 },
  { x1: 870, y1: 214, x2: 870, y2: 280 },
  { x1: 790, y1: 312, x2: 730, y2: 312 },
  { x1: 870, y1: 344, x2: 60, y2: 432 },
  { x1: 220, y1: 420, x2: 270, y2: 382 },
  { x1: 220, y1: 440, x2: 270, y2: 472 },
  { x1: 430, y1: 382, x2: 470, y2: 382 },
  { x1: 430, y1: 472, x2: 470, y2: 472 },
  { x1: 630, y1: 432, x2: 670, y2: 432 },
  { x1: 830, y1: 432, x2: 840, y2: 432 },
];

const nurtureGroups = [
  { x: 20, y: 70, w: 960, h: 230, label: '[ LEAD EVALUATION & INBOUND REPLY DETECTION ]', labelColor: '#f97316', fill: 'rgba(249,115,22,0.02)', stroke: '#473122' },
  { x: 40, y: 315, w: 940, h: 185, label: '[ DYNAMIC MULTI-TOUCH DRIP & SCHEDULE RECALCULATION ]', labelColor: '#aa88ff', fill: 'rgba(170,136,255,0.02)', stroke: '#342f4c' },
];

// 4. Enterprise RAG Knowledge Pipeline & Chatbot (11 nodes)
const ragNodes = [
  { x: 30, y: 150, title: 'Drive Trigger', subtitle: 'Folder Watch (1m)', color: '#4285f4', icon: '📁', hasInput: false, badge: 'SYNC' },
  { x: 210, y: 150, title: 'Download File', subtitle: 'Google Drive API', color: '#4285f4', icon: '⬇️' },
  { x: 390, y: 150, title: 'Text Splitter', subtitle: 'Recursive Chunks', color: '#f59e0b', icon: '✂️' },
  { x: 570, y: 150, title: 'Gemini Embeddings', subtitle: 'Dense Vector Gen', color: '#06b6d4', icon: '🧬', badge: 'EMBED' },
  { x: 760, y: 150, title: 'Pinecone Upsert', subtitle: 'Vector Index: demo', color: '#0d9488', icon: '🌲', hasOutput: false, badge: 'VECTOR DB' },
  { x: 30, y: 380, title: 'Chat Trigger', subtitle: 'Customer Support UI', color: '#f97316', icon: '💬', hasInput: false, badge: 'CHAT' },
  { x: 220, y: 380, title: 'AI Support Agent', subtitle: 'LangChain Controller', color: '#a855f7', icon: '🤖', badge: 'AI AGENT' },
  { x: 430, y: 330, title: 'Pinecone Search', subtitle: 'Retrieve-as-Tool (Top 1000)', color: '#0d9488', icon: '🔍', badge: 'TOOL' },
  { x: 430, y: 440, title: 'OpenRouter Chat', subtitle: 'Liquid LFM Model', color: '#6366f1', icon: '🧠', hasOutput: false, badge: 'LLM' },
  { x: 640, y: 330, title: 'Query Embeddings', subtitle: 'Gemini Vectorizer', color: '#06b6d4', icon: '🧬', hasOutput: false },
  { x: 820, y: 380, title: 'Support Answer', subtitle: 'Grounded Output', color: '#10b981', icon: '✓', hasOutput: false, badge: 'RESOLVED' },
];

const ragConns = [
  { x1: 190, y1: 182, x2: 210, y2: 182 },
  { x1: 370, y1: 182, x2: 390, y2: 182 },
  { x1: 550, y1: 182, x2: 570, y2: 182 },
  { x1: 730, y1: 182, x2: 760, y2: 182 },
  { x1: 190, y1: 412, x2: 220, y2: 412 },
  { x1: 430, y1: 362, x2: 380, y2: 395, isAi: true },
  { x1: 430, y1: 472, x2: 380, y2: 425, isAi: true },
  { x1: 640, y1: 362, x2: 590, y2: 362, isAi: true },
  { x1: 380, y1: 412, x2: 820, y2: 412 },
];

const ragGroups = [
  { x: 20, y: 65, w: 960, h: 200, label: '[ INGESTION: GOOGLE DRIVE -> CHUNKING -> GEMINI EMBEDDINGS -> PINECONE ]', labelColor: '#06b6d4', fill: 'rgba(6,182,212,0.02)', stroke: '#1d414a' },
  { x: 20, y: 285, w: 960, h: 215, label: '[ RETRIEVAL & INFERENCE: PINECONE VECTOR SEARCH -> LLM AGENT -> SUPPORT CHAT ]', labelColor: '#a855f7', fill: 'rgba(168,85,247,0.02)', stroke: '#3f2558' },
];

fs.writeFileSync(path.join(imgDir, 'workflow-email-drafter.svg'), renderCanvas('ai powered email draft maker', 'ACTIVE', emailNodes, emailConns, emailGroups));
fs.writeFileSync(path.join(imgDir, 'workflow-lead-qualification.svg'), renderCanvas('AI Lead Enrichment & Qualification System', 'PRODUCTION', leadNodes, leadConns, leadGroups));
fs.writeFileSync(path.join(imgDir, 'workflow-lead-nurturing.svg'), renderCanvas('Agency Lead Follow-up zero code wala', 'ACTIVE', nurtureNodes, nurtureConns, nurtureGroups));
fs.writeFileSync(path.join(imgDir, 'workflow-rag-chatbot.svg'), renderCanvas('rag pipeline and chabot', 'GROUNDED', ragNodes, ragConns, ragGroups));

console.log('Successfully generated 4 authentic n8n workflow SVGs');

