/**
 * capture-screenshots.mjs
 * Captura screenshots do FrontOffice prototype (localhost:5174)
 * e salva em documentation/static/img/screenshots/
 *
 * Uso: node capture-screenshots.mjs
 * Requisito: FrontOffice rodando em http://localhost:5174
 */

import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.resolve(__dirname, '../documentation/static/img/screenshots');
const BASE_URL = 'http://localhost:5174';
const VIEWPORT = { width: 1440, height: 900 };
const LOAD_WAIT = 2000; // ms after networkidle

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function tryClick(page, selectors) {
  for (const sel of Array.isArray(selectors) ? selectors : [selectors]) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 3000 })) {
        await el.click();
        await page.waitForTimeout(800);
        return true;
      }
    } catch (_) { }
  }
  return false;
}

async function tryClickText(page, texts) {
  for (const text of Array.isArray(texts) ? texts : [texts]) {
    try {
      const el = page.getByText(text, { exact: false }).first();
      if (await el.isVisible({ timeout: 3000 })) {
        await el.click();
        await page.waitForTimeout(800);
        return true;
      }
    } catch (_) { }
  }
  return false;
}

async function waitAndShot(page, file) {
  await page.waitForTimeout(LOAD_WAIT);
  const dest = path.join(SCREENSHOTS_DIR, file);
  await page.screenshot({ path: dest, fullPage: false });
  console.log(`  ✓ ${file}`);
}

// ─── Mapeamento: arquivo → rota + ação ───────────────────────────────────────

