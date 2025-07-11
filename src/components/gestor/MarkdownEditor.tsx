
import { useState } from 'react';
import { Save, ArrowLeft, Eye, Edit } from 'lucide-react';
import { KanbanView } from './KanbanView';

interface MarkdownEditorProps {
  fileName: string;
  content: string;
  onSave: (content: string) => void;
  onBack: () => void;
}

export const MarkdownEditor = ({ fileName, content, onSave, onBack }: MarkdownEditorProps) => {
  const [currentContent, setCurrentContent] = useState(content);
  const [isPreview, setIsPreview] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleContentChange = (newContent: string) => {
    setCurrentContent(newContent);
    setHasChanges(newContent !== content);
  };

  const handleSave = () => {
    onSave(currentContent);
    setHasChanges(false);
  };

  const isKanbanFile = currentContent.includes('## Por hacer') && 
                     currentContent.includes('## En proceso') && 
                     currentContent.includes('## Hecho');

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-slate-700 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-medium text-white">
            {fileName.replace('.md', '')}
          </h3>
          {hasChanges && (
            <span className="text-xs bg-yellow-600 text-yellow-100 px-2 py-1 rounded">
              Sin guardar
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isKanbanFile && (
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                isPreview
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {isPreview ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {isPreview ? 'Editar' : 'Kanban'}
            </button>
          )}
          
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:text-slate-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar
          </button>
        </div>
      </div>

      <div className="flex-1">
        {isPreview && isKanbanFile ? (
          <KanbanView content={currentContent} />
        ) : (
          <textarea
            value={currentContent}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full h-full p-6 bg-slate-950 text-slate-300 border-none outline-none resize-none font-mono text-sm leading-relaxed"
            placeholder="Escribe tu contenido en Markdown aquí..."
          />
        )}
      </div>
    </div>
  );
};
