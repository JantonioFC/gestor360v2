
import { useState } from 'react';
import { Plus } from 'lucide-react';

interface KanbanViewProps {
  content: string;
}

interface KanbanItem {
  id: string;
  text: string;
  column: 'todo' | 'doing' | 'done';
}

export const KanbanView = ({ content }: KanbanViewProps) => {
  const [items, setItems] = useState<KanbanItem[]>(() => {
    // Parse markdown content to extract kanban items
    const lines = content.split('\n');
    const kanbanItems: KanbanItem[] = [];
    let currentColumn: 'todo' | 'doing' | 'done' | null = null;

    lines.forEach(line => {
      if (line.startsWith('## Por hacer')) {
        currentColumn = 'todo';
      } else if (line.startsWith('## En proceso')) {
        currentColumn = 'doing';
      } else if (line.startsWith('## Hecho')) {
        currentColumn = 'done';
      } else if (line.startsWith('- ') && currentColumn) {
        kanbanItems.push({
          id: Math.random().toString(36),
          text: line.substring(2),
          column: currentColumn
        });
      }
    });

    return kanbanItems;
  });

  const columns = [
    { id: 'todo', title: 'Por hacer', color: 'bg-red-500' },
    { id: 'doing', title: 'En proceso', color: 'bg-yellow-500' },
    { id: 'done', title: 'Hecho', color: 'bg-green-500' }
  ] as const;

  const getItemsByColumn = (columnId: string) => {
    return items.filter(item => item.column === columnId);
  };

  return (
    <div className="flex-1 p-6 bg-slate-950">
      <div className="grid grid-cols-3 gap-6 h-full">
        {columns.map(column => (
          <div key={column.id} className="bg-slate-900 rounded-lg border border-slate-700">
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <h3 className="font-medium text-white">{column.title}</h3>
                <span className="ml-auto text-sm text-slate-500">
                  {getItemsByColumn(column.id).length}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3 h-full overflow-y-auto">
              {getItemsByColumn(column.id).map(item => (
                <div
                  key={item.id}
                  className="bg-slate-800 border border-slate-600 rounded p-3 text-sm text-slate-300 hover:border-slate-500 transition-colors"
                >
                  {item.text}
                </div>
              ))}

              <button className="w-full border-2 border-dashed border-slate-600 rounded p-3 text-slate-500 hover:border-slate-500 hover:text-slate-400 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Agregar tarea
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
