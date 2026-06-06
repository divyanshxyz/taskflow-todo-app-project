import Todo from "./todoCore";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import Project from "./projectCore"

const projectListContainer = document.querySelector('#project-list');
const todoListContainer = document.querySelector('#todo-list');
const addTodoForm = document.querySelector('#add-todo-form');
const addTodoFormSubmitButton = document.querySelector("#add-todo-form-submit-btn");
const editModal = document.querySelector("#edit-todo-modal");
const closeEditModalBtn = document.querySelector("#close-edit-modal");
const editForm = document.querySelector("#edit-todo-form");
const addProjectForm = document.querySelector("#add-project-form");
const editTitleIn = document.querySelector("#edit-title-in");
const editDescriptionIn = document.querySelector("#edit-description-in");
const editDueDateIn = document.querySelector("#edit-dueDate-in");
const editPriorityIn = document.querySelector("#edit-priority-in");
const editNotesIn = document.querySelector("#edit-notes-in");
const editChecklistIn = document.querySelector("#edit-checklist-in");
const editisCompleteIn = document.querySelector("#edit-isComplete-in");
const editProjectModal = document.querySelector("#edit-project-modal");
const editProjectForm = document.querySelector("#edit-project-form");
const editProjectNameIn = document.querySelector("#edit-project-name-in");
const closeEditProjectModalBtn = document.querySelector("#close-edit-project-modal");


closeEditModalBtn.addEventListener("click", closeEditModal);

function renderProjects(arrayOfProjects, activeProjectId) {
    projectListContainer.innerHTML = "";
    arrayOfProjects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-div");

        const projectNameSpan = document.createElement("span");
        projectNameSpan.classList.add("project-name");
        projectNameSpan.textContent = project.name;
        projectDiv.appendChild(projectNameSpan);

        if (project.name !== "Default") {
           const projectControls = document.createElement("div");
           projectControls.style.display = "flex";
           projectControls.style.gap = "0.5rem";

           const editProjectButton = document.createElement("button");
            editProjectButton.classList.add("project-edit-btn");
            editProjectButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil-outline</title><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>`;

            const deleteProjectBtn = document.createElement("button");
            deleteProjectBtn.classList.add("project-delete-btn");
            deleteProjectBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>`;

            projectControls.appendChild(editProjectButton);
            projectControls.appendChild(deleteProjectBtn);
            projectDiv.appendChild(projectControls);
        }


        if (project.id === activeProjectId) {
            projectDiv.classList.add("active-project-div");
        }
        projectDiv.dataset.id = project.id;
        projectListContainer.appendChild(projectDiv);

    });
}

function renderTodos(arrayOfTodos) {
    clearTodos();

    if(arrayOfTodos.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.classList.add("empty-state");
        emptyState.textContent = "No tasks here yet. Time to relax or add a new one!";
        todoListContainer.appendChild(emptyState);
        return;
    }

    arrayOfTodos.forEach(todo => {
        const todoCard = document.createElement("div");
        todoCard.classList.add("todo-card");
        todoCard.dataset.id = todo.id;

        const todoCardTitle = document.createElement("div");
        todoCardTitle.textContent = todo.title;
        todoCardTitle.classList.add("todo-card-title");

        const todoCardDueDate = document.createElement("div");
        if (todo.dueDate) {
            const dateObj = new Date(todo.dueDate);
            let dateText = "";

            if(isToday(dateObj)) {
                dateText = "Today";
                todoCardDueDate.style.color = "var(--priority-high)";
                todoCardDueDate.style.fontWeight = "bold";
            }
            else if(isTomorrow(dateObj)) {
                dateText = "Tomorrow";
            }
            else if(isYesterday(dateObj)) {
                dateText = "Yesterday";
            }
            else {
                dateText = format(dateObj, "do MMM yyyy");
            }
            todoCardDueDate.textContent = dateText;
        }
        todoCardDueDate.classList.add("todo-card-duedate");
        todoCard.classList.add(`${todo.priority}-color`);

        const todoEditBtn = document.createElement("button");
        todoEditBtn.classList.add("todo-edit-btn");
        todoEditBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil-outline</title><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>`;

        const todoDeleteBtn = document.createElement("button");
        todoDeleteBtn.classList.add("todo-delete-btn");
        todoDeleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>`;

        const rightSideControls = document.createElement('div');
        rightSideControls.classList.add("todo-card-controls");

        rightSideControls.appendChild(todoCardDueDate);
        rightSideControls.appendChild(todoEditBtn);
        rightSideControls.appendChild(todoDeleteBtn);
        todoCard.appendChild(todoCardTitle);
        todoCard.appendChild(rightSideControls);

        todoListContainer.appendChild(todoCard);
    });
}

