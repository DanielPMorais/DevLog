import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectProject = useCallback(async (project) => {
    setSelectedProject(project);
    try {
      const data = await api.getLogsByProject(project.id);
      setLogs(data);
    } catch (err) {
      console.error('Erro ao buscar logs:', err);
    }
  }, []);

  const loadProjects = useCallback(async () => {
    try {
      const data = await api.getProjects();
      setProjects(data);
      if (data.length > 0) {
        await selectProject(data[0]);
      }
    } catch (err) {
      console.error('Erro ao buscar projetos:', err);
    } finally {
      setLoading(false);
    }
  }, [selectProject]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const createProject = async (project) => {
    try {
      const created = await api.createProject(project);
      const newProject = { ...project, id: created.id };
      setProjects([...projects, newProject]);
      if (projects.length === 0) {
        await selectProject(newProject);
      }
      return true;
    } catch (err) {
      console.error('Erro ao criar projeto:', err);
      alert('Erro ao criar projeto. Verifique se o servidor está rodando.');
      return false;
    }
  };

  const updateProject = async (project) => {
    try {
      await api.updateProject(selectedProject.id, project);
      const updatedList = projects.map((p) =>
        p.id === selectedProject.id ? { ...p, ...project } : p
      );
      setProjects(updatedList);
      setSelectedProject({ ...selectedProject, ...project });
      return true;
    } catch (err) {
      console.error('Erro ao atualizar projeto:', err);
      alert('Erro ao atualizar projeto. Verifique se o servidor está rodando.');
      return false;
    }
  };

  const deleteProject = async () => {
    if (!window.confirm(`Tem certeza que deseja apagar o projeto "${selectedProject.name}"?`)) {
      return false;
    }

    try {
      await api.deleteProject(selectedProject.id);
      const remaining = projects.filter((p) => p.id !== selectedProject.id);
      setProjects(remaining);

      if (remaining.length > 0) {
        await selectProject(remaining[0]);
      } else {
        setSelectedProject(null);
        setLogs([]);
      }
      return true;
    } catch (err) {
      console.error('Erro ao deletar projeto:', err);
      alert('Erro ao deletar projeto. Verifique se o servidor está rodando.');
      return false;
    }
  };

  const createLog = async (log) => {
    try {
      await api.createLog({ ...log, project_id: selectedProject.id });
      await selectProject(selectedProject);
      return true;
    } catch (err) {
      console.error('Erro ao criar log:', err);
      alert('Erro ao criar log. Verifique se o servidor está rodando.');
      return false;
    }
  };

  const updateLog = async (logId, log) => {
    try {
      await api.updateLog(logId, log);
      await selectProject(selectedProject);
      return true;
    } catch (err) {
      console.error('Erro ao atualizar log:', err);
      alert('Erro ao atualizar log. Verifique se o servidor está rodando.');
      return false;
    }
  };

  const deleteLog = async (logId) => {
    if (!window.confirm('Tem certeza que deseja apagar este log?')) {
      return false;
    }

    try {
      await api.deleteLog(logId);
      await selectProject(selectedProject);
      return true;
    } catch (err) {
      console.error('Erro ao deletar log:', err);
      alert('Erro ao deletar log. Verifique se o servidor está rodando.');
      return false;
    }
  };

  return {
    projects,
    selectedProject,
    logs,
    loading,
    selectProject,
    createProject,
    updateProject,
    deleteProject,
    createLog,
    updateLog,
    deleteLog,
  };
}
