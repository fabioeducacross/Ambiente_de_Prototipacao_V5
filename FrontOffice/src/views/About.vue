<script setup>
import { RouterLink } from 'vue-router'

const sections = [
  { id: 'intro',       label: 'Introdução' },
  { id: 'contexto',    label: '1. Contexto e propósito' },
  { id: 'por-que-nao', label: '2. Por que não empacotadas?' },
  { id: 'vantagens',   label: '3. Vantagens do ambiente' },
  { id: 'design',      label: '4. Facilidade no design' },
  { id: 'legado',      label: '5. Legado e riscos' },
  { id: 'validacao',   label: '6. Validação proposta' },
  { id: 'custos',      label: '7. Custos comparados' },
  { id: 'arquitetura', label: '8. Arquitetura' },
  { id: 'conclusao',   label: 'Conclusão' },
]
</script>

<template>
  <div class="about-shell">

    <!-- Sidebar de âncoras -->
    <aside class="about-sidebar">
      <RouterLink to="/" class="back-home">
        <span class="material-symbols-outlined">arrow_back</span>
        Voltar ao início
      </RouterLink>

      <nav class="anchor-nav">
        <span class="anchor-label">Nesta página</span>
        <a
          v-for="s in sections"
          :key="s.id"
          :href="`#${s.id}`"
          class="anchor-link"
        >{{ s.label }}</a>
      </nav>

      <div class="sidebar-meta">
        <span class="meta-dot"></span>
        Redesenho-home
      </div>
    </aside>

    <!-- Conteúdo principal -->
    <main class="about-main">

      <!-- Hero -->
      <div class="about-hero">
        <div class="about-hero-badge">
          <span class="material-symbols-outlined">layers</span>
          Documento vivo · fev/2026
        </div>
        <h1 class="about-hero-title">Ambiente de Prototipação<br>Educacross</h1>
        <p class="about-hero-desc">
          Um espaço projetado para conectar design, produto e tecnologia —
          acelerando a validação de jornadas educacionais antes de qualquer linha
          ir a produção.
        </p>
      </div>

      <!-- Introdução -->
      <section id="intro" class="doc-section">
        <h2 class="doc-h2">Introdução</h2>
        <p>Este documento apresenta a proposta oficial do <strong>Ambiente de Prototipação da Educacross</strong>,
          sua importância estratégica, seus diferenciais em relação a soluções empacotadas do mercado e o plano
          de validação necessário para consolidá-lo como um dos pilares do processo de produto da empresa.
          O ambiente está em fase de construção e validação. Este material tem como finalidade obter o apoio
          e o patrocínio da diretoria para seu avanço.</p>
      </section>

      <!-- 1. Contexto -->
      <section id="contexto" class="doc-section">
        <h2 class="doc-h2">1. Contexto e propósito do ambiente</h2>
        <p>O time de produto, na pessoa do designer Fábio Alves, está desenvolvendo um
          <strong>ambiente de prototipação leve, acessível e altamente adaptável</strong>, projetado para
          acelerar a compreensão de problemas, a validação de hipóteses e a experimentação de jornadas
          reais das plataformas Front-office, Back-office e Games.</p>
        <p>O ambiente utiliza <strong>Vue 3.5 + Vite</strong> como base técnica, escolha que equilibra
          produtividade e fidelidade: o código gerado nos protótipos é diretamente traduzível para o stack
          real de desenvolvimento (Vue), eliminando o atrito de handoff e reduzindo retrabalho de engenharia.</p>
        <p>O propósito central é permitir prototipação rápida, clara e realista — aproximando a experimentação
          do comportamento final do produto sem expor dados sensíveis a plataformas externas ou limitar a
          equipe às restrições de ferramentas empacotadas.</p>
      </section>

      <!-- 2. Por que não empacotadas -->
      <section id="por-que-nao" class="doc-section">
        <h2 class="doc-h2">2. Por que não usar soluções empacotadas?</h2>
        <p>Ferramentas como Lovable e Figma Make têm valor em contextos genéricos. Para o nosso contexto,
          elas trazem limitações críticas:</p>
        <ul>
          <li>Geração de código React, incompatível com o stack Vue da Educacross.</li>
          <li>Custo por usuário que escala com o time.</li>
          <li>Dados estratégicos trafegando por serviços SaaS externos.</li>
          <li>Dependência de roadmaps e decisões de terceiros.</li>
          <li>Prototipação genérica, desconectada do Design System e das jornadas reais da plataforma.</li>
        </ul>
        <p>Nosso ambiente interno resolve exatamente o problema oposto:
          <strong>flexibilidade total, controle, custo mínimo e aderência ao ecossistema Educacross</strong>.</p>
      </section>

      <!-- 3. Vantagens -->
      <section id="vantagens" class="doc-section">
        <h2 class="doc-h2">3. Vantagens do ambiente interno</h2>

        <h3 class="doc-h3">3.1 Autonomia e controle total</h3>
        <p>Todo o ambiente vive sob a infraestrutura da Educacross. Nenhuma decisão técnica depende de
          terceiros: estrutura, comportamento e evolução dos protótipos são definidos internamente,
          com controle completo sobre versões, rollbacks e direção estratégica.</p>

        <h3 class="doc-h3">3.2 Fidelidade técnica e clareza no handoff</h3>
        <p>Protótipos em Vue 3.5 + Vite são facilmente traduzidos para o stack de produção (Vue 2.7).
          Componentes, nomes de props e padrões visuais chegam ao time de engenharia já no formato
          esperado — reduzindo ruídos, aumentando precisão e acelerando o desenvolvimento.</p>

        <h3 class="doc-h3">3.3 Segurança e privacidade</h3>
        <p>Nenhum dado sensível ou estratégico é exposto a serviços externos. Todo o fluxo de prototipação
          e documentação opera sob a infraestrutura da Educacross, com repositório privado no
          <strong>Azure DevOps</strong> e GitHub Copilot Pro+ como acelerador de produtividade —
          mantendo conformidade, rastreabilidade e proteção total das informações.</p>

        <h3 class="doc-h3">3.4 Escalabilidade, customização e automação</h3>
        <p>Como o ambiente é nosso, sua evolução é contínua e incremental, passando diretamente pelo Design System:</p>
        <ul>
          <li>Validações automatizadas alinhadas aos padrões do DS.</li>
          <li>Scripts sob medida para atualizar e sincronizar componentes de UI.</li>
          <li>Adaptações específicas ao produto educacional, refletidas nos protótipos e na documentação.</li>
          <li>Integração com <strong>MCP (Model Context Protocol)</strong> para que a IA trabalhe com o
            Design System como fonte de verdade.</li>
        </ul>

        <h3 class="doc-h3">3.5 Documentação viva e integrada</h3>
        <p>O <strong>Docusaurus</strong> funciona como a central de documentação do ambiente: cada jornada
          documentada inclui fluxo Mermaid, screenshots AS-IS, componentes utilizados e propostas TO-BE.
          Cada protótipo consolidado pode gerar um padrão documentado no Docusaurus, criando um ciclo
          contínuo de aprendizado — <em>protótipo → componente → produto</em> — que reduz retrabalho e
          fortalece a consistência visual em toda a plataforma.</p>
      </section>

      <!-- 4. Design -->
      <section id="design" class="doc-section">
        <h2 class="doc-h2">4. Facilidade no design</h2>
        <p>O ambiente permite que designers e PMs criem, testem e revisem telas sem etapas técnicas
          desnecessárias. A integração entre <strong>Figma</strong>, <strong>MCP</strong> e o ambiente
          Vue possibilita gerar fluxos rapidamente, manter documentação organizada e acelerar a
          comunicação com tecnologia — sem depender de builds complexas ou ambientes de desenvolvimento.</p>
        <p>O GitHub Copilot Pro+ atua como par programador: sugere código, refatora componentes e mantém
          o ambiente alinhado ao Design System, reduzindo a barreira técnica para membros não-engenheiros
          do time de produto.</p>
      </section>

      <!-- 5. Legado -->
      <section id="legado" class="doc-section">
        <h2 class="doc-h2">5. Legado e redução de riscos</h2>
        <p>O ambiente se transforma em um <strong>ativo institucional</strong>: consolida padrões,
          decisões e aprendizados em um único espaço versionado e acessível.</p>
        <p>O uso de Vue — tecnologia já dominada pelo time de engenharia — reduz silos de conhecimento
          e facilita o onboarding de novos membros. Qualquer pessoa do time de produto consegue
          compreender a estrutura rapidamente.</p>
        <p>Testes com <strong>Claude Sonnet 4.6</strong> mostraram que manter o controle interno
          aumenta a fidelidade visual e o rigor do processo, sem perder velocidade de iteração.</p>
      </section>

      <!-- 6. Validação -->
      <section id="validacao" class="doc-section">
        <h2 class="doc-h2">6. Proposta de validação</h2>
        <p>Para consolidar o ambiente como parte oficial da operação de produto, propomos um ciclo de
          validação com métricas claras e objetivos mensuráveis.</p>

        <h3 class="doc-h3">Objetivos</h3>
        <ul>
          <li>Reduzir o tempo entre <strong>hipótese → protótipo → aprendizado</strong>, encurtando o
            ciclo de discovery.</li>
          <li>Garantir <strong>autonomia para PMs e Designers</strong>, validando hipóteses sem depender
            do ambiente de desenvolvimento.</li>
          <li>Gerar protótipos que <strong>facilitem o trabalho de engenharia</strong>, com escopo claro
            e retrabalho reduzido.</li>
          <li>Melhorar o <strong>alinhamento multifuncional no handoff</strong>, testando soluções com
            usuários reais antes do desenvolvimento.</li>
        </ul>

        <h3 class="doc-h3">Métricas</h3>
        <ul>
          <li><strong>Tempo médio por ciclo</strong> (hipótese → protótipo → aprendizado): redução
            percentual ao longo das semanas.</li>
          <li><strong>Profundidade de iteração:</strong> versões por jornada e qualidade das decisões
            tomadas entre elas.</li>
          <li><strong>Autonomia operacional:</strong> protótipos criados por PMs/Designers sem suporte
            técnico.</li>
          <li><strong>Clareza técnica percebida pela engenharia:</strong> avaliação qualitativa e
            quantitativa (1–5) sobre precisão dos protótipos.</li>
          <li><strong>Retrabalho evitado:</strong> comparação entre iniciativas que passaram pelo
            ambiente e as que foram direto a desenvolvimento.</li>
          <li><strong>Aderência ao Design System:</strong> percentual de componentes e tokens
            replicados corretamente no protótipo.</li>
        </ul>
      </section>

      <!-- 7. Custos -->
      <section id="custos" class="doc-section">
        <h2 class="doc-h2">7. Comparativo de custos</h2>
        <p>A tabela abaixo compara os planos premium das ferramentas empacotadas com os custos
          necessários para operar o ambiente interno com segurança e performance.</p>

        <blockquote class="doc-quote">
          Valores em dólares (USD), conforme planos oficiais. A conversão dependerá do câmbio vigente.
          A infraestrutura Azure DevOps já está contratada — não gera custo incremental para o ambiente.
        </blockquote>

        <div class="table-wrap">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Ferramenta / Assinatura</th>
                <th>Custo Mensal</th>
                <th>Benefícios principais</th>
                <th>Observações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Lovable – Pro</strong></td>
                <td class="td-cost">US$ 25/mês</td>
                <td>Geração de apps full-stack, deploy, projetos privados, créditos de IA</td>
                <td>Limitado por créditos; uso intenso exige upgrades de pacote.</td>
              </tr>
              <tr>
                <td><strong>Figma Professional</strong></td>
                <td class="td-cost">US$ 16/assento/mês</td>
                <td>Figma Design, FigJam, Slides, Dev Mode, Sites e Make com IA</td>
                <td>Custo cresce por assento; escalar exige pagar por editor e desenvolvedor.</td>
              </tr>
              <tr>
                <td><strong>GitHub Copilot – Pro</strong></td>
                <td class="td-cost">US$ 10/mês</td>
                <td>Autocomplete ilimitado, agente de código, Claude Sonnet 4.6, GPT-4o</td>
                <td>300 requisições premium/mês. Em uso intensivo, o limite é atingido rapidamente.</td>
              </tr>
              <tr class="tr-highlight">
                <td><strong>GitHub Copilot – Pro+</strong></td>
                <td class="td-cost">US$ 39/mês</td>
                <td>Tudo do Pro + 1.500 requisições premium/mês e acesso a todos os modelos</td>
                <td><strong>Plano recomendado</strong> para uso intensivo no Ambiente de Prototipação.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="doc-h3">Conclusão do comparativo</h3>
        <ul>
          <li>O custo total do ambiente é <strong>substancialmente menor</strong> do que soluções baseadas
            em Lovable ou Figma Make.</li>
          <li>O único investimento direto em IA é o <strong>GitHub Copilot Pro+</strong> para 1 usuário
            chave (produto/design), com capacidade de uso intensivo de modelos avançados.</li>
          <li>Nenhuma cobrança por usuário final: PMs, designers e engenheiros utilizam a mesma base sem
            taxas adicionais de seat ou licença.</li>
          <li>Código e deploy permanecem sob domínio interno da Educacross via
            <strong>Azure DevOps</strong> e <strong>Azure Pipelines</strong>.</li>
        </ul>
      </section>

      <!-- 8. Arquitetura -->
      <section id="arquitetura" class="doc-section">
        <h2 class="doc-h2">8. Arquitetura proposta</h2>
        <p>Esquema simplificado mostrando como as peças se conectam na prática.</p>

        <pre class="doc-code">[PM / Design]
     │
     ▼
