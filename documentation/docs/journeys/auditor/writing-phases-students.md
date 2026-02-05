import { IconCheck, IconEdit } from '@site/src/components/MaterialIcon';

# AUDITOR-001: Writing Phases Students (Auditoria de Fases de Escrita)

:::info Contexto
**Jornada**: Auditor  
**Prioridade**: Baixa  
**Complexidade**: Média  
**Status**: <IconCheck /> Documentado (AS-IS Baseline)
:::

## 1. Visão geral (AS-IS)

Auditor acompanha a fase de escrita dos alunos por rede/escola, identifica casos críticos e exporta evidências para prestação de contas.

## 2. Jornada do usuário (AS-IS)

1) Auditor abre o painel de fases de escrita.  
2) Filtra por rede, escola, série e período.  
3) Visualiza distribuição por fase (pré-silábica, silábica, alfabética) e alunos em risco.  
4) Abre o detalhamento de um aluno para ver histórico de fases e data da última atualização.  
5) Exporta planilha/PDF para compartilhar com a gestão.

## 3. Telas-chave

- Lista consolidada por rede/escola com distribuição das fases.  
- Card ou linha de aluno com fase atual, data da última atualização e tag de risco.  
- Histórico do aluno com datas de mudança de fase.  
- Ação de exportar (planilha ou PDF) respeitando filtros aplicados.

## 4. Regras e comportamentos visíveis

- Filtros obrigatórios: rede/escola, série, período.  
- Risco sinalizado quando: (a) fase muito abaixo da série alvo ou (b) sem atualização > 6 meses.  
- Histórico mostra a sequência de fases com data de registro mais recente no topo.  
- Exportação reflete exatamente os filtros atuais.

## 5. Valor para auditoria (AS-IS)

- Visão consolidada da rede/escola com poucos cliques.  
- Identificação rápida de casos críticos e defasagens.  
- Evidências organizadas para decisões e prestação de contas.

## 6. Melhorias TO-BE

1) IA para diagnóstico automático a partir de foto de atividade, com validação do professor.  
2) Comparativos longitudinais (evolução ano a ano e entre redes).  
3) Alertas proativos quando o aluno regride de fase ou fica sem avaliação por X meses.  
4) Relatórios narrativos automáticos com insights prontos.  
5) Integração com diário de classe para exibir fase em tempo real.

## 7. Referências

- [Teoria de Emilia Ferreiro - Psicogênese da Língua Escrita](https://books.google.com.br/books?id=psicogenese)  
- [BNCC - Alfabetização](http://basenacionalcomum.mec.gov.br/)  
- [Student Records (jornada relacionada)](../teacher/student-records.md)

---

**Última atualização**: 2026-02-04  
**Versão**: AS-IS v1.0  
**Status**: <IconEdit /> Documentado - Aguardando Protótipo TO-BE
