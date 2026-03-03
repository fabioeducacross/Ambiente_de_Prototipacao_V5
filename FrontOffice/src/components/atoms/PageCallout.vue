<script setup>
/**
 * PageCallout — faixa informativa persistente de nível de página.
 *
 * Equivalente ao Carbon "Callout": carrega com o conteúdo, sem botão fechar.
 * Para contexto de drawer usar `.drawer-hint` (componente de classe CSS).
 *
 * Props:
 *   variant  — 'primary' | 'info' | 'warning' | 'neutral'  (default: 'primary')
 *   icon     — nome do Material Symbol                       (default: 'info')
 *   title    — título opcional acima do conteúdo
 *
 * Slot padrão: conteúdo da mensagem (texto ou HTML simples).
 *
 * Exemplos:
 *   <PageCallout>Você pode criar até 40 missões por mês.</PageCallout>
 *   <PageCallout variant="warning" icon="warning" title="Atenção">
 *     Limite próximo — você já criou 35 missões este mês.
 *   </PageCallout>
 */
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'info', 'warning', 'neutral'].includes(v),
  },
  icon: {
    type: String,
    default: 'info',
  },
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="page-callout" :class="`page-callout--${variant}`" role="note">
    <span class="material-symbols-outlined page-callout-icon">{{ icon }}</span>
    <div class="page-callout-body">
      <p v-if="title" class="page-callout-title">{{ title }}</p>
      <div class="page-callout-text"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
/* ── Base ─────────────────────────────────────────────────────────────────── */
.page-callout {
  --callout-color: var(--primary);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 0 8px 8px 0;
  border-left: 4px solid var(--callout-color);
  background: color-mix(in srgb, var(--callout-color) 10%, transparent);
}

.page-callout-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--callout-color);
}

.page-callout-body {
  flex: 1;
  min-width: 0;
}

.page-callout-title {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 700;
  color: var(--callout-color);
  line-height: 1.4;
}

.page-callout-text {
  font-size: 13px;
  font-weight: 500;
  color: var(--callout-color);
  line-height: 1.55;
}

/* ── Variantes ───────────────────────────────────────────────────────────── */
.page-callout--primary  { --callout-color: var(--primary); }
.page-callout--info     { --callout-color: var(--info);    }
.page-callout--warning  { --callout-color: var(--warning); }
.page-callout--neutral  {
  --callout-color: #6b7280;
  background: color-mix(in srgb, #6b7280 8%, transparent);
}
</style>
