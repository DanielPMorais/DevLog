import { TECHNOLOGIES } from '../TechSelect/TechSelect';

// Helper para pegar o ícone de uma tecnologia pelo nome
function getTechInfo(techName) {
  const tech = TECHNOLOGIES.find(
    (t) => t.name.toLowerCase() === techName?.trim().toLowerCase()
  );
  return tech ? { Icon: tech.icon, color: tech.color, name: tech.name } : null;
}

export default function ProjectHeader({ project, onEdit, onDelete }) {
  // Pega todas as tecnologias do projeto
  const techs = project.stack
    ?.split(',')
    .map((name) => getTechInfo(name))
    .filter(Boolean) || [];

  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{project.name}</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {techs.length > 0 ? (
            techs.map((tech, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1.5 bg-gray-800 px-2 py-1 rounded text-sm text-gray-300"
              >
                <tech.Icon className="w-4 h-4" style={{ color: tech.color }} />
                {tech.name}
              </span>
            ))
          ) : (
            <p className="text-gray-400 text-sm">Stack: {project.stack || 'Não definida'}</p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-[#2d333b] rounded hover:bg-[#363c44] border border-gray-700 cursor-pointer"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-900/30 text-red-400 border border-red-900 rounded hover:bg-red-900/50 cursor-pointer"
        >
          Apagar
        </button>
      </div>
    </header>
  );
}
