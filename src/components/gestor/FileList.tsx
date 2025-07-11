
import { FileText, Calendar, Eye, Clock } from 'lucide-react';
import { FileManager } from '@/lib/fileManager';

interface FileListProps {
  folderId: string;
  onFileSelect: (fileName: string) => void;
}

export const FileList = ({ folderId, onFileSelect }: FileListProps) => {
  const files = FileManager.getFiles(folderId);

  if (files.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-400 mb-2">No hay documentos</h3>
          <p className="text-sm text-slate-500">
            Crea tu primera entrada usando el botón "Nueva Entrada"
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    if (diffInHours < 48) return 'Ayer';
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    
    return formatDate(dateString);
  };

  return (
    <div className="flex-1 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {files.map((fileName) => {
          const metadata = FileManager.getFileMetadata(folderId, fileName);
          const isRecentlyUpdated = metadata.updatedAt !== metadata.createdAt;
          
          return (
            <div
              key={fileName}
              onClick={() => onFileSelect(fileName)}
              className="bg-slate-900 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-slate-300 truncate">
                    {fileName.replace('.md', '')}
                  </span>
                </div>
                <Eye className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>Creado: {formatDate(metadata.createdAt)}</span>
                  </div>
                  {isRecentlyUpdated && (
                    <div className="flex items-center gap-1 text-green-400">
                      <Clock className="w-3 h-3" />
                      <span>Actualizado</span>
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-slate-500">
                  <span>{getRelativeTime(metadata.updatedAt)}</span>
                </div>
                
                {metadata.preview && (
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {metadata.preview}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
