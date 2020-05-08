import axios from 'axios';

class Service {
    getProjects() {
        return axios.get(`http://localhost:8080/api/projects`);
    }
    getProject(projectId) {
        return axios.get(`http://localhost:8080/api/projects/${projectId}`);
    }
    deleteProject(projectId) {
        return axios.delete(`http://localhost:8080/api/projects/${projectId}`);
    }
    updateProject(projectId, project) {
        return axios.put(`http://localhost:8080/api/projects/${projectId}`, project);
    }
    createProject(project) {
        return axios.post(`http://localhost:8080/api/projects`, project);
    }
    // Task axios 
    getTasksByProjectId(projectId) {
        return axios.get(`http://localhost:8080/api/projects/${projectId}/tasks`);
    }
    getTasks() {
        return axios.get(`http://localhost:8080/api/projects/tasks`);
    }
    getTaskByTaskId(taskId) {
        return axios.get(`http://localhost:8080/api/projects/tasks/${taskId}`);
    }
    getTasksInProgress() {
        return axios.get(`http://localhost:8080/api/projects/tasks/inprogress`);
    }
    getTasksTodo() {
        return axios.get(`http://localhost:8080/api/projects/tasks/todo`);
    }
    getTasksDone() {
        return axios.get(`http://localhost:8080/api/projects/tasks/done`);
    }
    addTask(projectId, task) {
        return axios.post(`http://localhost:8080/api/projects/${projectId}/tasks`, task);
    }
    deleteTask(taskId) {
        return axios.delete(`http://localhost:8080/api/projects/tasks/${taskId}`);
    }
    updateTask(taskId, task) {
        return axios.put(`http://localhost:8080/api/projects/tasks/${taskId}`, task)
    }
    // updateTaskState(taskState, taskId) {
    //     return axios.patch(`http://localhost:8080/api/projects/tasks/${taskId}`, taskState)
    // }
    updateTaskInprogress(taskId) {
        return axios.patch(`http://localhost:8080/api/projects/tasks/${taskId}/inprogress`)
    }
    updateTaskDone(taskId) {
        return axios.patch(`http://localhost:8080/api/projects/tasks/${taskId}/done`)
    }
    updateTaskTodo(taskId) {
        return axios.patch(`http://localhost:8080/api/projects/tasks/${taskId}/todo`)
    }
    searchProject(search) {
        return axios.get(`http://localhost:8080/api/projects/searchproject?search=${search}`)
    }
    searchTask(search) {
        return axios.get(`http://localhost:8080/api/projects/searchtask?search=${search}`)
    }
    // searchTaskById(search) {
    //     return axios.get(`http://localhost:8080/api/projects/searchtaskid?search=${search}`)
    // }

}

export default new Service()