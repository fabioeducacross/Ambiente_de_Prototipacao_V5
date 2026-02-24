---
sidebar_position: 10
title: E2E Testing Strategy
description: Estratégia de testes de ponta a ponta usando Playwright
---

# E2E Testing Strategy (Playwright)

No **Ambiente de Prototipação V5**, utilizamos o **Playwright** como ferramenta principal para testes de ponta a ponta (End-to-End) e validação visual.

---

## <span class="material-symbols-outlined">track_changes</span> Objetivo dos Testes E2E

1.  **Validação Visual**: Garantir que as telas implementadas correspondam 1:1 aos mockups do Figma (Pixel Perfect).
2.  **Fluxos de Persona**: Validar se cada perfil de usuário (Professor, Aluno, etc.) consegue navegar pelo seu fluxo específico.
3.  **Integridade do Protótipo**: Garantir que componentes complexos (como o Calendário) funcionem corretamente após mudanças no código.
4.  **Debug Visual**: Utilizar as capacidades do Playwright para capturar screenshots e inspecionar o DOM em tempo real.

---

## <span class="material-symbols-outlined">handyman</span> Stack e Ferramentas

*   **Framework**: [Playwright](https://playwright.dev/)
*   **Linguagem**: TypeScript / JavaScript
*   **Editor**: [Playwright Test Explorer](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) (Extensão do VS Code)
*   **MCP Integration**: Utilizamos o `@mcp/playwright` para permitir que agentes de IA validem visualmente as telas durante o desenvolvimento.

---

## <span class="material-symbols-outlined">folder_open</span> Estrutura de Pastas

```bash
mcp-playwright/
├── tests/
│   ├── figma-visual.spec.ts   # Compara telas reais vs assets do Figma
│   ├── navigation.spec.ts     # Valida rotas e menus
│   └── calendar.spec.ts       # Testes específicos do calendário
├── playwright.config.ts       # Configurações globais
└── README.md                  # Instruções de execução
```

---

## <span class="material-symbols-outlined">rocket_launch</span> Como Rodar os Testes

Para rodar os testes localmente, utilize os comandos abaixo na raiz do projeto:

```bash
# Rodar todos os testes
npx playwright test

# Rodar um teste específico
npx playwright test tests/figma-visual.spec.ts

# Rodar com interface visual (UI Mode)
npx playwright test --ui
```

---

## <span class="material-symbols-outlined">photo_camera</span> Validação Visual (Snapshots)

Um dos pilares deste projeto é o **Pixel Perfect**. Utilizamos o Playwright para tirar screenshots das telas e comparar com imagens de referência.

```javascript
test('deve validar design do calendário do professor', async ({ page }) => {
  await page.goto('/teacher/calendar');
  // Comparação com a imagem de referência
  expect(await page.screenshot()).toMatchSnapshot('teacher-calendar.png');
});
```

---

## <span class="material-symbols-outlined">trending_up</span> Roadmap de Testes

- [x] Configuração base do Playwright.
- [x] Testes de navegação entre personas.
- [ ] Implementação de testes de regressão visual automática.
- [ ] Mapeamento completo dos fluxos do Calendário.
- [ ] Integração de validação de acessibilidade (axe-core) via Playwright.
