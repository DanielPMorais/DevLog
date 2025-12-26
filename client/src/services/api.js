const API_URL = 'http://10.0.0.126:3003';

export const api = {
  // Projetos
  async getProjects() {
    const res = await fetch(`${API_URL}/projects`);
    return res.json();
  },

  async createProject(project) {
    const res = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    return res.json();
  },

  async updateProject(id, project) {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    return res.json();
  },

  async deleteProject(id) {
    await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
    });
  },

  // Logs
  async getLogsByProject(projectId) {
    const res = await fetch(`${API_URL}/projects/${projectId}/logs`);
    return res.json();
  },

  async createLog(log) {
    const res = await fetch(`${API_URL}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log),
    });
    return res.json();
  },

  async updateLog(id, log) {
    const res = await fetch(`${API_URL}/logs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log),
    });
    return res.json();
  },

  async deleteLog(id) {
    await fetch(`${API_URL}/logs/${id}`, {
      method: 'DELETE',
    });
  },
};
