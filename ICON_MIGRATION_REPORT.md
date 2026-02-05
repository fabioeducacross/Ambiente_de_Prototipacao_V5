# Relatório de Migração de Ícones e Identidade Visual

## Visão Geral
Este documento registra as alterações realizadas para atualizar a identidade visual da documentação do Ambiente de Prototipação V5, substituindo emojis por ícones SVG e ajustando a tipografia para usar a fonte oficial do produto (Montserrat).

## Alterações Realizadas

### 1. Migração de Ícones
Foram importados os ícones SVG do projeto `educacross-frontoffice` para manter a consistência com o produto principal.

**Origem:** `educacross-frontoffice/src/assets/images/icons/`
**Destino:** `documentation/static/img/icons/`

| Persona | Arquivo Original (V4) | Novo Ícone (V5) |
|---------|-----------------------|-----------------|
| Professor | `classroom.svg` | `teacher.svg` |
| Aluno | `student.svg` | `student.svg` |
| Administrador | `admin.svg` | `admin.svg` |
| Coordenador | `coordinator.svg` | `coordinator.svg` |
| Diretor | `director.svg` | `director.svg` |
| Rede | `network.png`* | `network.png` |
| Auditor | `auditor.svg` | `auditor.svg` |

*\*Nota: O ícone de rede foi mantido como PNG pois o original era PNG.*

### 2. Atualização de Tipografia
A fonte global foi alterada para **Montserrat** para melhorar a legibilidade e alinhar com o branding da Educacross.

**Arquivo:** `documentation/src/css/custom.css`
- Importação via Google Fonts: `Montserrat:wght@400;500;600;700`
- Aplicação na variável `--ifm-font-family-base`
- Aumento do tamanho base da fonte: `16px` -> `18px`

### 3. Remoção de Emojis
Os emojis foram removidos dos títulos das sidebars e dos cabeçalhos das páginas para limpar a interface visual e dar lugar aos novos ícones.

**Arquivo:** `documentation/sidebars.ts`
- Labels limpas (ex: "👨‍🏫 Professor" -> "Professor")

### 4. Atualização de Conteúdo (Markdown)
Os cabeçalhos H1 das páginas de personas foram atualizados para incluir as tags de imagem apontando para os novos ícones.

**Padrão Aplicado:**
```markdown
# <img src="/img/icons/[icon-name].svg" alt="Ícone [Persona]" width="40" style={{verticalAlign: 'middle', marginRight: '10px'}} /> [Título]
```

**Arquivos Atualizados:**
- `docs/personas/professor.md`
- `docs/personas/aluno.md`
- `docs/personas/administrator.md`
- `docs/personas/coordinator.md`
- `docs/personas/director.md`
- `docs/personas/network-manager.md`

## Validação
- **Build:** Sucesso
- **Visual:** Confirmado carregamento da fonte Montserrat e exibição dos ícones SVG.