function clearTodos() {
    todoListContainer.innerHTML = "";
}

function bindAddTodoSubmit(handleAddTodo) {
    addTodoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(addTodoForm);
        const todoData = Object.fromEntries(formData.entries());
        handleAddTodo(todoData);
        addTodoForm.reset();
        console.log(todoData);
    });
}

function bindAddProjectSubmit(handleAddProjectSubmitCallback) {
    addProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newProjectName = addProjectForm.querySelector('input').value;
        handleAddProjectSubmitCallback(newProjectName);
        addProjectForm.reset();
    });
}

// function bindProjectSelection(handleSwitchProject) {
//     projectListContainer.addEventListener("click", (event) => {
//         if (event.target.matches(".project-button")) {
//             const projectId = event.target.dataset.id;
//             handleSwitchProject(projectId);
//         }
//     });
// }

function bindProjectActions(handleSwitchProject, handleDeleteProject) {
    projectListContainer.addEventListener("click", (event) => {
        let projectRow = event.target.closest(".project-div");
        if (!projectRow) return;
        let projectId = projectRow.dataset.id;

        if (event.target.closest(".project-delete-btn")) {
            handleDeleteProject(projectId);
        }
        else if(event.target.closest(".project-edit-btn")) {
            const currentName = projectRow.querySelector(".project-name").textContent;
            openEditProjectModal(projectId, currentName);
        }
        else {
            handleSwitchProject(projectId);
        }
    });
}

function openEditModal(todoData) {
    editTitleIn.value = todoData.title;
    editDescriptionIn.value = todoData.description;
    editDueDateIn.value = todoData.dueDate;
    editPriorityIn.value = todoData.priority;
    editNotesIn.value = todoData.notes;
    editChecklistIn.value = todoData.checklist;

    editForm.dataset.id = todoData.id;
    editModal.classList.remove("hide-edit-modal");
    editModal.classList.add("active-edit-modal");
}

function closeEditModal() {
    // editTitleIn.value = "";
    // editDescriptionIn.value = "";
    // editDueDateIn.value = "";
    // editPriorityIn.value = "";
    // editNotesIn.value = "";
    // editChecklistIn.value = "";
    editForm.reset();
    editModal.classList.remove("active-edit-modal");
    editModal.classList.add("hide-edit-modal");
}

function bindTodoActions(handdleEditRequest, handleDeleteTodo) {
    todoListContainer.addEventListener("click", (event) => {
        let card = event.target.closest(".todo-card");
        if (!card) {
            return;
        }
        let todoId = card.dataset.id;

        if (event.target.closest(".todo-edit-btn")) {
            let todoData = handdleEditRequest(todoId);
            openEditModal(todoData);
        }
        else if (event.target.closest(".todo-delete-btn")) {
            handleDeleteTodo(todoId);
        }
    });
}

function bindEditTodoSubmit(handleEditCallback) {
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const todoId = event.target.dataset.id;
        const updatedformData = new FormData(editForm);
        const updatedtodoData = Object.fromEntries(updatedformData.entries());
        handleEditCallback(todoId, updatedtodoData);
        closeEditModal();
    });
}

function openEditProjectModal(projectId, currentName) {
    editProjectNameIn.value = currentName;
    editProjectForm.dataset.id = projectId;
    editProjectModal.classList.remove("hide-edit-modal");
    editProjectModal.classList.add("active-edit-modal");
}

closeEditProjectModalBtn.addEventListener("click", (event) => {
    editProjectModal.classList.remove("active-edit-modal");
    editProjectModal.classList.add("hide-edit-modal");
});

function bindEditProjectSubmit(handleEditProjectCallback) {
    editProjectForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const projectId = event.target.dataset.id;
        const newName = editProjectNameIn.value;

        handleEditProjectCallback(projectId, newName);

        editProjectModal.classList.remove("active-edit-modal");
        editProjectModal.classList.add("hide-edit-modal");
    });
}

export { renderProjects, renderTodos, bindAddTodoSubmit, bindAddProjectSubmit, bindProjectActions, bindTodoActions, bindEditTodoSubmit, bindEditProjectSubmit };