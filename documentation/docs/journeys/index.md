---
sidebar_position: 1
title: Catálogo de Jornadas
---
import TeacherIcon from '@site/static/img/icons/teacher.svg';
import StudentIcon from '@site/static/img/icons/student.svg';
import AdminIcon from '@site/static/img/icons/admin.svg';
import CoordinatorIcon from '@site/static/img/icons/coordinator.svg';
import DirectorIcon from '@site/static/img/icons/director.svg';
import AuditorIcon from '@site/static/img/icons/auditor.svg';
import { IconChart } from '@site/src/components/StatusIcons';

# Catálogo de Jornadas

Mapeamento completo de todas as jornadas do Educacross, organizadas pelos novos perfis de usuários definidos na arquitetura.

---

## <IconChart size={24} /> Resumo

| Perfil | Total | Documentadas |
|--------|-------|--------------|
| [<TeacherIcon width="20" style={{verticalAlign: 'text-bottom'}} /> Professor](#professor) | 11 | 11 |
| [<StudentIcon width="20" style={{verticalAlign: 'text-bottom'}} /> Aluno](#aluno) | 3 | 1 |
| [<AdminIcon width="20" style={{verticalAlign: 'text-bottom'}} /> Administrador](#administrador) | 1 | 1 |
| [<CoordinatorIcon width="20" style={{verticalAlign: 'text-bottom'}} /> Coordenador](#coordenador) | 3 | 3 |
| [<DirectorIcon width="20" style={{verticalAlign: 'text-bottom'}} /> Diretor](#diretor) | 1 | 1 |
| [<img src={require('@site/static/img/icons/network.png').default} alt="Gestor de Rede" width="20" style={{verticalAlign: 'text-bottom'}} /> Gestor de Rede](#gestor-de-rede) | 1 | 1 |
| [<AuditorIcon width="20" style={{verticalAlign: 'text-bottom'}} /> Auditor](#auditor) | 1 | 1 |

---

## <TeacherIcon width="30" style={{verticalAlign: 'middle'}} /> Professor

Jornadas focadas na gestão de sala de aula e ensino.

| ID | Jornada | Categoria | Link |
|----|---------|-----------|------|
| PROF-001 | Acesso e Login | Acesso | [Ver Detalhe](./teacher/login-flow) |
| PROF-002 | Gestão de Missões | Ensino | [Ver Detalhe](./teacher/mission-management) |
| PROF-003 | Relatórios de Turma | Acompanhamento | [Ver Detalhe](./teacher/class-reports) |
| PROF-004 | Gestão de Eventos | Ensino | [Ver Detalhe](./teacher/events-management) |
| PROF-005 | Criar Missão do Zero | Ensino | [Ver Detalhe](./teacher/create-mission-scratch) |
| PROF-006 | Consultar Livros | Conteúdo | [Ver Detalhe](./teacher/book-consultation) |
| PROF-007 | Meus Jogos (Avaliar/Jogar) | Conteúdo | [Ver Detalhe](./teacher/my-games) |
| PROF-008 | Relatório de Desempenho | Acompanhamento | [Ver Detalhe](./teacher/performance-report) |
| PROF-009 | Relatório de Alunos | Acompanhamento | [Ver Detalhe](./teacher/student-report) |
| PROF-010 | Relatório de Habilidades | Acompanhamento | [Ver Detalhe](./teacher/skills-report) |
| PROF-011 | Lista de Alunos | Gestão | [Ver Detalhe](./teacher/students-list) |

---

## <StudentIcon width="30" style={{verticalAlign: 'middle'}} /> Aluno

Jornadas do estudante na plataforma gamificada.

| ID | Jornada | Categoria | Link |
|----|---------|-----------|------|
| STD-001 | Realizar Missão | Engajamento | [Ver Detalhe](./student/mission-execution) |
| STD-002 | Personalizar Avatar | Engajamento | (Pendente) |
| STD-003 | Ver Conquistas | Engajamento | (Pendente) |

---

## <AdminIcon width="30" style={{verticalAlign: 'middle'}} /> Administrador

Jornadas técnicas e operacionais da escola.

| ID | Jornada | Categoria | Link |
|----|---------|-----------|------|
| ADM-001 | Gestão de Usuários e Acessos | Operacional | [Ver Detalhe](./administrator/user-management) |

---

## <CoordinatorIcon width="30" style={{verticalAlign: 'middle'}} /> Coordenador

Jornadas de acompanhamento pedagógico.

| ID | Jornada | Categoria | Link |
|----|---------|-----------|------|
| COORD-001 | Relatório de Missões | Pedagógico | [Ver Detalhe](./coordinator/mission-reports) |
| COORD-002 | Relatório de Evidências | Pedagógico | [Ver Detalhe](./coordinator/evidence-report) |
| COORD-003 | Relatório de Competências | Pedagógico | [Ver Detalhe](./coordinator/skill-report) |

---

## <DirectorIcon width="30" style={{verticalAlign: 'middle'}} /> Diretor

Jornadas de gestão estratégica e macro-indicadores.

| ID | Jornada | Categoria | Link |
|----|---------|-----------|------|
| DIR-001 | Relatório de Acesso Escolar | Estratégico | [Ver Detalhe](./director/student-access-report) |

---

## <img src={require('@site/static/img/icons/network.png').default} alt="Gestor de Rede" width="30" style={{verticalAlign: 'middle'}} /> Gestor de Rede

Jornadas de gestão multi-escola.

| ID | Jornada | Categoria | Link |
|----|---------|-----------|------|
| REDE-001 | Gestão de Rede | Estratégico | [Ver Detalhe](./network-manager/network-management) |

---

## <AuditorIcon width="30" style={{verticalAlign: 'middle'}} /> Auditor

Perfil especializado em verificação de integridade/qualidade.

| ID | Jornada | Categoria | Link |
|----|---------|-----------|------|
| AUD-001 | Auditoria de Conteúdo | Qualidade | (Consulte documentação específica) |
