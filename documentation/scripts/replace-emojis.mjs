/**
 * replace-emojis.mjs
 * Substitui emojis por Material Symbols Outlined nos arquivos .md da documentação
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(__dirname, '../docs');

// Helper para gerar span Material Symbols
const ms = (name) => `<span class="material-symbols-outlined">${name}</span>`;

// Mapeamento emoji → Material Symbol
const EMOJI_MAP = {
    // ── Tempo / processo ───────────────────────────────────────────
    '⏰': ms('alarm'),
    '⏱': ms('timer'),
    '⏳': ms('hourglass_empty'),
    '⏸': ms('pause'),

    // ── Navegação / setas ──────────────────────────────────────────
    '➡': ms('arrow_forward'),
    '⬆': ms('arrow_upward'),
    '⬇': ms('arrow_downward'),
    '▶': ms('play_arrow'),

    // ── Status / alertas ───────────────────────────────────────────
    '✅': ms('check_circle'),
    '❌': ms('cancel'),
    '❓': ms('help'),
    '⚠': ms('warning'),
    '⚠️': ms('warning'),
    '✨': ms('auto_awesome'),
    '⭐': ms('star'),
    '🔥': ms('local_fire_department'),
    '🚧': ms('construction'),
    '🚫': ms('block'),
    '🆘': ms('sos'),
    '🆕': ms('fiber_new'),

    // ── Checks / marcações ─────────────────────────────────────────
    '✓': ms('check'),
    '✗': ms('close'),
    '✏': ms('edit'),
    '✏️': ms('edit'),

    // ── Círculos coloridos (status) ────────────────────────────────
    '🟢': `<span class="material-symbols-outlined" style="color:#28c76f">circle</span>`,
    '🟡': `<span class="material-symbols-outlined" style="color:#ffd643">circle</span>`,
    '🔴': `<span class="material-symbols-outlined" style="color:#ea5455">circle</span>`,
    '🔵': `<span class="material-symbols-outlined" style="color:#7367f0">circle</span>`,
    '⚫': `<span class="material-symbols-outlined" style="color:#6e6b7b">circle</span>`,

    // ── Documentação / arquivos ────────────────────────────────────
    '📄': ms('description'),
    '📝': ms('edit_note'),
    '📋': ms('assignment'),
    '📖': ms('menu_book'),
    '📘': ms('book'),
    '📚': ms('library_books'),
    '📁': ms('folder'),
    '📂': ms('folder_open'),
    '🗂': ms('folder_copy'),
    '📌': ms('push_pin'),
    '📍': ms('location_on'),
    '📎': ms('attach_file'),
    '📐': ms('architecture'),
    '📦': ms('inventory_2'),
    '💾': ms('save'),
    '🗄': ms('storage'),

    // ── Comunicação ────────────────────────────────────────────────
    '📧': ms('email'),
    '📞': ms('phone'),
    '💬': ms('chat'),
    '💭': ms('chat_bubble'),
    '📢': ms('campaign'),
    '📡': ms('wifi'),
    '📱': ms('smartphone'),
    '📴': ms('mobile_off'),

    // ── Mídia / visualização ───────────────────────────────────────
    '📷': ms('photo_camera'),
    '📸': ms('photo_camera'),
    '🎬': ms('movie_creation'),
    '🎨': ms('palette'),
    '👀': ms('visibility'),
    '👁': ms('visibility'),
    '👁️': ms('visibility'),

    // ── Calendário / tempo ─────────────────────────────────────────
    '📅': ms('calendar_today'),
    '🗓': ms('calendar_month'),
    '📈': ms('trending_up'),
    '📊': ms('bar_chart'),

    // ── Pessoas / usuários ─────────────────────────────────────────
    '👤': ms('person'),
    '👥': ms('group'),
    '👨': ms('person'),
    '👪': ms('family_restroom'),
    '👔': ms('business_center'),
    '👋': ms('waving_hand'),
    '👍': ms('thumb_up'),
    '👎': ms('thumb_down'),
    '👉': ms('arrow_forward'),

    // ── Educação / academia ────────────────────────────────────────
    '🎓': ms('school'),
    '🏫': ms('school'),
    '🧠': ms('psychology'),
    '🧪': ms('science'),
    '🎯': ms('track_changes'),
    '🏆': ms('emoji_events'),
    '🏅': ms('military_tech'),
    '🎖': ms('military_tech'),
    '🥇': ms('workspace_premium'),
    '🥈': ms('workspace_premium'),
    '🥉': ms('workspace_premium'),

    // ── Tecnologia / dev ───────────────────────────────────────────
    '🔍': ms('search'),
    '🔑': ms('key'),
    '🔐': ms('lock'),
    '🔒': ms('lock'),
    '🔓': ms('lock_open'),
    '🔔': ms('notifications'),
    '🔗': ms('link'),
    '🔌': ms('power'),
    '🔄': ms('sync'),
    '🔀': ms('shuffle'),
    '🔢': ms('pin'),
    '🔲': ms('crop_square'),
    '🛠': ms('handyman'),
    '🛠️': ms('handyman'),
    '🖊': ms('edit'),
    '🖱': ms('mouse'),
    '💻': ms('laptop'),
    '🤖': ms('smart_toy'),
    '🧩': ms('extension'),
    '🗺': ms('map'),
    '🛣': ms('route'),

    // ── Negócio / produto ──────────────────────────────────────────
    '💡': ms('lightbulb'),
    '💰': ms('payments'),
    '💼': ms('work'),
    '💪': ms('fitness_center'),
    '🏗': ms('construction'),
    '🏗️': ms('construction'),
    '🚀': ms('rocket_launch'),
    '🌐': ms('language'),
    '🌍': ms('public'),
    '🧭': ms('explore'),
    '🤝': ms('handshake'),
    '🎉': ms('celebration'),
    '🎊': ms('celebration'),
    '🏁': ms('flag'),
    '🏠': ms('home'),
    '🛡': ms('shield'),
    '🛡️': ms('shield'),
    '⚙': ms('settings'),
    '⚙️': ms('settings'),
    '⚖': ms('balance'),
    '⚖️': ms('balance'),
    '⚡': ms('bolt'),
    '☁': ms('cloud'),
    '☁️': ms('cloud'),
    '♿': ms('accessible'),
    '📥': ms('inbox'),
    '🗓️': ms('calendar_month'),
    '🕹': ms('sports_esports'),
    '🎮': ms('sports_esports'),
    '🎭': ms('theater_comedy'),
    '🐙': ms('extension'),
    '😓': ms('sentiment_dissatisfied'),
    '🚦': ms('traffic'),
    '🤔': ms('help'),
    '🥽': ms('visibility'),
    '🧪': ms('science'),

    // ── Emoji variation selector (invisível, remover) ──────────────
    '\uFE0F': '',
};

// Caracteres que NÃO devem ser substituídos (box drawing, math)
const KEEP_CHARS = new Set([
    '─', '│', '┌', '┐', '└', '┘', '├', '┤', '←', '→', '↑', '↓', '↔',
    '≤', '≥', '°',
]);

function getFiles(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];
    for (const item of items) {
        const full = path.join(dir, item.name);
        if (item.isDirectory()) files = files.concat(getFiles(full));
        else if (item.name.endsWith('.md')) files.push(full);
    }
    return files;
}

function replaceEmojis(content) {
    let result = content;
    let replacements = 0;

    // Ordenar pelos maiores primeiro para evitar substituições parciais
    const sortedKeys = Object.keys(EMOJI_MAP).sort((a, b) => b.length - a.length);

    for (const emoji of sortedKeys) {
        if (KEEP_CHARS.has(emoji)) continue;
        const replacement = EMOJI_MAP[emoji];
        const regex = new RegExp(emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const before = result.length;
        result = result.replace(regex, replacement);
        if (result.length !== before) replacements++;
    }

    return { content: result, replacements };
}

// ── Main ───────────────────────────────────────────────────────────────────

const files = getFiles(DOCS_DIR);
let totalFiles = 0;
let totalReplacements = 0;

for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    const { content, replacements } = replaceEmojis(original);

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        const rel = path.relative(DOCS_DIR, file);
        console.log(`✔ ${rel} (${replacements} tipos)`);
        totalFiles++;
        totalReplacements += replacements;
    }
}

console.log(`\nConcluído: ${totalFiles} arquivos / ${totalReplacements} tipos de emoji substituídos.`);
