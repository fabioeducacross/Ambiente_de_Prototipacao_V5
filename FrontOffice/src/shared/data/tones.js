/**
 * tones.js — Banco de tons do protótipo Educacross
 *
 * Fonte canônica de todas as escalas semafóricas exibidas em gráficos,
 * barras de progresso, badges e legends ao longo dos protótipos.
 *
 * Regras extraídas de:
 *   - participationEnum.js  → PROGRESSO_TONES
 *   - performanceEnum.js    → RENDIMENTO_TONES
 *
 * Uso:
 *   import { getProgressoTone, getRendimentoTone, PROGRESSO_TONES, RENDIMENTO_TONES } from '@/shared/data/tones.js'
 */

// ─── PROGRESSO (Participação / Conclusão) ─────────────────────────────────────
//  Baseado em % de conclusão da missão/atividade
export const PROGRESSO_TONES = [
  {
    key:      'finalizado',
    label:    'Finalizado',
    threshold: 100,
    desc:     '≥ 100%',
    colorVar: 'var(--success)',
    hexColor: '#14693a',
  },
  {
    key:      'satisfatorio',
    label:    'Satisfatório',
    threshold: 80,
    desc:     '≥ 80%',
    colorVar: 'var(--success)',
    hexColor: '#28c76f',
  },
  {
    key:      'moderado',
    label:    'Moderado',
    threshold: 50,
    desc:     '≥ 50%',
    colorVar: 'var(--warning)',
    hexColor: '#ff9f43',
  },
  {
    key:      'critico',
    label:    'Crítico',
    threshold: 0,
    desc:     '< 50%',
    colorVar: 'var(--danger)',
    hexColor: '#ea5455',
  },
]

// ─── RENDIMENTO (Acertos / Accuracy) ─────────────────────────────────────────
//  Baseado em % de acertos (rendimento por missão, mídia, turma, etc.)
export const RENDIMENTO_TONES = [
  {
    key:      'avancado',
    label:    'Avançado',
    threshold: 75,
    desc:     '≥ 75% de acertos',
    colorVar: 'var(--primary)',
    hexColor: '#7367f0',
  },
  {
    key:      'proficiente',
    label:    'Proficiente',
    threshold: 50,
    desc:     '≥ 50% de acertos',
    colorVar: 'var(--success)',
    hexColor: '#28c76f',
  },
  {
    key:      'basico',
    label:    'Básico',
    threshold: 25,
    desc:     '≥ 25% de acertos',
    colorVar: 'var(--warning)',
    hexColor: '#ff9f43',
  },
  {
    key:      'abaixo_basico',
    label:    'Abaixo do Básico',
    threshold: 0,
    desc:     '< 25% de acertos',
    colorVar: 'var(--danger)',
    hexColor: '#ea5455',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Retorna o tom de progresso correspondente ao valor (%).
 * Os tons estão em ordem decrescente de threshold; o primeiro que satisfaz
 * value >= threshold é retornado.
 */
export function getProgressoTone(value) {
  return PROGRESSO_TONES.find(t => value >= t.threshold) ?? PROGRESSO_TONES.at(-1)
}

/**
 * Retorna o tom de rendimento correspondente ao valor (%).
 * Retorna null se o valor for null/undefined (dado ainda não disponível).
 */
export function getRendimentoTone(value) {
  if (value === null || value === undefined) return null
  return RENDIMENTO_TONES.find(t => value >= t.threshold) ?? RENDIMENTO_TONES.at(-1)
}
