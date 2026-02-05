/**
 * Componente de ícones Material Symbols para Docusaurus
 * Referência: https://fonts.google.com/icons?icon.style=Outlined
 * 
 * TAMANHOS PADRÃO:
 * - Inline text: 20px (1.1rem equivalent)
 * - Tables: 22px (destaque)
 * - H2 headers: 24px
 * - H1 headers: 28px
 */
import React from 'react';

// Componente base para Material Symbols
export const MaterialIcon = ({ name, size = 20, color, className = '', style = {} }) => (
  <span 
    className={`material-symbols-outlined ${className}`}
    style={{ 
      fontSize: size, 
      color: color,
      verticalAlign: 'middle',
      lineHeight: 1,
      ...style 
    }}
  >
    {name}
  </span>
);

// ============================================
// STATUS E INDICADORES
// ============================================

// ✅ Check/Concluído
export const IconCheck = ({ size = 20, className = '' }) => (
  <MaterialIcon name="check_circle" size={size} color="#28C76F" className={className} />
);

// ❌ X/Erro
export const IconX = ({ size = 20, className = '' }) => (
  <MaterialIcon name="cancel" size={size} color="#EA5455" className={className} />
);

// ⚠️ Alerta
export const IconWarning = ({ size = 20, className = '' }) => (
  <MaterialIcon name="warning" size={size} color="#FF9F43" className={className} />
);

// 🚧 Em construção
export const IconConstruction = ({ size = 20, className = '' }) => (
  <MaterialIcon name="construction" size={size} color="#FF9F43" className={className} />
);

// ⏳ Pendente
export const IconPending = ({ size = 20, className = '' }) => (
  <MaterialIcon name="hourglass_empty" size={size} color="#7367F0" className={className} />
);

// 🔄 Refresh/Ciclo
export const IconRefresh = ({ size = 20, className = '' }) => (
  <MaterialIcon name="sync" size={size} color="#00CFE8" className={className} />
);

// ============================================
// PRIORIDADES (Círculos Coloridos)
// Tamanho padrão: 16px para boa visibilidade
// ============================================

// 🔴 Alta prioridade
export const IconCircleRed = ({ size = 16, className = '' }) => (
  <MaterialIcon name="circle" size={size} color="#EA5455" className={`priority-circle ${className}`} />
);

// 🟡 Média prioridade
export const IconCircleYellow = ({ size = 16, className = '' }) => (
  <MaterialIcon name="circle" size={size} color="#FF9F43" className={`priority-circle ${className}`} />
);

// 🟢 Baixa prioridade
export const IconCircleGreen = ({ size = 16, className = '' }) => (
  <MaterialIcon name="circle" size={size} color="#28C76F" className={`priority-circle ${className}`} />
);

// ============================================
// PERSONAS E USUÁRIOS
// ============================================

// 👨‍🏫 Professor
export const IconTeacher = ({ size = 20, className = '' }) => (
  <MaterialIcon name="school" size={size} color="#7367F0" className={className} />
);

// 👨‍💼 Admin/Gestor
export const IconAdmin = ({ size = 20, className = '' }) => (
  <MaterialIcon name="admin_panel_settings" size={size} color="#7367F0" className={className} />
);

// 👨‍🎓 Estudante
export const IconStudent = ({ size = 20, className = '' }) => (
  <MaterialIcon name="person" size={size} color="#7367F0" className={className} />
);

// 🎓 Graduação/Educação
export const IconGraduation = ({ size = 20, className = '' }) => (
  <MaterialIcon name="school" size={size} color="#7367F0" className={className} />
);

// ============================================
// NAVEGAÇÃO E UI
// ============================================

// 🏠 Home
export const IconHome = ({ size = 20, className = '' }) => (
  <MaterialIcon name="home" size={size} className={className} />
);

// 🔗 Link
export const IconLink = ({ size = 20, className = '' }) => (
  <MaterialIcon name="link" size={size} color="#00CFE8" className={className} />
);

// 🔍 Busca
export const IconSearch = ({ size = 20, className = '' }) => (
  <MaterialIcon name="search" size={size} className={className} />
);

// 👁️ Visualizar
export const IconEye = ({ size = 20, className = '' }) => (
  <MaterialIcon name="visibility" size={size} className={className} />
);

// ⚙️ Configurações
export const IconSettings = ({ size = 20, className = '' }) => (
  <MaterialIcon name="settings" size={size} className={className} />
);

// ============================================
// CONTEÚDO E DOCUMENTAÇÃO
// ============================================

// 📚 Livros/Biblioteca
export const IconBooks = ({ size = 20, className = '' }) => (
  <MaterialIcon name="menu_book" size={size} color="#7367F0" className={className} />
);

// 📖 Livro aberto
export const IconBookOpen = ({ size = 20, className = '' }) => (
  <MaterialIcon name="auto_stories" size={size} color="#7367F0" className={className} />
);

// 📋 Clipboard/Tarefas
export const IconClipboard = ({ size = 20, className = '' }) => (
  <MaterialIcon name="assignment" size={size} color="#7367F0" className={className} />
);

// 📝 Editar/Nota
export const IconEdit = ({ size = 20, className = '' }) => (
  <MaterialIcon name="edit_note" size={size} className={className} />
);

// 📄 Documento
export const IconDocument = ({ size = 20, className = '' }) => (
  <MaterialIcon name="description" size={size} className={className} />
);

// ============================================
// DADOS E ANÁLISE
// ============================================

// 📊 Gráfico de barras
export const IconChart = ({ size = 20, className = '' }) => (
  <MaterialIcon name="bar_chart" size={size} color="#7367F0" className={className} />
);

