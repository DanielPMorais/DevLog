export default function LogModal({ isOpen, isEditing, log, onClose, onSave, onChange }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!log.description) return;
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm p-4 z-50">
      <div className="bg-[#181b1f] p-6 rounded-xl border border-gray-800 w-full max-w-lg shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4">
          {isEditing ? 'Editar Evento' : 'Registrar Evento'}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2">
            {['update', 'error', 'feature'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onChange({ ...log, type })}
                className={`px-3 py-1 rounded text-sm font-bold uppercase border border-gray-700 cursor-pointer
                  ${
                    log.type === type
                      ? 'bg-gray-700 text-white border-white'
                      : 'text-gray-500 hover:bg-gray-800'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Título do evento (opcional)"
            className="bg-[#111111] border border-gray-700 p-3 rounded text-white focus:border-blue-500 outline-none"
            value={log.title || ''}
            onChange={(e) => onChange({ ...log, title: e.target.value })}
            autoFocus
          />
          
          <textarea
            placeholder="O que aconteceu? (Aceita quebra de linha)"
            className="bg-[#111111] border border-gray-700 p-3 rounded text-white focus:border-blue-500 outline-none h-32 resize-none"
            value={log.description}
            onChange={(e) => onChange({ ...log, description: e.target.value })}
          />
          
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded text-white font-bold hover:bg-blue-700 cursor-pointer"
            >
              {isEditing ? 'Salvar Alterações' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
