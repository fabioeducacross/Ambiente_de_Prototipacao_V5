import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.join(__dirname, '../docs');

function getFiles(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
        e.isDirectory() ? getFiles(path.join(dir, e.name)) :
            e.name.endsWith('.md') ? [path.join(dir, e.name)] : []
    );
}

// Substitui style="color:..." por classes CSS
const fixes = [
    ['style="color:#28c76f"', 'class="ms-success"'],
    ['style="color:#ffd643"', 'class="ms-warning"'],
    ['style="color:#ea5455"', 'class="ms-danger"'],
    ['style="color:#7367f0"', 'class="ms-primary"'],
    ['style="color:#6e6b7b"', 'class="ms-muted"'],
];

let count = 0;
for (const f of getFiles(DOCS_DIR)) {
    let c = fs.readFileSync(f, 'utf8');
    let changed = false;
    for (const [from, to] of fixes) {
        if (c.includes(from)) {
            c = c.replaceAll(from, to);
            changed = true;
        }
    }
    if (changed) {
        fs.writeFileSync(f, c, 'utf8');
        console.log('Fixed:', path.relative(DOCS_DIR, f));
        count++;
    }
}

console.log('\nTotal files fixed:', count);