// 📈 Tendência
export const IconTrending = ({ size = 20, className = '' }) => (
  <MaterialIcon name="trending_up" size={size} color="#28C76F" className={className} />
);

// 🎯 Alvo/Meta
export const IconTarget = ({ size = 20, className = '' }) => (
  <MaterialIcon name="gps_fixed" size={size} color="#EA5455" className={className} />
);

// ============================================
// FUNCIONALIDADES
// ============================================

// 🎮 Game/Jogos
export const IconGame = ({ size = 20, className = '' }) => (
  <MaterialIcon name="sports_esports" size={size} color="#7367F0" className={className} />
);

// 💡 Ideia/Dica
export const IconLightbulb = ({ size = 20, className = '' }) => (
  <MaterialIcon name="lightbulb" size={size} color="#FF9F43" className={className} />
);

// ✨ Destaque/Novo
export const IconSparkle = ({ size = 20, className = '' }) => (
  <MaterialIcon name="auto_awesome" size={size} color="#FF9F43" className={className} />
);

// 🚀 Lançamento
export const IconRocket = ({ size = 20, className = '' }) => (
  <MaterialIcon name="rocket_launch" size={size} color="#7367F0" className={className} />
);

// 🎨 Design/Paleta
export const IconPalette = ({ size = 20, className = '' }) => (
  <MaterialIcon name="palette" size={size} color="#7367F0" className={className} />
);

// ============================================
// ARQUITETURA E TÉCNICO
// ============================================

// 📐 Arquitetura/Estrutura
export const IconArchitecture = ({ size = 20, className = '' }) => (
  <MaterialIcon name="architecture" size={size} color="#7367F0" className={className} />
);

// 🧩 Componentes/Módulos
export const IconExtension = ({ size = 20, className = '' }) => (
  <MaterialIcon name="extension" size={size} color="#7367F0" className={className} />
);

// 🔌 API/Integração
export const IconApi = ({ size = 20, className = '' }) => (
  <MaterialIcon name="electrical_services" size={size} color="#00CFE8" className={className} />
);

// 🛣️ Rotas
export const IconRoute = ({ size = 20, className = '' }) => (
  <MaterialIcon name="route" size={size} color="#7367F0" className={className} />
);

// 🗄️ Storage/Database
export const IconStorage = ({ size = 20, className = '' }) => (
  <MaterialIcon name="storage" size={size} color="#7367F0" className={className} />
);

// ============================================
// COMUNICAÇÃO
// ============================================

// 📞 Contato
export const IconPhone = ({ size = 20, className = '' }) => (
  <MaterialIcon name="call" size={size} className={className} />
);

// 📡 API/Conexão
export const IconAntenna = ({ size = 20, className = '' }) => (
  <MaterialIcon name="cell_tower" size={size} color="#00CFE8" className={className} />
);

// 🌐 Web/Global
export const IconGlobe = ({ size = 20, className = '' }) => (
  <MaterialIcon name="public" size={size} color="#00CFE8" className={className} />
);

// ============================================
// COLABORAÇÃO
// ============================================

// 🤝 Parceria
export const IconHandshake = ({ size = 20, className = '' }) => (
  <MaterialIcon name="handshake" size={size} color="#28C76F" className={className} />
);

// 🐙 GitHub/Código
export const IconCode = ({ size = 20, className = '' }) => (
  <MaterialIcon name="code" size={size} className={className} />
);

// 📸 Screenshot/Imagem
export const IconCamera = ({ size = 20, className = '' }) => (
  <MaterialIcon name="photo_camera" size={size} className={className} />
);

// ============================================
// COMPONENTES COMPOSTOS (Status + Texto)
// ============================================

// Status: Concluído/Documentado
export const StatusDone = ({ children = 'Documentado' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
    <IconCheck size={16} />
    <span>{children}</span>
  </span>
);

// Status: Em progresso
export const StatusProgress = ({ children = 'Em progresso' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
    <IconConstruction size={16} />
    <span>{children}</span>
  </span>
);

// Status: Planejado/Pendente
export const StatusPlanned = ({ children = 'Planejado' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
    <IconPending size={16} />
    <span>{children}</span>
  </span>
);

// Prioridade: Alta
export const PriorityHigh = ({ children = 'Alta' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
    <IconCircleRed size={12} />
    <span>{children}</span>
  </span>
);

// Prioridade: Média
export const PriorityMedium = ({ children = 'Média' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
    <IconCircleYellow size={12} />
    <span>{children}</span>
  </span>
);

// Prioridade: Baixa
export const PriorityLow = ({ children = 'Baixa' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
    <IconCircleGreen size={12} />
    <span>{children}</span>
  </span>
);

// Export default para compatibilidade
export default {
  MaterialIcon,
  // Status
  IconCheck, IconX, IconWarning, IconConstruction, IconPending, IconRefresh,
  // Prioridades
  IconCircleRed, IconCircleYellow, IconCircleGreen,
  // Personas
  IconTeacher, IconAdmin, IconStudent, IconGraduation,
  // Navegação
  IconHome, IconLink, IconSearch, IconEye, IconSettings,
  // Conteúdo
  IconBooks, IconBookOpen, IconClipboard, IconEdit, IconDocument,
  // Dados
  IconChart, IconTrending, IconTarget,
  // Funcionalidades
  IconGame, IconLightbulb, IconSparkle, IconRocket, IconPalette,
  // Arquitetura
  IconArchitecture, IconExtension, IconApi, IconRoute, IconStorage,
  // Comunicação
  IconPhone, IconAntenna, IconGlobe,
  // Colaboração
  IconHandshake, IconCode, IconCamera,
  // Compostos
  StatusDone, StatusProgress, StatusPlanned,
  PriorityHigh, PriorityMedium, PriorityLow,
};