const shots = [

  // ── PROF-001: Sistema de Ensino / Livros (/professor/trilhas-az) ─────────
  {
    file: 'prof-001-books-grid-as-is.png',
    url: '/professor/trilhas-az',
  },
  {
    file: 'prof-001-book-card-detail.png',
    url: '/professor/trilhas-az',
    after: async (page) => {
      await tryClick(page, ['.book-card', '.livro-card', '.card', '[class*="book"]']);
    },
  },
  {
    file: 'prof-001-missions-destination.png',
    url: '/professor/trilhas-az',
    after: async (page) => {
      await tryClickText(page, ['Ver missões', 'Missões', 'Destino']);
    },
  },

  // ── PROF-002: Lista de Missões (/professor/missoes) ──────────────────────
  {
    file: 'prof-002-mission-list-as-is.png',
    url: '/professor/missoes',
  },
  {
    file: 'prof-002-mission-row-detail.png',
    url: '/professor/missoes',
    after: async (page) => {
      await tryClick(page, ['tbody tr:first-child', '.mission-row:first-child', '.table tr:nth-child(2)']);
    },
  },
  {
    file: 'prof-002-details-modal.png',
    url: '/professor/missoes',
    after: async (page) => {
      await tryClickText(page, ['Detalhes', 'Ver detalhes', 'Visualizar']);
      await page.waitForTimeout(500);
    },
  },
  {
    file: 'prof-002-enable-modal.png',
    url: '/professor/missoes',
    after: async (page) => {
      await tryClickText(page, ['Habilitar', 'Ativar', 'Reativar']);
      await page.waitForTimeout(500);
    },
  },

  // ── PROF-003: Criar Missão / Wizard (/professor/missoes/criar) ────────────
  {
    file: 'prof-003-missions-list-as-is.png',
    url: '/professor/missoes',
  },
  {
    file: 'prof-003-wizard-step1.png',
    url: '/professor/missoes/criar',
  },
  {
    file: 'prof-003-question-bank-modal.png',
    url: '/professor/missoes/criar',
    after: async (page) => {
      await tryClickText(page, ['Banco de questões', 'Banco de Questões', 'Questões', 'Adicionar questão']);
      await page.waitForTimeout(500);
    },
  },
  {
    file: 'prof-003-question-editor.png',
    url: '/professor/missoes/criar',
    after: async (page) => {
      await tryClickText(page, ['Nova questão', 'Criar questão', 'Editor', 'Editar questão']);
      await page.waitForTimeout(500);
    },
  },
  {
    file: 'prof-003-wizard-review.png',
    url: '/professor/missoes/criar',
    after: async (page) => {
      await tryClickText(page, ['Revisar', 'Revisão', 'Confirmar', 'Próximo', 'Avançar']);
      await page.waitForTimeout(500);
    },
  },

  // ── PROF-004: Eventos / Olimpíadas (/professor/eventos/olimpiadas) ─────────
  {
    file: 'prof-004-events-list-as-is.png',
    url: '/professor/eventos/olimpiadas',
  },
  {
    file: 'prof-004-event-card-detail.png',
    url: '/professor/eventos/olimpiadas',
    after: async (page) => {
      await tryClick(page, ['.event-card:first-child', '.card:first-child', '[class*="event"]:first-child']);
    },
  },
  {
    file: 'prof-004-details-participation.png',
    url: '/professor/eventos/olimpiadas',
    after: async (page) => {
      await tryClickText(page, ['Participação', 'Participantes']);
    },
  },
  {
    file: 'prof-004-details-questions.png',
    url: '/professor/eventos/olimpiadas',
    after: async (page) => {
      await tryClickText(page, ['Questões', 'Perguntas']);
    },
  },
  {
    file: 'prof-004-enable-modal.png',
    url: '/professor/eventos/olimpiadas',
    after: async (page) => {
      await tryClickText(page, ['Habilitar', 'Ativar', 'Iniciar']);
      await page.waitForTimeout(500);
    },
  },

  // ── PROF-005: Diário de Classe / Alunos (/professor/alunos) ──────────────
  {
    file: 'prof-005-students-grid-as-is.png',
    url: '/professor/alunos',
  },
  {
    file: 'prof-005-students-table-as-is.png',
    url: '/professor/alunos',
    after: async (page) => {
      await tryClick(page, [
        'button[title*="tabela"], button[title*="lista"], [class*="list-view"], [class*="table-view"]',
        '.btn-group button:nth-child(2)',
      ]);
    },
  },
  {
    file: 'prof-005-student-overview-as-is.png',
    url: '/professor/alunos',
    after: async (page) => {
      await tryClick(page, ['tbody tr:first-child', '.student-card:first-child', '.card:first-child']);
    },
  },
  {
    file: 'prof-005-student-performance-as-is.png',
    url: '/professor/alunos',
    after: async (page) => {
      await tryClick(page, ['tbody tr:first-child', '.student-card:first-child']);
      await page.waitForTimeout(600);
      await tryClickText(page, ['Desempenho', 'Performance']);
    },
  },
  {
    file: 'prof-005-student-notes-as-is.png',
    url: '/professor/alunos',
    after: async (page) => {
      await tryClick(page, ['tbody tr:first-child', '.student-card:first-child']);
      await page.waitForTimeout(600);
      await tryClickText(page, ['Anotações', 'Notas', 'Observações']);
    },
  },
  {
    file: 'prof-005-add-note-modal-as-is.png',
    url: '/professor/alunos',
    after: async (page) => {
      await tryClick(page, ['tbody tr:first-child', '.student-card:first-child']);
      await page.waitForTimeout(600);
      await tryClickText(page, ['Anotações', 'Notas']);
      await page.waitForTimeout(400);
      await tryClickText(page, ['Adicionar anotação', 'Nova anotação', '+ Anotação']);
      await page.waitForTimeout(500);
    },
  },
  {
    file: 'prof-005-export-modal-as-is.png',
    url: '/professor/alunos',
    after: async (page) => {
      await tryClickText(page, ['Exportar', 'Export']);
      await page.waitForTimeout(500);
    },
  },

  // ── PROF-006: Turmas (/professor/turmas) ──────────────────────────────────
  {
    file: 'prof-006-classes-list-as-is.png',
    url: '/professor/turmas',
  },
  {
    file: 'prof-006-classes-compare-as-is.png',
    url: '/professor/turmas',
    after: async (page) => {
      await tryClickText(page, ['Comparar', 'Comparativo', 'Compare']);
    },
  },
  {
    file: 'prof-006-dashboard-overview-as-is.png',
    url: '/professor/turmas',
    after: async (page) => {
      await tryClick(page, ['tbody tr:first-child', '.class-card:first-child', '.turma-card:first-child']);
    },
  },
  {
    file: 'prof-006-dashboard-evolution-as-is.png',
    url: '/professor/turmas',
    after: async (page) => {
      await tryClick(page, ['tbody tr:first-child', '.class-card:first-child']);
      await page.waitForTimeout(600);
      await tryClickText(page, ['Evolução', 'Evolution', 'Evolucao']);
    },
  },
  {
    file: 'prof-006-dashboard-distribution-as-is.png',
    url: '/professor/turmas',
    after: async (page) => {
      await tryClick(page, ['tbody tr:first-child', '.class-card:first-child']);
      await page.waitForTimeout(600);
      await tryClickText(page, ['Distribuição', 'Distribuicao']);
    },
  },
  {
    file: 'prof-006-dashboard-skills-as-is.png',
    url: '/professor/turmas',
    after: async (page) => {
      await tryClick(page, ['tbody tr:first-child', '.class-card:first-child']);
      await page.waitForTimeout(600);
      await tryClickText(page, ['Habilidades', 'Skills']);
    },
  },

  // ── PROF-007: Análise de Missões (/professor/missoes → detalhe) ────────────
  {
    file: 'prof-007-dashboard-as-is.png',
    url: '/professor/missoes',
    after: async (page) => {
      // Tenta abrir detalhes de uma missão
      await tryClickText(page, ['Detalhes', 'Analisar', 'Ver analytics']);
    },
  },
  {
    file: 'prof-007-questions-as-is.png',
    url: '/professor/missoes',
    after: async (page) => {
      await tryClickText(page, ['Detalhes', 'Analisar']);
      await page.waitForTimeout(500);
      await tryClickText(page, ['Questões', 'Questions']);
    },
  },
  {
    file: 'prof-007-question-analysis-as-is.png',
    url: '/professor/missoes',
    after: async (page) => {
      await tryClickText(page, ['Detalhes', 'Analisar']);
      await page.waitForTimeout(500);
      await tryClickText(page, ['Questões']);
      await page.waitForTimeout(400);
      await tryClick(page, ['.question-card:first-child', '[class*="question"]:first-child']);
    },
  },

  // ── PROF-008: Dashboard Professor (alertas / timeline) ────────────────────
  {
    file: 'prof-008-dashboard-as-is.png',
    url: '/professor',
  },
  {
    file: 'prof-008-alerts-as-is.png',
    url: '/professor',
    after: async (page) => {
      await tryClickText(page, ['Alertas', 'Notificações', 'Avisos']);
    },
  },
  {
    file: 'prof-008-timeline-as-is.png',
    url: '/professor',
    after: async (page) => {
      await tryClickText(page, ['Timeline', 'Atividades recentes', 'Histórico']);
    },
  },

  // ── PROF-009: Planejamento Colaborativo (sem rota dedicada → /professor) ──
  {
    file: 'prof-009-workspaces-as-is.png',
    url: '/professor',
    after: async (page) => {
      await tryClickText(page, ['Planejamento', 'Workspaces', 'Colaborativo']);
    },
  },
  {
    file: 'prof-009-editor-as-is.png',
    url: '/professor',
    after: async (page) => {
      await tryClickText(page, ['Editor', 'Plano', 'Abrir workspace']);
    },
  },

  // ── PROF-010: Comunicação com Responsáveis (sem rota dedicada → /professor)
  {
    file: 'prof-010-conversations-as-is.png',
    url: '/professor',
    after: async (page) => {
      await tryClickText(page, ['Mensagens', 'Comunicação', 'Responsáveis', 'Conversas']);
    },
  },
  {
    file: 'prof-010-chat-as-is.png',
    url: '/professor',
    after: async (page) => {
      await tryClickText(page, ['Chat', 'Mensagens', 'Conversar']);
    },
  },

  // ── PROF-011: Desenvolvimento Profissional (sem rota dedicada → /professor)
  {
    file: 'prof-011-dashboard-as-is.png',
    url: '/professor',
    after: async (page) => {
      await tryClickText(page, ['Formação', 'Desenvolvimento', 'Cursos']);
    },
  },
  {
    file: 'prof-011-courses-as-is.png',
    url: '/professor',
    after: async (page) => {
      await tryClickText(page, ['Cursos', 'Biblioteca de cursos', 'Ver cursos']);
    },
  },

  // ── STUDENT-001: Dashboard (/student) ──────────────────────────────────────
  {
    file: 'student-001-dashboard-hero.png',
    url: '/student',
  },
  {
    file: 'student-001-missions-cards.png',
    url: '/student',
    after: async (page) => {
      // Scroll down para ver os cards de missão
      await page.evaluate(() => window.scrollBy(0, 400));
    },
  },

  // ── STUDENT-002: Trilha de Aprendizado (/student) ─────────────────────────
  {
    file: 'student-002-mission-map-as-is.png',
    url: '/student',
    after: async (page) => {
      await tryClickText(page, ['Trilha', 'Mapa', 'Missões']);
    },
  },
  {
    file: 'student-002-mission-detail-as-is.png',
    url: '/student',
    after: async (page) => {
      await tryClick(page, ['.mission-node:first-child', '[class*="mission"]:first-child', '.card:first-child']);
    },
  },
  {
    file: 'student-002-exercise-as-is.png',
    url: '/student',
    after: async (page) => {
      await tryClickText(page, ['Iniciar', 'Continuar', 'Começar missão']);
    },
  },
  {
    file: 'student-002-feedback-correct-as-is.png',
    url: '/student',
    after: async (page) => {
      await tryClickText(page, ['Iniciar']);
      await page.waitForTimeout(500);
      await tryClick(page, ['.option:first-child', '.answer-option:first-child', 'label:first-child']);
      await page.waitForTimeout(300);
      await tryClickText(page, ['Confirmar', 'Responder', 'Enviar']);
    },
  },
  {
    file: 'student-002-feedback-incorrect-as-is.png',
    url: '/student',
  },
  {
    file: 'student-002-mission-complete-as-is.png',
    url: '/student',
    after: async (page) => {
      await tryClickText(page, ['Missão concluída', 'Concluído', 'Finalizado']);
    },
  },
  {
    file: 'student-002-level-up-as-is.png',
    url: '/student',
    after: async (page) => {
      await tryClickText(page, ['Level up', 'Novo nível', 'Subiu de nível']);
    },
  },
  {
    file: 'student-002-profile-as-is.png',
    url: '/student',
    after: async (page) => {
      await tryClickText(page, ['Perfil', 'Profile', 'Meu perfil']);
    },
  },

  // ── STUDENT-003: Jogos (/student) ─────────────────────────────────────────
  {
    file: 'student-003-games-grid-as-is.png',
    url: '/student',
    after: async (page) => {
      await tryClickText(page, ['Jogos', 'Games', 'Ilha dos Desafios']);
    },
  },
  {
    file: 'student-003-game-detail-as-is.png',
    url: '/student',
    after: async (page) => {
      await tryClickText(page, ['Jogos', 'Games']);
      await page.waitForTimeout(500);
      await tryClick(page, ['.game-card:first-child', '[class*="game"]:first-child']);
    },
  },
  {
    file: 'student-003-game-playing-as-is.png',
    url: '/student',
    after: async (page) => {
      await tryClickText(page, ['Jogar', 'Iniciar jogo', 'Play']);
    },
  },
  {
    file: 'student-003-achievements-as-is.png',
    url: '/student',
    after: async (page) => {
      await tryClickText(page, ['Conquistas', 'Badges', 'Medalhas', 'Troféus']);
    },
  },

  // ── ADMIN-001: Relatório de Missões (/coordinator) ─────────────────────────
  {
    file: 'admin-001-dashboard-as-is.png',
    url: '/coordinator',
  },
  {
    file: 'admin-001-missions-list.png',
    url: '/coordinator',
    after: async (page) => {
      await tryClickText(page, ['Missões', 'Lista de missões', 'Missions']);
    },
  },
  {
    file: 'admin-001-mission-details.png',
    url: '/coordinator',
    after: async (page) => {
      await tryClickText(page, ['Detalhes', 'Ver detalhes']);
    },
  },
  {
    file: 'admin-001-questions-analysis.png',
    url: '/coordinator',
    after: async (page) => {
      await tryClickText(page, ['Questões', 'Análise de questões']);
    },
  },
  {
    file: 'admin-001-comparative-report.png',
    url: '/coordinator',
    after: async (page) => {
      await tryClickText(page, ['Comparativo', 'Comparar', 'Ranking']);
    },
  },

  // ── ADMIN-002: Acesso de Alunos (/director) ────────────────────────────────
  {
    file: 'admin-002-dashboard-as-is.png',
    url: '/director',
  },
  {
    file: 'admin-002-students-list-as-is.png',
    url: '/director',
    after: async (page) => {
      await tryClickText(page, ['Alunos', 'Lista de alunos', 'Acesso']);
    },
  },
  {
    file: 'admin-002-student-details-as-is.png',
    url: '/director',
    after: async (page) => {
      await tryClick(page, ['tbody tr:first-child', '.student-row:first-child']);
    },
  },
  {
    file: 'admin-002-inactive-list-as-is.png',
    url: '/director',
    after: async (page) => {
      await tryClickText(page, ['Inativos', 'Sem acesso', 'Ativos/Inativos']);
    },
  },
  {
    file: 'admin-002-correlation-as-is.png',
    url: '/director',
    after: async (page) => {
      await tryClickText(page, ['Correlação', 'Análise', 'Gráfico']);
    },
  },
  {
    file: 'admin-002-temporal-analysis-as-is.png',
    url: '/director',
    after: async (page) => {
      await tryClickText(page, ['Temporal', 'Evolução', 'Histórico']);
    },
  },

  // ── ADMIN-003: Relatório de Evidências (/professor/relatorios/evidencias) ─
  {
    file: 'admin-003-dashboard-as-is.png',
    url: '/professor/relatorios/evidencias',
  },
  {
    file: 'admin-003-gallery-grid-as-is.png',
    url: '/professor/relatorios/evidencias',
    after: async (page) => {
      await tryClickText(page, ['Galeria', 'Grid', 'Grade']);
    },
  },
  {
    file: 'admin-003-gallery-list-as-is.png',
    url: '/professor/relatorios/evidencias',
    after: async (page) => {
      await tryClickText(page, ['Lista', 'Tabela']);
    },
  },
  {
    file: 'admin-003-lightbox-as-is.png',
    url: '/professor/relatorios/evidencias',
    after: async (page) => {
      await tryClick(page, ['.evidence-item:first-child', '[class*="evidence"]:first-child', '.img-thumbnail:first-child']);
    },
  },
  {
    file: 'admin-003-participation-as-is.png',
    url: '/professor/relatorios/evidencias',
    after: async (page) => {
      await tryClickText(page, ['Participação', 'Participantes']);
    },
  },
  {
    file: 'admin-003-temporal-as-is.png',
    url: '/professor/relatorios/evidencias',
    after: async (page) => {
      await tryClickText(page, ['Temporal', 'Por período', 'Evolução']);
    },
  },

  // ── ADMIN-004: Relatório de Habilidades (/professor/relatorios/habilidades)
  {
    file: 'admin-004-dashboard-as-is.png',
    url: '/professor/relatorios/habilidades',
  },
  {
    file: 'admin-004-matrix-as-is.png',
    url: '/professor/relatorios/habilidades',
    after: async (page) => {
      await tryClickText(page, ['Matriz', 'Matrix']);
    },
  },
  {
    file: 'admin-004-heatmap-as-is.png',
    url: '/professor/relatorios/habilidades',
    after: async (page) => {
      await tryClickText(page, ['Heatmap', 'Mapa de calor', 'Calor']);
    },
  },
  {
    file: 'admin-004-student-profile-as-is.png',
    url: '/professor/relatorios/habilidades',
    after: async (page) => {
      await tryClickText(page, ['Perfil do aluno', 'Aluno', 'Detalhe']);
    },
  },
  {
    file: 'admin-004-gaps-as-is.png',
    url: '/professor/relatorios/habilidades',
    after: async (page) => {
      await tryClickText(page, ['Gaps', 'Lacunas', 'Defasagem']);
    },
  },
  {
    file: 'admin-004-comparative-as-is.png',
    url: '/professor/relatorios/habilidades',
    after: async (page) => {
      await tryClickText(page, ['Comparativo', 'Comparar']);
    },
  },

  // ── ADMIN-005: Gestor de Rede (/network-manager) ──────────────────────────
  {
    file: 'admin-005-dashboard-as-is.png',
    url: '/network-manager',
  },
  {
    file: 'admin-005-benchmarking-as-is.png',
    url: '/network-manager',
    after: async (page) => {
      await tryClickText(page, ['Benchmarking', 'Benchmark', 'Comparativo', 'Ranking']);
    },
  },

  // ── ADMIN-006: Administrador (/administrator) ──────────────────────────────
  {
    file: 'admin-006-dashboard-as-is.png',
    url: '/administrator',
  },
  {
    file: 'admin-006-permissions-as-is.png',
    url: '/administrator',
    after: async (page) => {
      await tryClickText(page, ['Permissões', 'RBAC', 'Perfis de acesso', 'Roles']);
    },
  },

  // ── AUDITOR-001: sem rota dedicada → /administrator ───────────────────────
  {
    file: 'auditor-001-dashboard-as-is.png',
    url: '/administrator',
  },
  {
    file: 'auditor-001-table-as-is.png',
    url: '/administrator',
    after: async (page) => {
      await tryClickText(page, ['Auditoria', 'Logs', 'Registros', 'Tabela']);
    },
  },
  {
    file: 'auditor-001-detail-as-is.png',
    url: '/administrator',
    after: async (page) => {
      await tryClick(page, ['tbody tr:first-child', '.log-row:first-child']);
    },
  },
  {
    file: 'auditor-001-export-as-is.png',
    url: '/administrator',
    after: async (page) => {
      await tryClickText(page, ['Exportar', 'Export', 'Download']);
      await page.waitForTimeout(500);
    },
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  console.log(`\n📸 Capturando ${shots.length} screenshots do FrontOffice`);
  console.log(`   Base URL : ${BASE_URL}`);
  console.log(`   Destino  : ${SCREENSHOTS_DIR}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  let ok = 0;
  let fail = 0;

  for (const shot of shots) {
    process.stdout.write(`→ ${shot.file} ... `);
    try {
      await page.goto(`${BASE_URL}${shot.url}`, {
        waitUntil: 'networkidle',
        timeout: 20000,
      });
      await page.waitForTimeout(LOAD_WAIT);

      if (shot.after) {
        await shot.after(page);
        await page.waitForTimeout(500);
      }

      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, shot.file),
        fullPage: false,
      });
      console.log('✓');
      ok++;
    } catch (err) {
      console.log(`✗ (${err.message.split('\n')[0]})`);
      fail++;
    }
  }

  await browser.close();

  console.log(`\n─────────────────────────────────────`);
  console.log(`  ✓ ${ok} capturados com sucesso`);
  if (fail > 0) console.log(`  ✗ ${fail} com erro`);
  console.log(`─────────────────────────────────────\n`);
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
