import Todo from "./todoCore";
import Project from "./projectCore";
import WorkspaceManager from "./workspaceManager";

function saveWorkspace(workspaceInstance) {
    const jsonString = JSON.stringify(workspaceInstance);
    localStorage.setItem("todo-workspace", jsonString);
}

function loadWorkspace() {
    const todoWorkspace = localStorage.getItem("todo-workspace");
    if(todoWorkspace === null) {
        return null;
    }
    const rawData = JSON.parse(todoWorkspace);
    let hydratedWorkspace = new WorkspaceManager();
    hydratedWorkspace.projects = [];
    for(let rawProject of rawData.projects) {
        let newProject = new Project(rawProject.name)
        newProject.id = rawProject.id;

        for(let rawTodo of rawProject.todos) {
            let newTodo = new Todo(rawTodo.title, rawTodo.description, rawTodo.dueDate, rawTodo.priority, rawTodo.notes, rawTodo.checklist, rawTodo.isComplete);
            newTodo.id = rawTodo.id;
            newProject.addTodo(newTodo);
        }
        hydratedWorkspace.projects.push(newProject);
    }
    return hydratedWorkspace;
}


export {saveWorkspace, loadWorkspace};