import { TECHNOLOGIES } from '../TechSelect/TechSelect';

// Helper para pegar o ícone de uma tecnologia pelo nome
function getTechIcon(techName) {
  const tech = TECHNOLOGIES.find(
    (t) => t.name.toLowerCase() === techName?.trim().toLowerCase()
  );
  return tech ? { Icon: tech.icon, color: tech.color } : null;
}

export default function Sidebar({ projects, selectedProject, onSelectProject, onNewProject }) {
  return (
    <div className="w-64 bg-[#181b1f] flex flex-col border-r border-gray-800">
      <div className="p-4 font-bold text-xl text-blue-400">DevLog</div>
      
      <div className="flex-1 overflow-y-auto">
        {projects.map((p) => {
          // Pega os primeiros 3 ícones das tecnologias
          const techIcons = p.stack
            ?.split(',')
            .slice(0, 3)
            .map((name) => getTechIcon(name))
            .filter(Boolean) || [];

          return (
            <div
              key={p.id}
              onClick={() => onSelectProject(p)}
              className={`p-3 mx-2 my-1 rounded cursor-pointer transition-colors flex justify-between items-center
                ${
                  selectedProject?.id === p.id
                    ? 'bg-[#262c34] border-l-4 border-blue-500'
                    : 'hover:bg-[#202429]'
                }`}
            >
              <span className="truncate flex-1">{p.name}</span>
              <div className="flex gap-1 ml-2">
                {techIcons.length > 0 ? (
                  techIcons.map((tech, idx) => (
                    <tech.Icon
                      key={idx}
                      className="w-4 h-4"
                      style={{ color: tech.color }}
                    />
                  ))
                ) : (
                  <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">
                    {p.stack?.split(',')[0] || '-'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onNewProject}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition cursor-pointer"
        >
          + Novo Projeto
        </button>
      </div>
    </div>
  );
}
