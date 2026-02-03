const fs = require('fs');
const path = require('path');

const files = [
  'screenshots/prof-001-books-grid-as-is.png',
  'screenshots/prof-001-book-card-detail.png',
  'screenshots/prof-001-missions-destination.png',
  'screenshots/prof-002-mission-list-as-is.png',
  'screenshots/prof-002-mission-row-detail.png',
  'screenshots/prof-002-enable-modal.png',
  'screenshots/prof-002-details-modal.png',
  'mockups/prof-001-books-grid-to-be.png',
  'mockups/prof-001-quick-actions-menu.png',
  'mockups/prof-001-hover-tooltip.png',
  'mockups/prof-002-sequence-view.png',
  'mockups/prof-002-list-with-checkboxes.png',
  'mockups/prof-002-actions-dropdown.png',
  'mockups/prof-002-batch-enable-modal.png'
];

files.forEach(f => {
  const fp = path.join('static', 'img', f);
  const fileName = path.basename(f);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
    <rect width="100%" height="100%" fill="#f0f0f0"/>
    <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#999" text-anchor="middle" dominant-baseline="middle">
      Placeholder: ${fileName}
    </text>
  </svg>`;
  
  const buf = Buffer.from(svg);
  fs.writeFileSync(fp, buf);
  console.log(`✓ Criado: ${fp}`);
});

console.log(`\n✅ Total: ${files.length} placeholders criados com sucesso!`);
