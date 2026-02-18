# Feature Flags - FrontOffice

Sistema de controle de features em desenvolvimento ou experimentais.

## Uso

```javascript
import { useFeatureFlags } from '@/composables/useFeatureFlags'

// Em um componente
const { isEnabled, showEventTime } = useFeatureFlags()

// Verificar se uma flag está habilitada
if (isEnabled('showEventTime')) {
  // Feature habilitada
}

// Ou usar atalho específico
if (showEventTime()) {
  // Feature habilitada
}
```

## Flags Disponíveis

### `showEventTime`
- **Status**: 🚧 Desabilitada (em desenvolvimento)
- **Descrição**: Controla a exibição de horários de eventos em todos os componentes do calendário
- **Componentes afetados**: 
  - `EventDrawer.vue` (drawer de visualização/edição)
  - `CalendarFigma.vue` (calendário principal)
  - `MonthViewGrid.vue` (visualização mensal)
  - `WeekViewGrid.vue` (visualização semanal)
  - `DayViewGrid.vue` (visualização diária)
  - `DateCellLarge.vue` (células de datas)
  - `WeekView.vue` (view alternativa semanal)
  - `DayView.vue` (view alternativa diária)
- **Motivo**: Feature em desenvolvimento, aguardando definição de formato de horário e validações

**Para habilitar:**
```javascript
const { enableFeature } = useFeatureFlags()
enableFeature('showEventTime')
```

**No template:**
```vue
<div v-if="showEventTime() && hasTime">
  <span>{{ formattedTime }}</span>
</div>
```

## API do Composable

### `isEnabled(flagName: string): boolean`
Verifica se uma feature flag está habilitada.

```javascript
const { isEnabled } = useFeatureFlags()
if (isEnabled('showEventTime')) {
  // ...
}
```

### `enableFeature(flagName: string): void`
Habilita uma feature flag.

```javascript
const { enableFeature } = useFeatureFlags()
enableFeature('showEventTime')
```

### `disableFeature(flagName: string): void`
Desabilita uma feature flag.

```javascript
const { disableFeature } = useFeatureFlags()
disableFeature('showEventTime')
```

### `toggleFeature(flagName: string): void`
Alterna o estado de uma feature flag.

```javascript
const { toggleFeature } = useFeatureFlags()
toggleFeature('showEventTime')
```

### `getAllFlags(): Readonly<Object>`
Retorna todas as flags (somente leitura).

```javascript
const { getAllFlags } = useFeatureFlags()
const flags = getAllFlags()
console.log(flags.value)
```

## Adicionando Novas Flags

Edite o arquivo `src/composables/useFeatureFlags.js`:

```javascript
const featureFlags = ref({
  showEventTime: false,
  
  // Nova flag
  enableNotifications: true,
  enableDarkMode: false,
})

// Adicionar atalho (opcional)
return {
  // ...
  enableNotifications: () => isEnabled('enableNotifications'),
}
```

## Boas Práticas

### ✅ Quando Usar Feature Flags

- **Features em desenvolvimento**: Código pronto mas aguardando validação
- **Testes A/B**: Testar variantes de funcionalidades
- **Releases graduais**: Habilitar features progressivamente
- **Dependências externas**: Features que dependem de APIs não finalizadas
- **Experimentação**: Testar hipóteses sem afetar produção

### ❌ Quando NÃO Usar

- **Código incompleto**: Não commitar código quebrado escondido por flag
- **Dívida técnica**: Limpar flags antigas após release definitivo
- **Lógica de negócio**: Usar permissões/roles para controle de acesso

### ⚠️ Manutenção

1. **Revisar flags periodicamente** - Remover flags de features já liberadas
2. **Documentar sempre** - Explicar motivo e prazo de cada flag
3. **Testar ambos estados** - Validar comportamento com flag ON e OFF
4. **Limpar após release** - Remover flag e condicionais quando feature for definitiva

## Exemplos Práticos

### Feature em Desenvolvimento
```vue
<template>
  <div>
    <!-- Feature estável -->
    <EventTitle :event="event" />
    
    <!-- Feature em desenvolvimento (OFF por padrão) -->
    <EventTime v-if="showEventTime()" :event="event" />
  </div>
</template>

<script setup>
import { useFeatureFlags } from '@/composables/useFeatureFlags'
const { showEventTime } = useFeatureFlags()
</script>
```

### Habilitação Condicional
```vue
<script setup>
import { useFeatureFlags } from '@/composables/useFeatureFlags'
import { useCurrentUser } from '@/composables/useCurrentUser'

const { enableFeature } = useFeatureFlags()
const { user } = useCurrentUser()

// Habilitar apenas para admins
if (user.value?.role === 'admin') {
  enableFeature('showEventTime')
}
</script>
```

### DevTools / Debug Panel
```vue
<!-- Developer Tools Panel -->
<template>
  <div v-if="isDev" class="dev-tools">
    <h3>Feature Flags</h3>
    <div v-for="(value, key) in flags" :key="key">
      <label>
        <input 
          type="checkbox" 
          :checked="value"
          @change="toggleFeature(key)"
        />
        {{ key }}
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFeatureFlags } from '@/composables/useFeatureFlags'

const isDev = import.meta.env.DEV
const { getAllFlags, toggleFeature } = useFeatureFlags()
const flags = computed(() => getAllFlags().value)
</script>
```

## Checklist para Feature Release

Quando uma feature protegida por flag estiver pronta para release definitivo:

- [ ] Validar funcionamento em todos os ambientes
- [ ] Confirmar com stakeholders/PO
- [ ] Habilitar flag em produção
- [ ] Monitorar por 1-2 semanas
- [ ] Remover condicionais `v-if="flag()"` do código
- [ ] Remover flag do `useFeatureFlags.js`
- [ ] Atualizar documentação
- [ ] Commit: `feat: release feature X (remove flag)`

## Status Atual

| Flag | Status | Componente | Prazo Estimado |
|------|--------|------------|----------------|
| `showEventTime` | 🚧 OFF | EventDrawer | A definir |

**Legenda:**
- ✅ **ON** - Habilitada por padrão
- 🚧 **OFF** - Desabilitada (em desenvolvimento)
- 🗑️ **Deprecated** - Será removida em breve

## Arquivos Relacionados

- Composable: [src/composables/useFeatureFlags.js](../src/composables/useFeatureFlags.js)
- Implementação: [src/components/EventDrawer.vue](../src/components/EventDrawer.vue#L48)
- Testes: _Pendente_

---

**Última atualização:** 18/02/2026  
**Responsável:** Equipe FrontOffice
