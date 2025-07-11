
// File Manager - Simulates file system operations using localStorage
export class FileManager {
  private static STORAGE_KEY = 'gestor360_files';

  // Initialize with sample data if localStorage is empty
  static init() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
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

## Fecha: 2024-01-01
## Estado: Aceptada`,
            createdAt: '2024-01-01',
            preview: 'Definición de la arquitectura base del sistema...'
          }
        },
        planificacion: {
          'PLAN_2024-01-02_Sprint_1.md': {
            content: `# Plan: Sprint 1 - Configuración Inicial

## Objetivo
Establecer la base técnica del proyecto.

## Por hacer
- [ ] Configurar repositorio
- [ ] Definir estructura de carpetas
- [ ] Crear documentación inicial

## En proceso
- [ ] Configurar pipeline CI/CD

## Hecho
- [x] Crear proyecto base
- [x] Definir tecnologías

## Fecha: 2024-01-02`,
            createdAt: '2024-01-02',
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
    return {
      createdAt: file?.createdAt || new Date().toISOString().split('T')[0],
      preview: file?.preview || ''
    };
  }

  static saveFile(folderId: string, fileName: string, content: string) {
    const data = this.getData();
    
    if (!data[folderId]) {
      data[folderId] = {};
    }
    
    data[folderId][fileName] = {
      content,
      createdAt: data[folderId][fileName]?.createdAt || new Date().toISOString().split('T')[0],
      preview: content.substring(0, 150).replace(/[#*`]/g, '').trim()
    };
    
    this.saveData(data);
  }

  static createFile(folderId: string, fileName: string, content: string) {
    const data = this.getData();
    
    if (!data[folderId]) {
      data[folderId] = {};
    }
    
    data[folderId][fileName] = {
      content,
      createdAt: new Date().toISOString().split('T')[0],
      preview: content.substring(0, 150).replace(/[#*`]/g, '').trim()
    };
    
    this.saveData(data);
  }
}
