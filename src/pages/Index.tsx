
import { useState } from 'react';
import { Sidebar } from '@/components/gestor/Sidebar';
import { MainPanel } from '@/components/gestor/MainPanel';
import { FileManager } from '@/lib/fileManager';

const Index = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolder(folderId);
    setSelectedFile(null);
    setFileContent('');
  };

  const handleFileSelect = (fileName: string) => {
    setSelectedFile(fileName);
    const content = FileManager.getFileContent(selectedFolder!, fileName);
    setFileContent(content);
  };

  const handleSaveFile = (content: string) => {
    if (selectedFolder && selectedFile) {
      FileManager.saveFile(selectedFolder, selectedFile, content);
      setFileContent(content);
    }
  };

  return (
    <div className="h-screen flex bg-background text-foreground overflow-hidden">
      <Sidebar 
        selectedFolder={selectedFolder}
        onFolderSelect={handleFolderSelect}
      />
      <MainPanel
        selectedFolder={selectedFolder}
        selectedFile={selectedFile}
        fileContent={fileContent}
        onFileSelect={handleFileSelect}
        onSaveFile={handleSaveFile}
      />
    </div>
  );
};

export default Index;
