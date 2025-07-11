
import { useState } from 'react';
import { X } from 'lucide-react';
import { FileManager } from '@/lib/fileManager';

interface NewEntryModalProps {
  folderId: string;
  onClose: () => void;
  onSave: (fileName: string, content: string) => void;
}

const getTemplates = () => {
  const dates = FileManager.getFormattedDates();
  
  return {
    dde: {
      title: 'Documento de Decisión',
      template: `# Decisión: [Título de la Decisión]

## Contexto
Describe el contexto y la situación que requiere una decisión.

## Problema
¿Qué problema estamos tratando de resolver?

## Opciones Consideradas
1. Opción 1 - Descripción y pros/contras
2. Opción 2 - Descripción y pros/contras
3. Opción 3 - Descripción y pros/contras

## Decisión
¿Qué decidimos hacer y por qué?

## Consecuencias
- **Positivas:** Beneficios esperados
- **Negativas:** Desventajas o limitaciones
- **Riesgos:** Posibles problemas y mitigaciones

## Implementación
- **Fecha de implementación:** [A definir]
- **Responsables:** [A definir]
- **Recursos necesarios:** [A definir]

## Fecha de Decisión: ${dates.iso}
## Fecha de Creación: ${dates.readable} a las ${dates.time}
## Estado: Propuesta | Aceptada | Rechazada | Obsoleta
## Última Actualización: ${dates.iso}

## Notas Adicionales
Cualquier información adicional relevante para la decisión.`
    },
    planificacion: {
      title: 'Plan de Proyecto',
      template: `# Plan: [Nombre del Plan]

## Objetivo
Describe el objetivo principal del plan.

## Cronograma
- **Fecha de inicio:** ${dates.iso}
- **Fecha estimada de fin:** [A definir]
- **Duración estimada:** [A definir]

## Fases del Proyecto
### Fase 1: [Nombre de la fase]
- **Duración:** [X semanas]
- **Objetivos:**
  - Objetivo 1
  - Objetivo 2

### Fase 2: [Nombre de la fase]
- **Duración:** [X semanas]
- **Objetivos:**
  - Objetivo 1
  - Objetivo 2

## Recursos Necesarios
- **Personas:** Listado de roles y responsabilidades
- **Herramientas:** Software y tecnologías necesarias
- **Presupuesto:** Estimación de costos

## Hitos Importantes
- [ ] Hito 1 - Fecha: [A definir]
- [ ] Hito 2 - Fecha: [A definir]
- [ ] Hito 3 - Fecha: [A definir]

## Riesgos Identificados
1. **Riesgo 1:** Descripción y plan de mitigación
2. **Riesgo 2:** Descripción y plan de mitigación

## Fecha de Creación: ${dates.readable} a las ${dates.time}
## Última Revisión: ${dates.iso}
## Estado: En Planificación | En Progreso | Completado | Cancelado`
    },
    arquitectura: {
      title: 'Documento de Arquitectura',
      template: `# Arquitectura: [Nombre del Sistema]

## Visión General
Descripción de alto nivel del sistema y su propósito.

## Componentes Principales
1. **Componente 1** - Descripción y responsabilidades
2. **Componente 2** - Descripción y responsabilidades
3. **Componente 3** - Descripción y responsabilidades

## Patrones de Diseño Aplicados
- **Patrón 1:** Justificación y contexto de uso
- **Patrón 2:** Justificación y contexto de uso

## Stack Tecnológico
- **Frontend:** Tecnologías del lado del cliente
- **Backend:** Tecnologías del lado del servidor
- **Base de datos:** Sistema de gestión de datos
- **Infraestructura:** Plataformas y servicios

## Decisiones Arquitectónicas
### Decisión 1: [Título]
- **Fecha:** ${dates.iso}
- **Contexto:** [Descripción]
- **Decisión:** [Qué se decidió]
- **Rationale:** [Por qué se decidió]

## Diagramas
[Insertar diagramas de arquitectura, flujo de datos, etc.]

## Consideraciones No Funcionales
- **Escalabilidad:** Estrategias para manejar crecimiento
- **Seguridad:** Medidas de protección implementadas
- **Performance:** Objetivos y métricas de rendimiento

## Fecha de Creación: ${dates.readable} a las ${dates.time}
## Versión: 1.0
## Última Actualización: ${dates.iso}
## Estado: En Desarrollo | Aprobada | Obsoleta`
    },
    requisitos: {
      title: 'Requisitos del Sistema',
      template: `# Requisitos: [Nombre del Módulo/Sistema]

## Información General
- **Fecha de creación:** ${dates.readable} a las ${dates.time}
- **Versión:** 1.0
- **Última actualización:** ${dates.iso}

## Requisitos Funcionales
### RF-01: [Nombre del requisito]
- **Descripción:** Descripción detallada del requisito
- **Prioridad:** Alta | Media | Baja
- **Fuente:** Stakeholder que solicita el requisito
- **Criterios de aceptación:**
  - [ ] Criterio 1
  - [ ] Criterio 2

### RF-02: [Nombre del requisito]
- **Descripción:** Descripción detallada del requisito
- **Prioridad:** Alta | Media | Baja
- **Fuente:** Stakeholder que solicita el requisito

## Requisitos No Funcionales
### RNF-01: Performance
- **Descripción:** Tiempos de respuesta esperados
- **Métrica:** [Valor específico]
- **Fecha límite de implementación:** [A definir]

### RNF-02: Usabilidad
- **Descripción:** Facilidad de uso del sistema
- **Métrica:** [Valor específico]

## Casos de Uso
### CU-01: [Nombre del caso de uso]
- **Actor:** Usuario tipo
- **Precondiciones:** Condiciones previas necesarias
- **Flujo principal:**
  1. Paso 1
  2. Paso 2
  3. Paso 3
- **Postcondiciones:** Resultado esperado

## Matriz de Trazabilidad
| Requisito | Caso de Uso | Fecha de Implementación | Estado |
|-----------|-------------|-------------------------|---------|
| RF-01     | CU-01       | [A definir]            | Pendiente |

## Historial de Cambios
| Fecha | Versión | Cambio | Responsable |
|-------|---------|---------|-------------|
| ${dates.iso} | 1.0 | Creación inicial | [Nombre] |`
    },
    equipo: {
      title: 'Documento de Equipo',
      template: `# Reunión de Equipo: [Tema]

## Información de la Reunión
- **Fecha:** ${dates.readable}
- **Hora:** ${dates.time}
- **Duración:** [Estimada/Real]
- **Tipo:** Planificación | Seguimiento | Retrospectiva | Técnica

## Participantes
- **[Nombre 1]** - Rol/Responsabilidad
- **[Nombre 2]** - Rol/Responsabilidad
- **[Nombre 3]** - Rol/Responsabilidad

## Agenda
1. **Revisión de avances** (15 min)
2. **Discusión de bloqueadores** (20 min)
3. **Planificación próximas tareas** (15 min)
4. **Q&A y temas varios** (10 min)

## Temas Tratados
### Tema 1: [Título]
- **Descripción:** Resumen de lo discutido
- **Decisiones:** Decisiones tomadas
- **Tiempo dedicado:** [X minutos]

### Tema 2: [Título]
- **Descripción:** Resumen de lo discutido
- **Decisiones:** Decisiones tomadas

## Decisiones Tomadas
1. **Decisión 1:** Descripción y contexto
   - **Responsable:** [Nombre]
   - **Fecha límite:** [Fecha]
   
2. **Decisión 2:** Descripción y contexto
   - **Responsable:** [Nombre]
   - **Fecha límite:** [Fecha]

## Acciones Pendientes
- [ ] **Acción 1** - Responsable: [Nombre] - Fecha límite: [Fecha]
- [ ] **Acción 2** - Responsable: [Nombre] - Fecha límite: [Fecha]
- [ ] **Acción 3** - Responsable: [Nombre] - Fecha límite: [Fecha]

## Próxima Reunión
- **Fecha propuesta:** [Fecha]
- **Temas a tratar:** 
  - Revisión de acciones pendientes
  - [Otros temas]

## Notas Adicionales
Espacio para comentarios, observaciones o temas que requieren seguimiento.

---
**Documento creado:** ${dates.readable} a las ${dates.time}
**Última modificación:** ${dates.iso}`
    },
    ideas: {
      title: 'Lluvia de Ideas',
      template: `# Brainstorming: [Tema]

## Información de la Sesión
- **Fecha:** ${dates.readable}
- **Hora:** ${dates.time}
- **Facilitador:** [Nombre]
- **Participantes:** [Lista de participantes]

## Objetivo
Definir claramente qué se busca lograr con esta sesión de ideas.

## Contexto
Información de fondo necesaria para enmarcar las ideas.

## Por hacer
- [ ] **Idea 1:** Descripción detallada
  - Beneficios potenciales
  - Recursos necesarios
  - Fecha estimada de evaluación: [Fecha]

- [ ] **Idea 2:** Descripción detallada
  - Beneficios potenciales
  - Recursos necesarios
  - Fecha estimada de evaluación: [Fecha]

- [ ] **Idea 3:** Descripción detallada
  - Beneficios potenciales
  - Recursos necesarios

## En proceso
- [ ] **Idea en desarrollo 1:** Descripción y estado actual
  - Progreso: [X%]
  - Responsable: [Nombre]
  - Fecha estimada de finalización: [Fecha]

## Hecho
- [x] **Idea implementada 1** - Completada el ${dates.iso}
  - Resultados obtenidos
  - Lecciones aprendidas

## Ideas Descartadas
### Idea X: [Título]
- **Razón del descarte:** Explicación de por qué no se siguió adelante
- **Fecha de descarte:** [Fecha]

## Próximos Pasos
1. **Priorización de ideas** - Fecha: [A definir]
2. **Análisis de viabilidad** - Fecha: [A definir]
3. **Asignación de recursos** - Fecha: [A definir]

## Métricas de Éxito
- Métrica 1: [Descripción]
- Métrica 2: [Descripción]

---
**Sesión creada:** ${dates.readable} a las ${dates.time}
**Última actualización:** ${dates.iso}
**Próxima revisión:** [Fecha sugerida]`
    }
  };
};

