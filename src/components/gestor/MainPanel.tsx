
import { useState } from 'react';
import { FileList } from './FileList';
import { MarkdownEditor } from './MarkdownEditor';
import { NewEntryModal } from './NewEntryModal';
import { Plus } from 'lucide-react';
import { FileManager } from '@/lib/fileManager';

interface MainPanelProps {
  selectedFolder: string | null;
  selectedFile: string | null;
  fileContent: string;
  onFileSelect: (fileName: string) => void;
  onSaveFile: (content: string) => void;
}

export const MainPanel = ({
  selectedFolder,
  selectedFile,
  fileContent,
  onFileSelect,
  onSaveFile
}: MainPanelProps) => {
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleNewDocumentSave = (fileName: string, content: string) => {
    if (selectedFolder) {
      // Create the new file
      FileManager.createFile(selectedFolder, fileName, content);
      
      // Close modal
      setShowNewEntryModal(false);
      
      // Force refresh of file list
      setRefreshKey(prev => prev + 1);
      
      // Automatically select the new file
      onFileSelect(fileName);
    }
  };

  if (!selectedFolder) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-lg font-medium text-slate-300 mb-2">Selecciona una carpeta</h2>
          <p className="text-sm text-slate-500">
            Elige una carpeta del panel izquierdo para ver o crear documentos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-950">
      <div className="border-b border-slate-700 p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white capitalize">
          {selectedFolder.replace('-', ' ')}
        </h2>
        <button
          onClick={() => setShowNewEntryModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nueva Entrada
        </button>
      </div>

      <div className="flex-1 flex">
        {!selectedFile ? (
          <FileList
            key={refreshKey}
            folderId={selectedFolder}
            onFileSelect={onFileSelect}
          />
        ) : (
          <MarkdownEditor
            fileName={selectedFile}
            content={fileContent}
            onSave={onSaveFile}
            onBack={() => onFileSelect('')}
          />
        )}
      </div>

      {showNewEntryModal && (
        <NewEntryModal
          folderId={selectedFolder}
          onClose={() => setShowNewEntryModal(false)}
          onSave={handleNewDocumentSave}
        />
      )}
    </div>
  );
};
