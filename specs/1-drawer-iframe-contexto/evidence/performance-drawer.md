# Evidencia de Performance - Drawer da Home

Data: 2026-03-05

## Objetivo
Validar o RNF-PERF-001 com medicao objetiva da abertura visual do drawer apos clique em jornada ativa.

## Metodo
- Ferramenta: Playwright (Chromium headless), executado via `node scripts/tmp-measure-drawer-performance.mjs`
- Ambiente: `http://localhost:5174/` (FrontOffice em dev)
- Viewport: `1366x900`
- Seletor de referencia visual: `.journey-drawer`
- Protocolo:
  - 5 iteracoes de aquecimento (warmup)
  - 30 iteracoes medidas
  - Metricas: min, media, p95, max

## Resultado
- Iteracoes medidas: `30`
- Minimo: `39 ms`
- Media: `59.97 ms`
- P95: `92 ms`
- Maximo: `118 ms`
- Criterio RNF-PERF-001 (`p95 <= 300 ms`): `PASS`

## Amostras (30)
`[84, 52, 56, 52, 83, 62, 56, 69, 87, 92, 118, 75, 80, 48, 54, 53, 45, 43, 42, 39, 41, 63, 49, 42, 49, 49, 59, 49, 55, 53]`

## Observacoes
- A medicao considera a exibicao do drawer como sinal visual inicial de abertura da experiencia.
- O teste foi executado com CPU sem throttling (condicao normal de desktop).