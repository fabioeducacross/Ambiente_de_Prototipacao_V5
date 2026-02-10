import { computed } from 'vue'

/**
 * Composable para lógica compartilhada do calendário
 */
export function useCalendar() {
  
  // Cores por tipo de atividade (Vuexy palette)
  const activityColors = {
    missao: '#7367F0',      // Roxo (primary)
    olimpiada: '#00CFE8',   // Ciano (info)
    avaliacao: '#FF9F43',   // Laranja (warning)
    trilha: '#28C76F',      // Verde (success)
    expedicao: '#EA5455',   // Vermelho (danger)
    outro: '#82868B'        // Cinza (secondary)
  }

  // Ícones Bootstrap por tipo de atividade
  const activityIcons = {
    missao: 'bi-target',
    olimpiada: 'bi-trophy',
    avaliacao: 'bi-clipboard-check',
    trilha: 'bi-bezier',
    expedicao: 'bi-compass',
    outro: 'bi-calendar-event'
  }

  // Labels amigáveis
  const activityLabels = {
    missao: 'Missão',
    olimpiada: 'Olimpíada',
    avaliacao: 'Avaliação',
    trilha: 'Trilha',
    expedicao: 'Expedição',
    outro: 'Outro'
  }

  /**
   * Retorna cor da atividade
   */
  const getActivityColor = (tipo) => {
    return activityColors[tipo] || activityColors.outro
  }

  /**
   * Retorna ícone da atividade
   */
  const getActivityIcon = (tipo) => {
    return activityIcons[tipo] || activityIcons.outro
  }

  /**
   * Retorna label da atividade
   */
  const getActivityLabel = (tipo) => {
    return activityLabels[tipo] || 'Outro'
  }

  /**
   * Filtra eventos por data específica
   */
  const getEventsForDate = (events, date, turma = null) => {
    if (!Array.isArray(events)) return []
    
    const targetDate = new Date(date)
    targetDate.setHours(0, 0, 0, 0)
    
    return events.filter(event => {
      const eventStart = new Date(event.dataInicio)
      const eventEnd = new Date(event.dataTermino)
      eventStart.setHours(0, 0, 0, 0)
      eventEnd.setHours(0, 0, 0, 0)
      
      const isInDateRange = targetDate >= eventStart && targetDate <= eventEnd
      const matchesTurma = !turma || !event.turmas || event.turmas.includes(turma)
      
      return isInDateRange && matchesTurma
    })
  }

  /**
   * Filtra eventos por semana
   */
  const getEventsForWeek = (events, date, turma = null) => {
    if (!Array.isArray(events)) return []
    
    const startOfWeek = new Date(date)
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
    startOfWeek.setHours(0, 0, 0, 0)
    
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    
    return events.filter(event => {
      const eventStart = new Date(event.dataInicio)
      const eventEnd = new Date(event.dataTermino)
      
      const overlaps = eventStart <= endOfWeek && eventEnd >= startOfWeek
      const matchesTurma = !turma || !event.turmas || event.turmas.includes(turma)
      
      return overlaps && matchesTurma
    })
  }

  /**
   * Filtra eventos por mês
   */
  const getEventsForMonth = (events, date, turma = null) => {
    if (!Array.isArray(events)) return []
    
    const year = date.getFullYear()
    const month = date.getMonth()
    
    const startOfMonth = new Date(year, month, 1, 0, 0, 0, 0)
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999)
    
    return events.filter(event => {
      const eventStart = new Date(event.dataInicio)
      const eventEnd = new Date(event.dataTermino)
      
      const overlaps = eventStart <= endOfMonth && eventEnd >= startOfMonth
      const matchesTurma = !turma || !event.turmas || event.turmas.includes(turma)
      
      return overlaps && matchesTurma
    })
  }

  /**
   * Gera array de dias do mês (grid 7x6)
   */
  const getMonthDays = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    const firstDayOfWeek = firstDay.getDay() // 0 = domingo
    const daysInMonth = lastDay.getDate()
    
    const days = []
    
    // Dias do mês anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
        isPast: true
      })
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday: isToday(currentDate)
      })
    }
    
    // Dias do próximo mês (completar até 42 dias = 6 semanas)
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isFuture: true
      })
    }
    
    return days
  }

  /**
   * Verifica se data é hoje
   */
  const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  /**
   * Formata data para exibição
   */
  const formatDate = (date, format = 'short') => {
    const d = new Date(date)
    
    if (format === 'short') {
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    }
    
    if (format === 'long') {
      return d.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    }
    
    if (format === 'month-year') {
      return d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    }
    
    return d.toLocaleDateString('pt-BR')
  }

  /**
   * Gera dias da semana
   */
  const getWeekDays = (date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
    
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push({
        date: day,
        isToday: isToday(day)
      })
    }
    
    return days
  }

  /**
   * Agrupa eventos por período relativo (hoje, amanhã, esta semana, etc)
   */
  const groupEventsByPeriod = (events) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const weekEnd = new Date(today)
    weekEnd.setDate(weekEnd.getDate() + 7)
    
    const groups = {
      hoje: [],
      amanha: [],
      semana: [],
      futuro: []
    }
    
    events.forEach(event => {
      const eventDate = new Date(event.dataInicio)
      eventDate.setHours(0, 0, 0, 0)
      
      if (eventDate.getTime() === today.getTime()) {
        groups.hoje.push(event)
      } else if (eventDate.getTime() === tomorrow.getTime()) {
        groups.amanha.push(event)
      } else if (eventDate > tomorrow && eventDate <= weekEnd) {
        groups.semana.push(event)
      } else if (eventDate > weekEnd) {
        groups.futuro.push(event)
      }
    })
    
    return groups
  }

  return {
    // Dados
    activityColors,
    activityIcons,
    activityLabels,
    
    // Funções
    getActivityColor,
    getActivityIcon,
    getActivityLabel,
    getEventsForDate,
    getEventsForWeek,
    getEventsForMonth,
    getMonthDays,
    getWeekDays,
    formatDate,
    isToday,
    groupEventsByPeriod
  }
}
