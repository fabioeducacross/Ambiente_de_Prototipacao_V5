import {
  IconBookOpen,
  IconChart,
  IconCheck,
  IconClipboard,
  IconEdit,
  IconGame,
  IconHome,
  IconPalette,
  IconSearch,
  IconSparkle,
  IconTarget,
  IconTrending,
  IconX
} from '@site/src/components/MaterialIcon';

# STUDENT-003: Library Games (Jogos Educacionais)

:::info Contexto
**Jornada**: Estudante  
**Prioridade**: Baixa  
**Complexidade**: Baixa  
**Status**: <IconCheck /> Documentado (AS-IS Baseline)
:::

## 1. Visão Geral

### O que é

A **Biblioteca de Jogos** é um catálogo curado de jogos educacionais HTML5 que permite aos estudantes aprenderem conceitos curriculares de forma lúdica e divertida. Funciona como uma "loja de jogos educacionais" integrada à plataforma.

### Como funciona hoje (AS-IS)

Biblioteca de jogos educacionais com:
- **Catálogo Curado** de 50+ jogos HTML5 educacionais de alta qualidade
- **Filtros Avançados** por disciplina, conteúdo, faixa etária, gênero de jogo
- **Sistema de Conquistas** integrado com perfil do aluno (XP, badges)
- **Modo Multiplayer** em jogos selecionados (local ou online)
- **Dashboard de Aprendizado** mostrando conceitos praticados em cada jogo
- **Recomendações Personalizadas** baseadas em histórico e dificuldades identificadas
- **Downloads para Offline** em jogos compatíveis
- **Relatórios para Professores** sobre engajamento e conceitos dominados

## 2. Jornada do Usuário (AS-IS)

```mermaid
graph TD
    Start([<IconHome /> Aluno acessa Biblioteca]) --> GameLibrary[<IconGame /> Vê grid de jogos<br/>disponíveis]
    GameLibrary --> Filters{<IconSearch /> Quer<br/>filtrar?}
    
    Filters -->|<IconCheck /> Sim| ApplyFilters[<IconClipboard /> Seleciona:<br/>Disciplina + Conteúdo + Gênero]
    Filters -->|<IconX /> Não| Browse[<span class="material-symbols-outlined">visibility</span> Navega pelo<br/>catálogo completo]
    
    ApplyFilters --> FilteredResults[<IconTarget /> Vê jogos filtrados]
    Browse --> SelectGame[<span class="material-symbols-outlined">mouse</span> Clica em um jogo]
    FilteredResults --> SelectGame
    
    SelectGame --> GameDetail[<IconBookOpen /> Tela de detalhes do jogo]
    GameDetail --> CheckProgress{<IconChart /> Já jogou<br/>antes?}
    
    CheckProgress -->|<IconCheck /> Sim| ShowProgress[<IconSparkle /> Mostra progresso anterior<br/>Fases completadas + Pontuação]
    CheckProgress -->|<IconX /> Não| ShowIntro[<span class="material-symbols-outlined">movie_creation</span> Mostra tutorial rápido<br/>do jogo]
    
    ShowProgress --> StartGame[<span class="material-symbols-outlined">play_arrow</span> Clica Jogar]
    ShowIntro --> StartGame
    
    StartGame --> GameIframe[<IconGame /> Jogo carrega<br/>em iframe fullscreen]
    GameIframe --> Playing[<span class="material-symbols-outlined">sports_esports</span> Aluno joga]
    
    Playing --> GameEnd{<span class="material-symbols-outlined">flag</span> Terminou<br/>sessão?}
    
    GameEnd -->|<IconX /> Pausou| SaveProgress[<span class="material-symbols-outlined">save</span> Salva progresso<br/>automaticamente]
    GameEnd -->|<IconCheck /> Completou fase| EarnRewards[<IconTrending /> Ganha XP + Badge<br/>se aplicável]
    
    SaveProgress --> Decision1{<span class="material-symbols-outlined">chat_bubble</span> Decisão}
    EarnRewards --> Decision2{<span class="material-symbols-outlined">chat_bubble</span> Decisão}
    
    Decision1 -->|<span class="material-symbols-outlined">play_arrow</span> Continuar| Playing
    Decision1 -->|<IconHome /> Sair| End([<span class="material-symbols-outlined">flag</span> Fim])
    
    Decision2 -->|<IconGame /> Próxima fase| Playing
    Decision2 -->|<IconTrending /> Ver conquistas| ShowAchievements[<IconChart /> Tela de conquistas]
    Decision2 -->|<IconGame /> Jogar outro| GameLibrary
    
    ShowAchievements --> End
    
    classDef startEnd fill:#e1f5e1,stroke:#4caf50,stroke-width:3px,color:#000
    classDef action fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#000
    classDef decision fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#000
    classDef reward fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#000
    
    class Start,End startEnd
    class GameLibrary,ApplyFilters,Browse,SelectGame,GameDetail,ShowIntro,StartGame,GameIframe,Playing,SaveProgress,ShowAchievements action
    class Filters,CheckProgress,GameEnd,Decision1,Decision2 decision
    class FilteredResults,ShowProgress,EarnRewards reward
```

