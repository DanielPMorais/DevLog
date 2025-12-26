import { useState } from 'react';
import { useProjects } from './hooks/useProjects';
import Sidebar from './components/Sidebar/Sidebar';
import ProjectHeader from './components/ProjectHeader/ProjectHeader';
import ActivityChart from './components/ActivityChart/ActivityChart';
import LogList from './components/LogList/LogList';
import ProjectModal from './components/Modals/ProjectModal';
import LogModal from './components/Modals/LogModal';

export default function App() {
  const {
    projects,
    selectedProject,
    logs,
    selectProject,
    createProject,
    updateProject,
    deleteProject,
    createLog,
    updateLog,
    deleteLog,
  } = useProjects();

  // Estados dos modais
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isEditingLog, setIsEditingLog] = useState(false);
  const [editingLogId, setEditingLogId] = useState(null);

  // Estados dos formulários
  const [newProject, setNewProject] = useState({ name: '', stack: '' });
  const [newLog, setNewLog] = useState({ type: 'update', description: '' });

  // Handlers do projeto
  const handleNewProjectClick = () => {
    setNewProject({ name: '', stack: '' });
    setIsEditingProject(false);
    setShowProjectModal(true);
  };

  const handleEditProjectClick = () => {
    setNewProject({ name: selectedProject.name, stack: selectedProject.stack });
    setIsEditingProject(true);
    setShowProjectModal(true);
  };

  const handleSaveProject = async () => {
    const success = isEditingProject
      ? await updateProject(newProject)
      : await createProject(newProject);

    if (success) {
      setShowProjectModal(false);
      setNewProject({ name: '', stack: '' });
    }
  };

  // Handlers do log
  const handleAddLogClick = () => {
    setNewLog({ type: 'update', description: '' });
    setIsEditingLog(false);
    setEditingLogId(null);
    setShowLogModal(true);
  };

  const handleEditLogClick = (log) => {
    setNewLog({ type: log.type, description: log.description });
    setIsEditingLog(true);
    setEditingLogId(log.id);
    setShowLogModal(true);
  };

  const handleSaveLog = async () => {
    const success = isEditingLog
      ? await updateLog(editingLogId, newLog)
      : await createLog(newLog);

    if (success) {
      setShowLogModal(false);
      setNewLog({ type: 'update', description: '' });
      setEditingLogId(null);
    }
  };

  return (
    <>
      <div className="flex h-screen bg-[#111111] text-gray-200 font-sans">
        <Sidebar
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={selectProject}
          onNewProject={handleNewProjectClick}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedProject && (
            <div className="p-6 overflow-y-auto">
              <ProjectHeader
                project={selectedProject}
                onEdit={handleEditProjectClick}
                onDelete={deleteProject}
              />

              <ActivityChart logs={logs} />

              <LogList
                logs={logs}
                onAddLog={handleAddLogClick}
                onEditLog={handleEditLogClick}
                onDeleteLog={deleteLog}
              />
            </div>
          )}
        </div>
      </div>

      <ProjectModal
        isOpen={showProjectModal}
        isEditing={isEditingProject}
        project={newProject}
        onClose={() => setShowProjectModal(false)}
        onSave={handleSaveProject}
        onChange={setNewProject}
      />

      <LogModal
        isOpen={showLogModal}
        isEditing={isEditingLog}
        log={newLog}
        onClose={() => setShowLogModal(false)}
        onSave={handleSaveLog}
        onChange={setNewLog}
      />
    </>
  );
}
