import Project from "./projectCore";

export default class WorkspaceManager {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("Default"));
    }

    createProject(name) {
        this.projects.push(new Project(name));
    }
    deleteProject(projectId) {
        const index = this.projects.findIndex(project => project.id == projectId);
        if(index > 0) {
            this.projects.splice(index, 1);
        }
        else if(index === 0) {
            console.log("Cannot delete default Project");
        }
        else {
             console.log(`Project with id: ${projectId} not found`);
        }
    }
    getAllProjects() {
        return this.projects;
    }
}