/**
 * Componentes de ícones de status para substituir emojis na documentação
 * Usa ícones SVG consistentes do Design System Vuexy
 */
import React from 'react';

// Ícone de check/confirmação (substitui ✅)
export const IconCheck = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={`status-icon ${className}`}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <circle cx="10" cy="10" r="9" fill="#28C76F"/>
    <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Ícone de erro/recusa (substitui ❌)
export const IconX = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={`status-icon ${className}`}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <circle cx="10" cy="10" r="9" fill="#EA5455"/>
    <path d="M7 7L13 13M13 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Círculo vermelho - prioridade alta (substitui 🔴)
export const IconCircleRed = ({ size = 12, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <circle cx="8" cy="8" r="7" fill="#EA5455"/>
  </svg>
);

// Círculo amarelo - prioridade média (substitui 🟡)
export const IconCircleYellow = ({ size = 12, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <circle cx="8" cy="8" r="7" fill="#FF9F43"/>
  </svg>
);

// Ícone de alerta (substitui ⚠️)
export const IconWarning = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M10 2L18.66 17H1.34L10 2Z" fill="#FF9F43" stroke="#FF9F43" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M10 8V11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="10" cy="14" r="1" fill="white"/>
  </svg>
);

// Ícone de construção/em progresso (substitui 🚧)
export const IconConstruction = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <rect x="2" y="8" width="16" height="4" fill="#FF9F43"/>
    <rect x="2" y="8" width="4" height="4" fill="#2C2C2C"/>
    <rect x="10" y="8" width="4" height="4" fill="#2C2C2C"/>
    <rect x="6" y="12" width="4" height="4" fill="#2C2C2C"/>
    <rect x="14" y="12" width="4" height="4" fill="#2C2C2C"/>
    <rect x="2" y="12" width="4" height="4" fill="#FF9F43"/>
    <rect x="10" y="12" width="4" height="4" fill="#FF9F43"/>
    <rect x="6" y="8" width="4" height="4" fill="#FF9F43"/>
    <rect x="14" y="8" width="4" height="4" fill="#FF9F43"/>
    <rect x="2" y="16" width="16" height="2" fill="#FF9F43"/>
  </svg>
);

// Ícone de clipboard/planejado (substitui 📋)
export const IconClipboard = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <rect x="3" y="4" width="14" height="14" rx="2" fill="#7367F0" stroke="#7367F0" strokeWidth="1.5"/>
    <rect x="7" y="2" width="6" height="3" rx="1" fill="#5E50E8"/>
    <path d="M6 9H14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 12H11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Ícone de olho/visualizar (substitui 👁️ e 👀)
export const IconEye = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M10 4C5.5 4 2 10 2 10C2 10 5.5 16 10 16C14.5 16 18 10 18 10C18 10 14.5 4 10 4Z" fill="#00CFE8" stroke="#00CFE8" strokeWidth="1.5"/>
    <circle cx="10" cy="10" r="3" fill="white"/>
    <circle cx="10" cy="10" r="1.5" fill="#00CFE8"/>
  </svg>
);

// Ícone de casa (substitui 🏠)
export const IconHome = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M3 8L10 2L17 8V17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17V8Z" fill="#7367F0" stroke="#7367F0" strokeWidth="1.5" strokeLinejoin="round"/>
    <rect x="8" y="12" width="4" height="6" fill="white"/>
  </svg>
);

// Ícone de livro (substitui 📚)
export const IconBook = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M3 4C3 3.44772 3.44772 3 4 3H8C9.10457 3 10 3.89543 10 5V17C10 16.4477 9.55228 16 9 16H4C3.44772 16 3 15.5523 3 15V4Z" fill="#7367F0"/>
    <path d="M17 4C17 3.44772 16.5523 3 16 3H12C10.8954 3 10 3.89543 10 5V17C10 16.4477 10.4477 16 11 16H16C16.5523 16 17 15.5523 17 15V4Z" fill="#9E95F5"/>
  </svg>
);

// Ícone de alvo (substitui 🎯)
export const IconTarget = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <circle cx="10" cy="10" r="8" stroke="#EA5455" strokeWidth="2"/>
    <circle cx="10" cy="10" r="5" stroke="#EA5455" strokeWidth="2"/>
    <circle cx="10" cy="10" r="2" fill="#EA5455"/>
  </svg>
);

