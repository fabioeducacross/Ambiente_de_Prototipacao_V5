# Implementation Plan - Icon Migration

## User Input
"Trocar os ícones atuais que são emojis para os picones que temos no frontoffice."

## Technical Context
- **Source**: `educacross-frontoffice` (Ambiente V4)
  - `src/assets/icons/`
  - `src/assets/images/icons/`
- **Target**: `Ambiente_de_Prototipacao_V5` (Docusaurus)
  - `static/img/icons/`
  - Markdown files in `docs/`
  - `sidebars.ts`

**Unknowns**:
- Exact mapping for "Gestor de Rede" and "Diretor" icons within available assets.
- Choice between embedding SVGs or using `<img>` tags in Markdown.

## Phase 0: Research

### Asset Inventory (Frontoffice)
We identified the following suitable assets in the legacy codebase:

| Role | Legacy Asset | Path |
|------|--------------|------|
| **Professor** | `classroom.svg` | `src/assets/icons/classroom.svg` |
| **Aluno** | `studant-hat.svg` | `src/assets/images/icons/studant-hat.svg` |
| **Administrador** | `toolbox.svg` | `src/assets/images/icons/toolbox.svg` |
| **Coordenador** | `open-book.svg` | `src/assets/images/icons/open-book.svg` |
| **Diretor** | `star-badge.svg` | `src/assets/images/icons/star-badge.svg` |
| **Gestor de Rede** | `internet.png` (or `google.svg`) | `src/assets/images/icons/` (Recommend converting or finding better SVG) |
| **Auditor** | `warning.svg` | `src/assets/icons/warning.svg` |

### Implementation Strategy
1.  **Extraction**: Copy selected assets from V4 to V5 `static/img/icons`.
2.  **Conversion**: Ensure all are SVG for consistency (if possible).
3.  **Reference**:
    - Update `sidebars.ts` labels (remove emojis).
    - Update Headers in `.md` files (Profile pages).
    - Update Catalog tables.

## Phase 1: Design & Execution

### 1. File Structure
Create directory: `static/img/icons/`

### 2. Asset Mapping
| Current Emoji | Target File |
|---------------|-------------|
| 👨‍🏫 | `teacher.svg` (renamed from `classroom.svg`) |
| 👨‍🎓 | `student.svg` (renamed from `studant-hat.svg`) |
| 🛠️ | `admin.svg` (renamed from `toolbox.svg`) |
| 👩‍🏫 | `coordinator.svg` (renamed from `open-book.svg`) |
| 👔 | `director.svg` (renamed from `star-badge.svg`) |
| 🌐 | `network.svg` (Placeholder/Generic) |
| 🔍 | `auditor.svg` (renamed from `warning.svg`) |

### 3. Syntax for Markdown
Replace:
`# 👨‍🏫 Professor`
With:
`# <img src="/img/icons/teacher.svg" width="32" class="icon-title" /> Professor`

### 4. Tasks
- [ ] Create `static/img/icons` folder.
- [ ] Copy and Rename assets from Frontoffice.
- [ ] Batch replace text in `.md` files.
- [ ] Update `sidebars.ts` (Note: Docusaurus sidebars don't support images natively in labels without custom rendering, might need to keep text-only or use CSS).
  - *Decision*: Remove emojis from Sidebars, keep text clean. Icon only in page content.

## Constitution Check
- **No Backend**: Pure static assets.
- **Consistency**: Matches V4 visual identity.

