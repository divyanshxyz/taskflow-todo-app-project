import WorkspaceManager from "./workspaceManager";
import { renderProjects, renderTodos } from "./UIController";
import Todo from "./todoCore";
import * as storageManager from "./storageManager"


let workspace = new WorkspaceManager();
let activeProjectId;

function initApp() {
    const loadedData = storageManager.loadWorkspace();
    if (loadedData && loadedData.projects.length > 0) {
        workspace = loadedData;
    }
    activeProjectId = workspace.projects[0].id;
    renderProjects(workspace.projects, activeProjectId);
    renderTodos(workspace.projects[0].todos);
}


function handleAddProject(projectName) {
    workspace.createProject(projectName);
    const newProject = workspace.projects.at(-1);
    activeProjectId = newProject.id;
    storageManager.saveWorkspace(workspace);
    renderProjects(workspace.projects, activeProjectId);
    renderTodos(newProject.todos);
}

function handleSwitchProject(projectId) {
    activeProjectId = projectId;
    const activeProject = workspace.projects.find(project => project.id === activeProjectId);
    storageManager.saveWorkspace(workspace);
    renderProjects(workspace.projects, activeProjectId);
    renderTodos(activeProject.todos);
}

function handleEditProject(projectId, newProjectName) {
    const projectEdit = workspace.projects.find(project => project.id === projectId);
    projectEdit.updateName(newProjectName);
    storageManager.saveWorkspace(workspace);
    renderProjects(workspace.projects, activeProjectId);

}

function handleDeleteProject(projectId) {
    workspace.deleteProject(projectId);
    activeProjectId = workspace.projects[0].id;
    storageManager.saveWorkspace(workspace);
    renderProjects(workspace.projects, activeProjectId);
    renderTodos(workspace.projects[0].todos);
}

// todoData is JSON Object
function handleAddTodo(todoData) {
    let newTodo = new Todo(todoData.title, todoData.description, todoData.dueDate, todoData.priority, todoData.notes, todoData.checklist, todoData.isComplete);
    const activeProject = workspace.projects.find(project => project.id === activeProjectId);
    activeProject.addTodo(newTodo);

    storageManager.saveWorkspace(workspace);

    renderTodos(activeProject.todos);
}


function handleToggleTodo(todoId) {
    const activeProject = workspace.projects.find(project => project.id === activeProjectId);
    const todo = activeProject.todos.find(todo => todo.id === todoId);
    todo.toggleComplete();
    storageManager.saveWorkspace(workspace);
    renderTodos(activeProject.todos);
}

function getTodoById(todoId) {
    const activeProject = workspace.projects.find(project => project.id === activeProjectId);
    return activeProject.getTodo(todoId);
}

function handleEditTodo(todoId, updatedData) {
    const activeProject = workspace.projects.find(project => project.id === activeProjectId);
    const activeTodo = activeProject.getTodo(todoId);
    activeTodo.editDetails(updatedData);
    storageManager.saveWorkspace(workspace);
    renderTodos(activeProject.todos);
}

function handleDeleteTodo(todoId) {
    const activeProject = workspace.projects.find(project => project.id === activeProjectId);
    activeProject.removeTodo(todoId);
    activeProjectId = workspace.projects[0].id;
    storageManager.saveWorkspace(workspace);
    renderProjects(workspace.projects, activeProjectId);
    renderTodos(activeProject.todos);
}


export { activeProjectId, initApp, handleAddTodo, handleAddProject, handleSwitchProject, handleEditProject ,handleDeleteProject, handleToggleTodo, handleEditTodo, handleDeleteTodo,  getTodoById};