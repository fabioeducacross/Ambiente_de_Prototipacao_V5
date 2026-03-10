# Fase 4 - Diagnostico inicial

## Escopo desta rodada

Este diagnostico cobre apenas o que foi possivel verificar localmente no workspace:

- comparacao entre `design-system/tokens/tokens.json`, `design-system/tokens/tokens.css` e `FrontOffice/src/style.css`
- parity interna de `EButton`, `EInput` e `ESelect` entre spec, implementacao e usos/documentacao do proprio repositorio

## Bloqueio externo

A comparacao formal com o SCSS e com os componentes reais de producao continua pendente.

Motivo: o caminho de referencia encontrado localmente para `educacross-frontoffice` existe, mas esta vazio, entao nao foi possivel abrir o codigo-fonte legado para comparar API e estilos de forma direta.

## Achados verificados

### 1. Tokens internos estao alinhados entre JSON, CSS exportado e fonte canônica

Nao apareceu divergencia interna entre os artefatos do design system desta branch.

- `tokens.json` replica os mesmos valores-base expostos em `style.css`
- `tokens.css` foi claramente extraido de `style.css`
- as categorias principais estao coerentes: cor, tipografia, spacing, radius, shadow e transition

Conclusao: o gap real da Fase 4 nao esta entre os artefatos internos do prototipo; ele esta na falta da comparacao contra a fonte de producao.

### 2. `ESelect` tem divergencia entre spec e implementacao

O componente implementado possui a prop `state`, mas ela nao esta documentada no spec do design system.

Impacto:

- a API publicada no asset fica incompleta
- consumidores que dependam de estado Bootstrap-like podem usar a prop sem encontra-la na documentacao
- a futura parity com producao fica opaca, porque nao esta claro se `invalid` e `state` coexistem por compatibilidade ou por decisao nova

Decisao recomendada:

- ou incluir `state` oficialmente no spec de `ESelect`
- ou remover `state` da implementacao se ela nao fizer parte do contrato desejado

### 3. `EButton` tem mismatch entre documentacao de uso e API real

O componente atual aceita tamanhos `small`, `medium` e `large`, mas a documentacao interna mostra uso com `size="sm"`.

Tambem ha uso documentado de `variant="text-danger"`, variante que nao existe no contrato atual de `EButton`.

Impacto:

- risco de copiar exemplos internos que nao funcionam no componente atual
- aumento de custo de migracao se houver consumidores herdando naming de Bootstrap ou legado

Decisao recomendada:

- padronizar a documentacao nos nomes aceitos hoje
- ou adicionar aliases de compatibilidade se o objetivo for absorver API legada

### 4. `EInput` esta consistente internamente, mas parity externa segue em aberto

No que foi possivel verificar dentro deste repositorio, spec e implementacao de `EInput` estao alinhados.

Nao apareceu mismatch local relevante de props ou eventos.

Ponto pendente:

- ainda falta comparar contra o componente real de producao para saber se existem props legadas importantes como atributos de mascara, formatter, eventos extras ou convencoes de validacao

## Prioridade de fechamento

1. Recuperar uma referencia real e legivel do `educacross-frontoffice` para comparacao direta.
2. Fechar a decisao de contrato de `ESelect` sobre `state`.
3. Definir se `EButton` vai manter API estrita do asset ou aceitar aliases legados como `sm` e `text-danger`.
4. So depois disso abrir a story de parity e migracao.

## Handoff recomendado

### Para `@sm`

Criar story separando claramente:

- alinhamento de contrato publicado
- compatibilidade com API legada
- comparacao com fonte de producao

### Para `@po`

Validar se a meta e:

- documentar o contrato novo e quebrar compatibilidade antiga
- ou preservar ergonomia de migracao adicionando aliases e props de compatibilidade

### Para `@dev`

Nao implementar parity final antes de ter acesso ao componente legado real. Sem isso, existe risco alto de inventar compatibilidade.