import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function LogList({ logs, onAddLog, onEditLog, onDeleteLog }) {
  return (
    <div className="bg-[#181b1f] rounded-xl border border-gray-800 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-[#202429]">
        <h3 className="font-semibold text-white">Histórico de Eventos</h3>
        <button
          onClick={onAddLog}
          className="text-sm bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700 cursor-pointer"
        >
          + Adicionar Log
        </button>
      </div>

      <div className="divide-y divide-gray-800">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 flex items-start gap-4 hover:bg-[#202429] transition group"
          >
            <span
              className={`px-2 py-1 rounded text-xs font-bold uppercase w-20 text-center shrink-0
                ${
                  log.type === 'error'
                    ? 'bg-red-500/20 text-red-400'
                    : log.type === 'feature'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-green-500/20 text-green-400'
                }`}
            >
              {log.type}
            </span>

            <div className="flex-1 min-w-0">
              {log.title && (
                <div className="text-white font-bold mb-1">
                  {log.title}
                </div>
              )}
              <div className="text-gray-300 whitespace-pre-wrap">
                {log.description}
              </div>
              <div className="text-gray-500 text-xs mt-2">
                {new Date(log.created_at).toLocaleString()}
              </div>
            </div>

            {/* Ações */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEditLog(log)}
                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition cursor-pointer"
                title="Editar log"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteLog(log.id)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition cursor-pointer"
                title="Apagar log"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            Nenhum log registrado.
          </div>
        )}
      </div>
    </div>
  );
}