## 3. Telas-chave (AS-IS)

### Biblioteca de Jogos (Grid)

![Library Games: Grid de Jogos](../../../static/img/screenshots/student-003-games-grid-as-is.png)

**Elementos**: Cards com thumbnail, título, disciplina, nível, rating, botão Play

### Detalhes do Jogo

![Library Games: Detalhes do Jogo](../../../static/img/screenshots/student-003-game-detail-as-is.png)

**Elementos**: Banner, descrição, conceitos praticados, dificuldade, tempo médio, botão Jogar, progresso anterior (se houver)

### Jogo em Execução

![Library Games: Jogo em Execução](../../../static/img/screenshots/student-003-game-playing-as-is.png)

**Elementos**: Iframe fullscreen com jogo HTML5, botões de controle (pausar, sair, volume)

### Conquistas Desbloqueadas

![Library Games: Conquistas](../../../static/img/screenshots/student-003-achievements-as-is.png)

**Elementos**: Lista de conquistas do jogo, XP ganho, progresso geral

## 4. Regras e comportamentos visíveis (AS-IS)

- **Catálogo curado**: jogos classificados por disciplina, conteúdo, gênero e faixa etária.
- **Progressão e conquistas**: XP por fase concluída, badges por feitos especiais (pontuação perfeita, velocidade, primeira vez no jogo).
- **Histórico e retomada**: salva progresso e permite continuar de onde parou.
- **Recomendações**: sugere jogos alinhados às lacunas do aluno e ao currículo.
- **Modo offline**: alguns jogos podem ser baixados para uso sem internet, com sincronização posterior.
- **Multiplayer**: jogos selecionados suportam partidas locais/online com ranking do jogo.

## 5. Valor para o aluno (AS-IS)

- Aprender conteúdos curriculares de forma lúdica e variada.
- Visualizar progresso dentro de cada jogo (fases, pontuação) e no perfil (XP e badges).
- Competir ou cooperar de maneira leve, mantendo engajamento.

## 6. Melhorias TO-BE

1. **Modo Competitivo Online** <IconTrending />
   - Torneios semanais entre alunos da rede
   - Leaderboards globais por jogo
   - Recompensas exclusivas para vencedores

2. **Criador de Jogos** <IconPalette />
   - Professores criam variações de jogos existentes
   - Editor visual drag-and-drop
   - Compartilhamento entre escolas

3. **VR/AR Games** <span class="material-symbols-outlined">visibility</span>
   - Jogos em realidade virtual (quando dispositivos disponíveis)
   - AR para laboratório virtual de ciências
   - Experiências imersivas

4. **Social Features** <span class="material-symbols-outlined">group</span>
   - Compartilhar pontuações com amigos
   - Desafiar colegas para duelos
   - Sistema de presentes virtuais

5. **Gamification Avançada** <IconGame />
   - Temporadas com jogos rotativos
   - Battle Pass estilo Fortnite
   - Eventos especiais sazonais

## 7. Referências

- [Design System - DSGameCard](https://storybook.educacross.com/?path=/story/cards-gamecard)
- [Catálogo de Jogos HTML5 Educacionais](https://kahoot.com/)
- [Learning Path (jornada relacionada)](./learning-path.md)

---

**Última atualização**: 2026-02-04  
**Versão**: AS-IS v1.0  
**Status**: <IconEdit /> Documentado - Aguardando Protótipo TO-BE