// Ícone de lâmpada (substitui 💡)
export const IconLightbulb = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M10 2C6.68629 2 4 4.68629 4 8C4 10.2208 5.2066 12.1599 7 13.1973V15C7 15.5523 7.44772 16 8 16H12C12.5523 16 13 15.5523 13 15V13.1973C14.7934 12.1599 16 10.2208 16 8C16 4.68629 13.3137 2 10 2Z" fill="#FF9F43"/>
    <rect x="7" y="17" width="6" height="2" rx="1" fill="#FF9F43"/>
  </svg>
);

// Ícone de gráfico (substitui 📊)
export const IconChart = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <rect x="2" y="10" width="4" height="8" rx="1" fill="#7367F0"/>
    <rect x="8" y="6" width="4" height="12" rx="1" fill="#28C76F"/>
    <rect x="14" y="2" width="4" height="16" rx="1" fill="#00CFE8"/>
  </svg>
);

// Ícone de gamepad (substitui 🎮)
export const IconGamepad = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <rect x="2" y="5" width="16" height="10" rx="3" fill="#7367F0"/>
    <rect x="5" y="8" width="4" height="1.5" rx="0.75" fill="white"/>
    <rect x="6.25" y="6.75" width="1.5" height="4" rx="0.75" fill="white"/>
    <circle cx="13" cy="8" r="1" fill="white"/>
    <circle cx="15" cy="10" r="1" fill="white"/>
  </svg>
);

// Ícone de engrenagem (substitui ⚙️)
export const IconGear = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z" fill="#82868B"/>
    <path d="M17.4 11L16.2 10.5C16.1 10.2 16.1 9.8 16.2 9.5L17.4 9C17.6 8.4 17.4 7.7 16.9 7.3L16 6.1C15.6 5.6 14.9 5.5 14.3 5.7L13.1 6.4C12.8 6.2 12.5 6.1 12.2 6L12 4.7C11.9 4 11.4 3.5 10.7 3.5H9.3C8.6 3.5 8.1 4 8 4.7L7.8 6C7.5 6.1 7.2 6.2 6.9 6.4L5.7 5.7C5.1 5.5 4.4 5.6 4 6.1L3.1 7.3C2.6 7.7 2.4 8.4 2.6 9L3.8 9.5C3.9 9.8 3.9 10.2 3.8 10.5L2.6 11C2.4 11.6 2.6 12.3 3.1 12.7L4 13.9C4.4 14.4 5.1 14.5 5.7 14.3L6.9 13.6C7.2 13.8 7.5 13.9 7.8 14L8 15.3C8.1 16 8.6 16.5 9.3 16.5H10.7C11.4 16.5 11.9 16 12 15.3L12.2 14C12.5 13.9 12.8 13.8 13.1 13.6L14.3 14.3C14.9 14.5 15.6 14.4 16 13.9L16.9 12.7C17.4 12.3 17.6 11.6 17.4 11Z" fill="#82868B"/>
  </svg>
);

// Ícone de lápis (substitui 📝)
export const IconPencil = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 20 20" 
    fill="none" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M14.5 3.5L16.5 5.5L6 16H4V14L14.5 3.5Z" fill="#7367F0" stroke="#7367F0" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12.5 5.5L14.5 7.5" stroke="white" strokeWidth="1.5"/>
  </svg>
);

// Componentes de status com texto
export const StatusDone = ({ children }) => (
  <span className="status-badge status-badge--done">
    <IconCheck size={14} />
    {children || 'Documentado'}
  </span>
);

export const StatusProgress = ({ children }) => (
  <span className="status-badge status-badge--progress">
    <IconConstruction size={14} />
    {children || 'Em progresso'}
  </span>
);

export const StatusPlanned = ({ children }) => (
  <span className="status-badge status-badge--planned">
    <IconClipboard size={14} />
    {children || 'Planejado'}
  </span>
);

export const PriorityHigh = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
    <IconCircleRed size={12} /> Alta
  </span>
);

export const PriorityMedium = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
    <IconCircleYellow size={12} /> Média
  </span>
);

// Export default com todos os ícones
export default {
  IconCheck,
  IconX,
  IconCircleRed,
  IconCircleYellow,
  IconWarning,
  IconConstruction,
  IconClipboard,
  IconEye,
  IconHome,
  IconBook,
  IconTarget,
  IconLightbulb,
  IconChart,
  IconGamepad,
  IconGear,
  IconPencil,
  StatusDone,
  StatusProgress,
  StatusPlanned,
  PriorityHigh,
  PriorityMedium,
};