[Figma + MCP]
     │   (exporta fluxos, telas e specs para o Design System)
     ▼
[Ambiente de Prototipação — Vue 3.5 + Vite]
     │   (implementação apoiada por GitHub Copilot Pro+)
     ▼
[Repositório privado — Azure DevOps]
     │   (controle de versão, histórico e governança interna)
     ▼
[Azure Pipelines]
     │
     ├──► [Deploy Docusaurus — Documentação viva]
     │        (jornadas AS-IS, arquitetura, Design System)
     └──► [Deploy Protótipos interativos]
              (acesso para diretoria, pedagógico e stakeholders)</pre>

        <p>Nesse fluxo:</p>
        <ul>
          <li><strong>Designers e PMs</strong> trabalham no Figma estruturando jornadas e interfaces,
            usando MCP para aproximar design e código.</li>
          <li>O <strong>Ambiente Vue 3.5 + Vite</strong> transforma essas ideias em experiências
            navegáveis com baixo atrito técnico.</li>
          <li>O código é versionado no <strong>Azure DevOps</strong>, garantindo governança, histórico
            e alinhamento com a infraestrutura oficial da Educacross.</li>
          <li><strong>Azure Pipelines</strong> automatiza a publicação do Docusaurus e dos protótipos,
            permitindo que diretoria e áreas parceiras acessem versões atualizadas sem depender do
            ambiente de desenvolvimento.</li>
        </ul>
      </section>

      <!-- Conclusão -->
      <section id="conclusao" class="doc-section">
        <h2 class="doc-h2">Conclusão</h2>
        <p>O Ambiente de Prototipação da Educacross não é apenas uma ferramenta: é uma
          <strong>infraestrutura estratégica</strong> que oferece velocidade, segurança, autonomia e
          clareza para a construção de produtos educacionais de alta qualidade.</p>
        <p>Ele reduz riscos, diminui retrabalho, fortalece o alinhamento entre equipes e potencializa
          o uso de IA, mantendo custos <strong>mínimos</strong> — limitados às assinaturas essenciais:
          <strong>Azure DevOps</strong> para segurança e governança, e
          <strong>GitHub Copilot Pro+</strong> para operar com modelos como Claude Sonnet 4.6 sem
          restrições de uso.</p>
        <p>Com o apoio da diretoria, este ambiente pode se consolidar como um dos pilares centrais do
          processo de produto, garantindo eficiência, consistência e governança visual para os próximos anos.</p>

        <div class="conclusion-cta">
          <RouterLink to="/" class="cta-btn">
            <span class="material-symbols-outlined">arrow_back</span>
            Explorar os protótipos
          </RouterLink>
        </div>
      </section>

      <footer class="about-footer">
        © 2026 Educacross — Documento vivo do Ambiente de Prototipação
      </footer>
    </main>
  </div>
