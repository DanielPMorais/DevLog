import { useState, useRef, useEffect } from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiAngular,
  SiVuedotjs,
  SiNodedotjs,
  SiPython,
  SiPhp,
  SiRuby,
  SiGo,
  SiRust,
  SiSwift,
  SiKotlin,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiGooglecloud,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiSpring,
  SiDotnet,
  SiFlutter,
  SiElectron,
  SiGraphql,
  SiFirebase,
  SiGit,
  SiLinux,
} from 'react-icons/si';
import { FaJava, FaMicrosoft } from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb';

const TECHNOLOGIES = [
  { id: 'javascript', name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { id: 'react', name: 'React', icon: SiReact, color: '#61DAFB' },
  { id: 'angular', name: 'Angular', icon: SiAngular, color: '#DD0031' },
  { id: 'vue', name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
  { id: 'nodejs', name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { id: 'python', name: 'Python', icon: SiPython, color: '#3776AB' },
  { id: 'java', name: 'Java', icon: FaJava, color: '#007396' },
  { id: 'csharp', name: 'C#', icon: TbBrandCSharp, color: '#239120' },
  { id: 'php', name: 'PHP', icon: SiPhp, color: '#777BB4' },
  { id: 'ruby', name: 'Ruby', icon: SiRuby, color: '#CC342D' },
  { id: 'go', name: 'Go', icon: SiGo, color: '#00ADD8' },
  { id: 'rust', name: 'Rust', icon: SiRust, color: '#000000' },
  { id: 'swift', name: 'Swift', icon: SiSwift, color: '#FA7343' },
  { id: 'kotlin', name: 'Kotlin', icon: SiKotlin, color: '#7F52FF' },
  { id: 'mongodb', name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { id: 'postgresql', name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { id: 'mysql', name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { id: 'redis', name: 'Redis', icon: SiRedis, color: '#DC382D' },
  { id: 'docker', name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { id: 'kubernetes', name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
  { id: 'aws', name: 'AWS', icon: SiAmazonwebservices, color: '#FF9900' },
  { id: 'gcp', name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
  { id: 'azure', name: 'Azure', icon: FaMicrosoft, color: '#0078D4' },
  { id: 'tailwind', name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { id: 'express', name: 'Express', icon: SiExpress, color: '#ffffff' },
  { id: 'spring', name: 'Spring', icon: SiSpring, color: '#6DB33F' },
  { id: 'dotnet', name: '.NET', icon: SiDotnet, color: '#512BD4' },
  { id: 'flutter', name: 'Flutter', icon: SiFlutter, color: '#02569B' },
  { id: 'electron', name: 'Electron', icon: SiElectron, color: '#47848F' },
  { id: 'graphql', name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { id: 'firebase', name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { id: 'git', name: 'Git', icon: SiGit, color: '#F05032' },
  { id: 'linux', name: 'Linux', icon: SiLinux, color: '#FCC624' },
];

export default function TechSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  // Converte string "React, Node.js" para array ["react", "nodejs"]
  const selectedIds = value
    ? value.split(',').map((v) => {
        const tech = TECHNOLOGIES.find(
          (t) => t.name.toLowerCase() === v.trim().toLowerCase()
        );
        return tech?.id;
      }).filter(Boolean)
    : [];

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (techId) => {
    let newSelected;
    if (selectedIds.includes(techId)) {
      newSelected = selectedIds.filter((id) => id !== techId);
    } else {
      newSelected = [...selectedIds, techId];
    }

    // Converte de volta para string "React, Node.js"
    const names = newSelected
      .map((id) => TECHNOLOGIES.find((t) => t.id === id)?.name)
      .filter(Boolean)
      .join(', ');
    
    onChange(names);
  };

  const filteredTechs = TECHNOLOGIES.filter((tech) =>
    tech.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedTechs = TECHNOLOGIES.filter((t) => selectedIds.includes(t.id));

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Campo de seleção */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#111111] border border-gray-700 p-2 rounded text-white cursor-pointer min-h-[42px] flex flex-wrap gap-1 items-center hover:border-blue-500 transition-colors"
      >
        {selectedTechs.length > 0 ? (
          selectedTechs.map((tech) => {
            const Icon = tech.icon;
            return (
              <span
                key={tech.id}
                className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded text-sm"
              >
                <Icon style={{ color: tech.color }} />
                {tech.name}
              </span>
            );
          })
        ) : (
          <span className="text-gray-500">Selecione as tecnologias...</span>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-[#1a1d21] border border-gray-700 rounded-lg shadow-xl max-h-64 overflow-hidden">
          {/* Campo de busca */}
          <div className="p-2 border-b border-gray-700">
            <input
              type="text"
              placeholder="Buscar tecnologia..."
              className="w-full bg-[#111111] border border-gray-600 p-2 rounded text-white text-sm focus:border-blue-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          {/* Lista de opções */}
          <div className="overflow-y-auto max-h-48">
            {filteredTechs.map((tech) => {
              const Icon = tech.icon;
              const isSelected = selectedIds.includes(tech.id);

              return (
                <div
                  key={tech.id}
                  onClick={() => handleToggle(tech.id)}
                  className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors
                    ${isSelected ? 'bg-blue-900/30' : 'hover:bg-gray-800'}`}
                >
                  {/* Checkbox */}
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center
                      ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-600'}`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    )}
                  </div>

                  {/* Ícone da tecnologia */}
                  <Icon className="w-5 h-5" style={{ color: tech.color }} />

                  {/* Nome */}
                  <span className="text-gray-200">{tech.name}</span>
                </div>
              );
            })}

            {filteredTechs.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                Nenhuma tecnologia encontrada
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Exporta também para uso na Sidebar (mostrar ícones)
export { TECHNOLOGIES };
