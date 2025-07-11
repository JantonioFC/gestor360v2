
import { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Folder, GitBranch, Calendar, Target, Users, Lightbulb } from 'lucide-react';
import { FileManager } from '@/lib/fileManager';

interface SidebarProps {
  selectedFolder: string | null;
  onFolderSelect: (folderId: string) => void;
}

const folderConfig = {
  'dde': { name: 'Documentos de Decisión', icon: FileText, color: 'text-blue-400' },
  'planificacion': { name: 'Planificación', icon: Calendar, color: 'text-green-400' },
  'arquitectura': { name: 'Arquitectura', icon: GitBranch, color: 'text-purple-400' },
  'requisitos': { name: 'Requisitos', icon: Target, color: 'text-orange-400' },
  'equipo': { name: 'Equipo', icon: Users, color: 'text-pink-400' },
  'ideas': { name: 'Ideas', icon: Lightbulb, color: 'text-yellow-400' }
};

export const Sidebar = ({ selectedFolder, onFolderSelect }: SidebarProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
    onFolderSelect(folderId);
  };

  return (
    <div className="w-80 bg-slate-900 border-r border-slate-700 flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white">Gestor 360V2</h1>
        <p className="text-sm text-slate-400 mt-1">Artefactos de Desarrollo</p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {Object.entries(folderConfig).map(([folderId, config]) => {
          const Icon = config.icon;
          const isExpanded = expandedFolders.has(folderId);
          const isSelected = selectedFolder === folderId;
          const files = FileManager.getFiles(folderId);

          return (
            <div key={folderId} className="mb-2">
              <button
                onClick={() => toggleFolder(folderId)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isSelected 
                    ? 'bg-slate-800 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <Icon className={`w-4 h-4 ${config.color}`} />
                <span className="text-sm font-medium truncate">{config.name}</span>
                <span className="ml-auto text-xs text-slate-500">{files.length}</span>
              </button>

              {isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {files.map((fileName) => (
                    <div
                      key={fileName}
                      className="flex items-center gap-2 px-3 py-1 text-sm text-slate-400 hover:text-slate-300"
                    >
                      <FileText className="w-3 h-3" />
                      <span className="truncate">{fileName.replace('.md', '')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-700">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
          Sincronizar con GitHub
        </button>
      </div>
    </div>
  );
};