export const NewEntryModal = ({ folderId, onClose, onSave }: NewEntryModalProps) => {
  const [title, setTitle] = useState('');
  
  const templates = getTemplates();
  const template = templates[folderId as keyof typeof templates] || templates.dde;

  const handleSave = () => {
    if (!title.trim()) return;
    
    const dates = FileManager.getFormattedDates();
    const fileName = `${folderId.toUpperCase()}_${dates.iso}_${title.replace(/\s+/g, '_')}.md`;
    const content = template.template.replace(/\[Título de la Decisión\]/g, title)
                                   .replace(/\[Nombre del Plan\]/g, title)
                                   .replace(/\[Nombre del Sistema\]/g, title)
                                   .replace(/\[Nombre del Módulo\/Sistema\]/g, title)
                                   .replace(/\[Nombre del Módulo\]/g, title)
                                   .replace(/\[Tema\]/g, title);
    
    onSave(fileName, content);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Nueva {template.title}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Ingresa el título..."
              autoFocus
            />
          </div>

          <div className="text-xs text-slate-400 bg-slate-800 p-3 rounded">
            <strong>Fechas automáticas incluidas:</strong>
            <br />• Fecha de creación: {FileManager.getFormattedDates().readable}
            <br />• Timestamp: {FileManager.getFormattedDates().iso}
            <br />• Hora: {FileManager.getFormattedDates().time}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              Crear Documento
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
