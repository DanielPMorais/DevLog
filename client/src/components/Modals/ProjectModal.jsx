import TechSelect from '../TechSelect/TechSelect';

export default function ProjectModal({ 
  isOpen, 
  isEditing, 
  project, 
  onClose, 
  onSave, 
  onChange 
}) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!project.name) return;
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm p-4 z-50">
      <div className="bg-[#181b1f] p-6 rounded-xl border border-gray-800 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4">
          {isEditing ? 'Editar Sistema' : 'Novo Sistema'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Nome do Sistema (ex: API Vendas)"
            className="bg-[#111111] border border-gray-700 p-2 rounded text-white focus:border-blue-500 outline-none"
            value={project.name}
            onChange={(e) => onChange({ ...project, name: e.target.value })}
            autoFocus
          />
          
          <div>
            <label className="block text-gray-400 text-sm mb-2">Tecnologias</label>
            <TechSelect
              value={project.stack}
              onChange={(stack) => onChange({ ...project, stack })}
            />
          </div>

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
              {isEditing ? 'Salvar Alterações' : 'Criar Projeto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
