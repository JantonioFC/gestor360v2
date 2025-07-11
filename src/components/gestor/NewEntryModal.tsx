
import { useState } from 'react';
import { X } from 'lucide-react';

interface NewEntryModalProps {
  folderId: string;
  onClose: () => void;
  onSave: (fileName: string, content: string) => void;
}

const templates = {
  dde: {
    title: 'Documento de Decisión',
    template: `# Decisión: [Título de la Decisión]

## Contexto
Describe el contexto y la situación que requiere una decisión.

## Problema
¿Qué problema estamos tratando de resolver?

## Opciones Consideradas
1. Opción 1
2. Opción 2
3. Opción 3

## Decisión
¿Qué decidimos hacer?

## Consecuencias
- Positivas:
- Negativas:
- Riesgos:

## Fecha: ${new Date().toISOString().split('T')[0]}
## Estado: Propuesta | Aceptada | Rechazada | Obsoleta`
  },
  planificacion: {
    title: 'Plan de Proyecto',
    template: `# Plan: [Nombre del Plan]

## Objetivo
Describe el objetivo principal del plan.

## Alcance
- Incluye:
- No incluye:

## Cronograma
- Fase 1:
- Fase 2:
- Fase 3:

## Recursos Necesarios
- Personas:
- Herramientas:
- Presupuesto:

## Riesgos
- Riesgo 1:
- Riesgo 2:

## Fecha: ${new Date().toISOString().split('T')[0]}`
  },
  arquitectura: {
    title: 'Documento de Arquitectura',
    template: `# Arquitectura: [Nombre del Sistema]

## Visión General
Descripción de alto nivel del sistema.

## Componentes Principales
1. Componente 1
2. Componente 2
3. Componente 3

## Patrones de Diseño
- Patrón 1:
- Patrón 2:

## Tecnologías
- Frontend:
- Backend:
- Base de datos:
- Infraestructura:

## Diagrama
[Insertar diagrama o referencia]

## Fecha: ${new Date().toISOString().split('T')[0]}`
  },
  requisitos: {
    title: 'Requisitos del Sistema',
    template: `# Requisitos: [Nombre del Módulo]

## Requisitos Funcionales
1. RF-01: 
2. RF-02:
3. RF-03:

## Requisitos No Funcionales
1. RNF-01: 
2. RNF-02:
3. RNF-03:

## Casos de Uso
- CU-01:
- CU-02:

## Criterios de Aceptación
- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3

## Fecha: ${new Date().toISOString().split('T')[0]}`
  },
  equipo: {
    title: 'Documento de Equipo',
    template: `# Equipo: [Tema]

## Participantes
- Nombre 1 - Rol
- Nombre 2 - Rol
- Nombre 3 - Rol

## Agenda
1. Punto 1
2. Punto 2
3. Punto 3

## Decisiones Tomadas
- Decisión 1:
- Decisión 2:

## Acciones Pendientes
- [ ] Acción 1 - Responsable - Fecha
- [ ] Acción 2 - Responsable - Fecha

## Próxima Reunión
Fecha: 
Agenda:

## Fecha: ${new Date().toISOString().split('T')[0]}`
  },
  ideas: {
    title: 'Lluvia de Ideas',
    template: `# Ideas: [Tema]

## Por hacer
- [ ] Idea 1
- [ ] Idea 2
- [ ] Idea 3

## En proceso
- [ ] Idea en desarrollo 1

## Hecho
- [x] Idea implementada 1

## Notas Adicionales
Espacio para comentarios y observaciones.

## Fecha: ${new Date().toISOString().split('T')[0]}`
  }
};

export const NewEntryModal = ({ folderId, onClose, onSave }: NewEntryModalProps) => {
  const [title, setTitle] = useState('');
  
  const template = templates[folderId as keyof typeof templates] || templates.dde;

  const handleSave = () => {
    if (!title.trim()) return;
    
    const fileName = `${folderId.toUpperCase()}_${new Date().toISOString().split('T')[0]}_${title.replace(/\s+/g, '_')}.md`;
    const content = template.template.replace('[Título de la Decisión]', title)
                                   .replace('[Nombre del Plan]', title)
                                   .replace('[Nombre del Sistema]', title)
                                   .replace('[Nombre del Módulo]', title)
                                   .replace('[Tema]', title);
    
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