</template>

<style scoped>
/* ── Shell ───────────────────── */
.about-shell {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 100vh;
  background: var(--bg, #0a0a0a);
  color: var(--text, #ededed);
  font-family: var(--font-family-base, 'Geist', sans-serif);
}

/* ── Sidebar ─────────────────── */
.about-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid var(--border, #222);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: var(--bg, #0a0a0a);
}

.back-home {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--text-muted, #888);
  text-decoration: none;
  transition: color 0.15s;
}
.back-home:hover { color: var(--text, #ededed); }
.back-home .material-symbols-outlined { font-size: 15px; }

.anchor-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.anchor-label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-dim, #555);
  padding: 0 8px;
  margin-bottom: 4px;
}

.anchor-link {
  font-size: 12.5px;
  color: var(--text-muted, #888);
  text-decoration: none;
  padding: 5px 8px;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
  line-height: 1.4;
}
.anchor-link:hover {
  color: var(--text, #ededed);
  background: var(--surface-2, #1a1a1a);
}

.sidebar-meta {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10.5px;
  font-family: var(--font-family-mono, 'Geist Mono', monospace);
  color: var(--text-dim, #555);
  padding: 0 8px;
}

.meta-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #28C76F;
  flex-shrink: 0;
}

/* ── Main ────────────────────── */
.about-main {
  padding: 48px 56px 64px;
  max-width: 780px;
  overflow-y: auto;
}

/* ── Hero ────────────────────── */
.about-hero { margin-bottom: 48px; }

.about-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--text-muted, #888);
  background: var(--surface, #111);
  border: 1px solid var(--border, #222);
  border-radius: 999px;
  padding: 4px 12px;
  margin-bottom: 20px;
}
.about-hero-badge .material-symbols-outlined { font-size: 13px; color: var(--accent, #7367F0); }

.about-hero-title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--text, #ededed);
  line-height: 1.2;
  margin-bottom: 14px;
}

.about-hero-desc {
  font-size: 15px;
  color: var(--text-muted, #888);
  line-height: 1.65;
  max-width: 560px;
}

/* ── Sections ────────────────── */
.doc-section {
  padding: 36px 0;
  border-top: 1px solid var(--border, #1e1e1e);
}
.doc-section:first-of-type { border-top: none; }

.doc-h2 {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text, #ededed);
  margin-bottom: 16px;
  line-height: 1.3;
}

.doc-h3 {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text, #ededed);
  margin: 20px 0 8px;
  letter-spacing: -0.01em;
}

.doc-section p {
  font-size: 14px;
  color: var(--text-muted, #999);
  line-height: 1.7;
  margin-bottom: 12px;
}
.doc-section p strong { color: var(--text, #ededed); font-weight: 500; }

.doc-section ul,
.doc-section ol {
  margin: 8px 0 16px;
  padding-left: 20px;
}
.doc-section li {
  font-size: 14px;
  color: var(--text-muted, #999);
  line-height: 1.7;
  margin-bottom: 6px;
}
.doc-section li strong { color: var(--text, #ededed); font-weight: 500; }
.doc-section em { color: var(--text-dim, #666); font-style: italic; }

/* ── Blockquote ──────────────── */
.doc-quote {
  background: var(--surface, #111);
  border-left: 2px solid var(--accent, #7367F0);
  border-radius: 0 6px 6px 0;
  padding: 12px 16px;
  margin: 16px 0;
  font-size: 13px;
  color: var(--text-muted, #888);
  line-height: 1.6;
  font-style: italic;
}

/* ── Code block ──────────────── */
.doc-code {
  background: var(--surface, #111);
  border: 1px solid var(--border, #222);
  border-radius: 8px;
  padding: 20px 24px;
  font-family: var(--font-family-mono, 'Geist Mono', monospace);
  font-size: 12px;
  line-height: 1.7;
  color: var(--text-muted, #999);
  overflow-x: auto;
  margin: 16px 0;
  white-space: pre;
}

/* ── Table ───────────────────── */
.table-wrap {
  overflow-x: auto;
  margin: 16px 0;
  border-radius: 8px;
  border: 1px solid var(--border, #222);
}

.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.doc-table th {
  background: var(--surface, #111);
  color: var(--text-dim, #666);
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid var(--border, #222);
  white-space: nowrap;
}

.doc-table td {
  padding: 12px 14px;
  color: var(--text-muted, #999);
  border-bottom: 1px solid var(--border, #1e1e1e);
  vertical-align: top;
  line-height: 1.55;
}
.doc-table tr:last-child td { border-bottom: none; }
.doc-table td strong { color: var(--text, #ededed); font-weight: 500; }

.td-cost {
  font-family: var(--font-family-mono, 'Geist Mono', monospace);
  font-size: 12px;
  white-space: nowrap;
  color: var(--text, #ededed);
}

.tr-highlight td {
  background: color-mix(in srgb, var(--accent, #7367F0) 5%, transparent);
}
.tr-highlight .td-cost { color: var(--accent, #7367F0); }

/* ── CTA final ───────────────── */
.conclusion-cta {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--border, #1e1e1e);
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text, #ededed);
  background: var(--surface, #111);
  border: 1px solid var(--border, #222);
  border-radius: 8px;
  padding: 10px 18px;
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s;
}
.cta-btn:hover {
  background: var(--surface-2, #1a1a1a);
  border-color: var(--border-hover, #333);
}
.cta-btn .material-symbols-outlined { font-size: 16px; }

/* ── Footer ──────────────────── */
.about-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--border, #1e1e1e);
  font-size: 12px;
  color: var(--text-dim, #555);
}

/* ── Responsivo ──────────────── */
@media (max-width: 900px) {
  .about-shell { grid-template-columns: 1fr; }
  .about-sidebar {
    position: static;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--border, #222);
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 16px;
  }
  .anchor-nav { flex-direction: row; flex-wrap: wrap; gap: 4px; }
  .anchor-label { display: none; }
  .sidebar-meta { margin-top: 0; }
  .about-main { padding: 28px 24px 48px; }
  .about-hero-title { font-size: 24px; }
}
</style>
