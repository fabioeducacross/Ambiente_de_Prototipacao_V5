import React, { useState } from 'react';
import Layout from '@theme/Layout';

export default function AdminPage() {
  const [journey, setJourney] = useState({
    id: '',
    titulo: '',
    contexto: 'Professor / Teacher Context',
    persona: '',
    prioridade: 'Alta',
    status: 'Documentado - Aguardando Protótipo',
    objetivo: '',
    necessidades: [''],
    painPoints: [''],
  });

  const [markdownOutput, setMarkdownOutput] = useState('');

  const handleInputChange = (field, value) => {
    setJourney({ ...journey, [field]: value });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...journey[field]];
    newArray[index] = value;
    setJourney({ ...journey, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setJourney({ ...journey, [field]: [...journey[field], ''] });
  };

  const removeArrayItem = (field, index) => {
    const newArray = journey[field].filter((_, i) => i !== index);
    setJourney({ ...journey, [field]: newArray });
  };

  const generateMarkdown = () => {
    const today = new Date().toISOString().split('T')[0];
    
    const md = `# ${journey.titulo}

## 📋 Informações Básicas

| Campo | Valor |
|-------|-------|
| **ID da Jornada** | \`${journey.id}\` |
| **Título** | ${journey.titulo} |
| **Contexto** | ${journey.contexto} |
| **Persona** | ${journey.persona} |
| **Prioridade** | 🔴 ${journey.prioridade} |
| **Status** | 📝 ${journey.status} |
| **Última Atualização** | ${today} |

## 🎯 Objetivo da Jornada

${journey.objetivo}

**O que o usuário quer alcançar:**

${journey.necessidades.filter(n => n.trim()).map(n => `- ${n}`).join('\n')}

## 😓 Pontos de Dor (Pain Points)

${journey.painPoints.filter(p => p.trim()).map((p, i) => `### ${i + 1}. ${p}

- **Descrição**: [Descrever o problema]
- **Impacto**: Médio/Alto/Baixo
- **Frequência**: Frequente/Ocasional
- **Citação do usuário**: *"[Adicionar citação]"*
`).join('\n')}

## 🗺️ Fluxo AS-IS (Estado Atual)

### Diagrama de Fluxo

\`\`\`mermaid
graph TD
    Start([🏠 Início]) --> Action1[📋 Primeira Ação]
    Action1 --> Decision1{🤔 Decisão?}
    Decision1 -->|✅ Sim| Action2[✅ Ação Positiva]
    Decision1 -->|❌ Não| End1([🏁 Fim])
    Action2 --> End2([🏁 Fim])
    
    classDef startEnd fill:#e1f5e1,stroke:#4caf50,stroke-width:3px,color:#000
    classDef action fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#000
    classDef decision fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#000
    
    class Start,End1,End2 startEnd
    class Action1,Action2 action
    class Decision1 decision
\`\`\`

### Passos Detalhados

1. **Passo 1**
   - Descrição: [Descrever ação]
   - Tela: [Nome do componente]
   - Sistema: [Comportamento do sistema]

---

**Última atualização:** ${today} | **Versão:** 1.0
`;

    setMarkdownOutput(md);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownOutput);
    alert('Markdown copiado para área de transferência!');
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdownOutput], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${journey.id.toLowerCase()}-${journey.titulo.toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
  };

  return (
    <Layout title="Painel Administrativo" description="Criar e editar jornadas">
      <div style={{maxWidth: '1400px', margin: '0 auto', padding: '2rem'}}>
        <div style={{textAlign: 'center', marginBottom: '3rem', padding: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '12px'}}>
          <h1 style={{margin: '0 0 0.5rem 0', fontSize: '2.5rem'}}>📝 Editor de Jornadas</h1>
          <p style={{margin: 0, opacity: 0.9, fontSize: '1.1rem'}}>Preencha o formulário para gerar a documentação em Markdown</p>
        </div>

        <div style={{background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginBottom: '2rem'}}>
          <div style={{marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '2px solid #f0f0f0'}}>
            <h2 style={{color: '#667eea', marginBottom: '1.5rem', fontSize: '1.5rem'}}>📋 Informações Básicas</h2>
            
            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333'}}>ID da Jornada *</label>
              <input
                type="text"
                placeholder="Ex: PROF-003"
                value={journey.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
                style={{width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
              />
            </div>

            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333'}}>Título *</label>
              <input
                type="text"
                placeholder="Ex: Criar Avaliação Diagnóstica"
                value={journey.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                style={{width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
              />
            </div>

            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333'}}>Contexto *</label>
              <select
                value={journey.contexto}
                onChange={(e) => handleInputChange('contexto', e.target.value)}
                style={{width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
              >
                <option>Professor / Teacher Context</option>
                <option>Aluno / Student Context</option>
                <option>Admin / Admin Context</option>
                <option>Coordenador / Coordinator Context</option>
              </select>
            </div>

            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333'}}>Persona</label>
              <input
                type="text"
                placeholder="Ex: Professora Maria - 35 anos, ensina Matemática"
                value={journey.persona}
                onChange={(e) => handleInputChange('persona', e.target.value)}
                style={{width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
              />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333'}}>Prioridade *</label>
                <select
                  value={journey.prioridade}
                  onChange={(e) => handleInputChange('prioridade', e.target.value)}
                  style={{width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
                >
                  <option>Alta</option>
                  <option>Média</option>
                  <option>Baixa</option>
                </select>
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333'}}>Status *</label>
                <select
                  value={journey.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  style={{width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
                >
                  <option>Documentado - Aguardando Protótipo</option>
                  <option>Em Prototipação</option>
                  <option>Protótipo Pronto</option>
                  <option>Em Desenvolvimento</option>
                  <option>Concluído</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '2px solid #f0f0f0'}}>
            <h2 style={{color: '#667eea', marginBottom: '1.5rem', fontSize: '1.5rem'}}>🎯 Objetivo</h2>
            <div style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333'}}>Descrição do Objetivo *</label>
              <textarea
                rows={4}
                placeholder="Descreva o que o usuário deseja alcançar..."
                value={journey.objetivo}
                onChange={(e) => handleInputChange('objetivo', e.target.value)}
                style={{width: '100%', padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem', resize: 'vertical', fontFamily: 'inherit'}}
              />
            </div>
          </div>

          <div style={{marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '2px solid #f0f0f0'}}>
            <h2 style={{color: '#667eea', marginBottom: '1.5rem', fontSize: '1.5rem'}}>✅ Necessidades do Usuário</h2>
            {journey.necessidades.map((nec, index) => (
              <div key={index} style={{display: 'flex', gap: '0.5rem', marginBottom: '0.75rem'}}>
                <input
                  type="text"
                  placeholder="Ex: Visualizar progresso da turma"
                  value={nec}
                  onChange={(e) => handleArrayChange('necessidades', index, e.target.value)}
                  style={{flex: 1, padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
                />
                {journey.necessidades.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('necessidades', index)}
                    style={{background: '#ff4444', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer'}}
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('necessidades')}
              style={{background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '1rem', fontWeight: 600}}
            >
              ➕ Adicionar Necessidade
            </button>
          </div>

          <div style={{marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '2px solid #f0f0f0'}}>
            <h2 style={{color: '#667eea', marginBottom: '1.5rem', fontSize: '1.5rem'}}>😓 Pontos de Dor</h2>
            {journey.painPoints.map((pain, index) => (
              <div key={index} style={{display: 'flex', gap: '0.5rem', marginBottom: '0.75rem'}}>
                <input
                  type="text"
                  placeholder="Ex: Modal intrusivo na primeira visita"
                  value={pain}
                  onChange={(e) => handleArrayChange('painPoints', index, e.target.value)}
                  style={{flex: 1, padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem'}}
                />
                {journey.painPoints.length > 1 && (
                  <button
                    onClick={() => removeArrayItem('painPoints', index)}
                    style={{background: '#ff4444', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer'}}
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('painPoints')}
              style={{background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '1rem', fontWeight: 600}}
            >
              ➕ Adicionar Pain Point
            </button>
          </div>

          <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
            <button
              onClick={generateMarkdown}
              disabled={!journey.id || !journey.titulo}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 700,
                cursor: journey.id && journey.titulo ? 'pointer' : 'not-allowed',
                opacity: journey.id && journey.titulo ? 1 : 0.5,
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
            >
              🚀 Gerar Markdown
            </button>
          </div>
        </div>

        {markdownOutput && (
          <div style={{background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid #f0f0f0'}}>
              <h2 style={{color: '#667eea', margin: 0}}>📄 Markdown Gerado</h2>
              <div style={{display: 'flex', gap: '1rem'}}>
                <button 
                  onClick={copyToClipboard}
                  style={{padding: '0.75rem 1.5rem', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', background: '#2196F3', color: 'white'}}
                >
                  📋 Copiar
                </button>
                <button 
                  onClick={downloadMarkdown}
                  style={{padding: '0.75rem 1.5rem', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', background: '#4CAF50', color: 'white'}}
                >
                  💾 Baixar .md
                </button>
              </div>
            </div>
            <pre style={{background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', overflowX: 'auto', fontFamily: "'Courier New', monospace", fontSize: '0.9rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>{markdownOutput}</pre>
          </div>
        )}
      </div>
    </Layout>
  );
}
