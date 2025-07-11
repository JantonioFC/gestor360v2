
// File Manager - Simulates file system operations using localStorage
export class FileManager {
  private static STORAGE_KEY = 'gestor360_files';

  // Get current date in various formats
  private static getCurrentDate() {
    const now = new Date();
    return {
      iso: now.toISOString().split('T')[0], // 2024-01-15
      timestamp: now.toISOString(), // 2024-01-15T10:30:00.000Z
      readable: now.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }), // lunes, 15 de enero de 2024
      time: now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }) // 10:30
    };
  }

  // Initialize with sample data if localStorage is empty
  static init() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      const currentDate = this.getCurrentDate();
      const sampleData = {
        dde: {
          'DDE_2024-01-01_Arquitectura_Base.md': {
            content: `# Decisión: Arquitectura Base del Sistema

## Contexto
Necesitamos definir la arquitectura base para el nuevo sistema de gestión.

## Problema
¿Qué arquitectura usar para garantizar escalabilidad y mantenibilidad?

## Opciones Consideradas
1. Arquitectura monolítica
2. Microservicios
3. Arquitectura modular

## Decisión
Optamos por una arquitectura modular que nos permita evolucionar gradualmente.

## Consecuencias
- Positivas: Flexibilidad, mantenibilidad
- Negativas: Complejidad inicial
- Riesgos: Curva de aprendizaje

## Fecha de Decisión: 2024-01-01
## Fecha de Creación: ${currentDate.readable} a las ${currentDate.time}
## Estado: Aceptada
## Última Actualización: ${currentDate.iso}`,
            createdAt: '2024-01-01',
            updatedAt: currentDate.iso,
            preview: 'Definición de la arquitectura base del sistema...'
          }
        },
        planificacion: {
          'PLAN_2024-01-02_Sprint_1.md': {
            content: `# Plan: Sprint 1 - Configuración Inicial

## Objetivo
Establecer la base técnica del proyecto.

## Fechas del Sprint
- **Inicio:** 2024-01-02
- **Fin:** 2024-01-16
- **Duración:** 2 semanas

## Por hacer
- [ ] Configurar repositorio
- [ ] Definir estructura de carpetas
- [ ] Crear documentación inicial

## En proceso
- [ ] Configurar pipeline CI/CD

## Hecho
- [x] Crear proyecto base - Completado el ${currentDate.iso}
- [x] Definir tecnologías - Completado el ${currentDate.iso}

## Fecha de Creación: ${currentDate.readable} a las ${currentDate.time}
## Última Revisión: ${currentDate.iso}`,
            createdAt: '2024-01-02',
            updatedAt: currentDate.iso,
            preview: 'Plan para el primer sprint del proyecto...'
          }
        },
        arquitectura: {},
        requisitos: {},
        equipo: {},
        ideas: {}
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sampleData));
    }
  }

  static getData() {
    this.init();
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  static saveData(data: any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  static getFiles(folderId: string): string[] {
    const data = this.getData();
    return Object.keys(data[folderId] || {});
  }

  static getFileContent(folderId: string, fileName: string): string {
    const data = this.getData();
    return data[folderId]?.[fileName]?.content || '';
  }

  static getFileMetadata(folderId: string, fileName: string) {
    const data = this.getData();
    const file = data[folderId]?.[fileName];
    const currentDate = this.getCurrentDate();
    
    return {
      createdAt: file?.createdAt || currentDate.iso,
      updatedAt: file?.updatedAt || currentDate.iso,
      preview: file?.preview || ''
    };
  }

  static saveFile(folderId: string, fileName: string, content: string) {
    const data = this.getData();
    const currentDate = this.getCurrentDate();
    
    if (!data[folderId]) {
      data[folderId] = {};
    }
    
    // Auto-update last modification date in content if it exists
    let updatedContent = content;
    if (content.includes('## Última Actualización:') || content.includes('## Última Revisión:')) {
      updatedContent = content.replace(
        /(## Última (?:Actualización|Revisión):) [\d-]+/g,
        `$1 ${currentDate.iso}`
      );
    }
    
    data[folderId][fileName] = {
      content: updatedContent,
      createdAt: data[folderId][fileName]?.createdAt || currentDate.iso,
      updatedAt: currentDate.iso,
      preview: updatedContent.substring(0, 150).replace(/[#*`]/g, '').trim()
    };
    
    this.saveData(data);
  }

  static createFile(folderId: string, fileName: string, content: string) {
    const data = this.getData();
    const currentDate = this.getCurrentDate();
    
    if (!data[folderId]) {
      data[folderId] = {};
    }
    
    data[folderId][fileName] = {
      content,
      createdAt: currentDate.iso,
      updatedAt: currentDate.iso,
      preview: content.substring(0, 150).replace(/[#*`]/g, '').trim()
    };
    
    this.saveData(data);
  }

  // New method to get formatted dates for templates
  static getFormattedDates() {
    return this.getCurrentDate();
  }
}
