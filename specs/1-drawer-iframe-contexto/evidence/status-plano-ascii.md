# Status do Plano - Drawer Full com Iframe e Contexto (ASCII)

> Este arquivo e exclusivo da feature de drawer em `specs/1-drawer-iframe-contexto/`.
> Nao representa o status do plano de Storybook/expansao do Design System.
> Para o status do plano de Storybook, consulte `documentation/docs/design-system/status-plano-implementacao-storybook-ds.md`.

Atualizado em: 2026-03-10
Feature: `specs/1-drawer-iframe-contexto/`

## Resumo executivo

- Execucao declarada em `tasks.md`: `41/41` tarefas marcadas como concluidas.
- Checklist de aceite em `evidence/acceptance-checklist.md`: `13/13` itens marcados.
- Evidencias presentes em `evidence/`: `4/4` arquivos esperados.
- Status oficial da validacao do plano: `56%` (`5/9` gates de validacao passaram).

## Grafico geral

```text
Execucao declarada do plano   [####################] 100%  (41/41 tarefas)
Checklist de aceite           [####################] 100%  (13/13 itens)
Evidencias geradas            [####################] 100%  (4/4 arquivos)
Validacao de alinhamento      [###########---------]  56%  (5/9 gates)

STATUS ATUAL DO PLANO         [###########---------]  56%  (parcialmente validado)
```

## O que foi implementado / concluido no checklist

### Por fase

```text
Fase 1 - Setup                [##########] 100%  (4/4)
Fase 2 - Fundacao             [##########] 100%  (6/6)
Fase 3 - US1 Drawer ativo     [##########] 100%  (6/6)
Fase 4 - US2 Contexto+A11y    [##########] 100%  (6/6)
Fase 5 - US3 Estados+CTA      [##########] 100%  (5/5)
Fase 6 - US4 Whitelist        [##########] 100%  (6/6)
Fase 7 - Polish+Evidencias    [##########] 100%  (8/8)
```

### Itens com evidencia objetiva

```text
Testes automatizados          [####################] 100%  (11/11 testes aprovados)
Checklist de aceite           [####################] 100%  (13/13 itens marcados)
Performance RNF-PERF-001      [####################] 100%  (p95 = 92 ms, alvo <= 300 ms)
Arquivos de evidencia         [####################] 100%  (4/4 presentes)
```

## O que NAO esta fechado na validacao

Os itens abaixo nao significam necessariamente "codigo ausente".
Eles significam "ponto ainda nao fechado, nao alinhado ou nao comprovado pela documentacao atual".

```text
OpenAPI alinhado ao spec/data-model      [----------]   0%  (pendente)
Politica do CTA em URL bloqueada         [----------]   0%  (pendente)
Fluxo canonico para jornada planejada    [----------]   0%  (pendente)
Quality gates da constitution            [----------]   0%  (pendente)
```

## Como foi calculado o percentual atual do plano

O percentual oficial de `56%` usa `9` gates de validacao macro:

```text
1. Spec presente                         [#] PASS
2. Plan presente                         [#] PASS
3. Tasks presentes                       [#] PASS
4. Evidencia de testes presente          [#] PASS
5. Evidencia de performance presente     [#] PASS
6. OpenAPI alinhado                      [ ] FAIL
7. Politica do CTA bloqueado fechada     [ ] FAIL
8. UX de jornada planejada fechada       [ ] FAIL
9. Quality gates da constitution         [ ] FAIL
```

Formula:

```text
5 gates PASS / 9 gates totais = 55.56%
Arredondamento exibido = 56%
```

## Leitura correta deste status

Existe uma diferenca importante entre:

```text
Execucao declarada    = 100%
Validacao final       =  56%
```

Interpretacao:

- `100%` significa que o checklist de execucao em `tasks.md` esta todo marcado.
- `56%` significa que, apos cruzar `spec.md`, `plan.md`, `tasks.md`, `data-model.md`, contrato OpenAPI, constitution e evidencias, o plano ainda tem pendencias de alinhamento para ser considerado totalmente validado.

## Riscos adicionais observados

- `research.md` cita `JourneyContextDrawer.vue`, enquanto `plan.md` e `tasks.md` falam em `JourneyPrototypeDrawer.vue`.
- `quickstart.md` cita `iframeWhitelist.js`, enquanto o plano aponta para `iframeWhitelist.ts`.
- A validacao apontou risco adicional em navegacao completa por teclado/focus trap e em evidencias manuais de mobile/a11y, mesmo com requisitos basicos documentados.

## Fontes usadas neste resumo

- `specs/1-drawer-iframe-contexto/spec.md`
- `specs/1-drawer-iframe-contexto/plan.md`
- `specs/1-drawer-iframe-contexto/tasks.md`
- `specs/1-drawer-iframe-contexto/data-model.md`
- `specs/1-drawer-iframe-contexto/contracts/drawer-iframe-contexto.openapi.yaml`
- `specs/1-drawer-iframe-contexto/evidence/acceptance-checklist.md`
- `specs/1-drawer-iframe-contexto/evidence/test-run.md`
- `specs/1-drawer-iframe-contexto/evidence/performance-drawer.md`
- `specs/1-drawer-iframe-contexto/evidence/scenarios-evidence.md`
- `.specify/memory/constitution.md`
