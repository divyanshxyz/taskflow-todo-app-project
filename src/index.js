import * as appController from "./appController";
import * as UIController from "./UIController"
import "./css/reset.css";
import "./css/variables.css";
import "./css/layout.css";
import "./css/components.css";

// ... the rest of your JS imports and wiring
UIController.bindAddTodoSubmit(appController.handleAddTodo);
UIController.bindAddProjectSubmit(appController.handleAddProject);
UIController.bindEditTodoSubmit(appController.handleEditTodo)
UIController.bindEditProjectSubmit(appController.handleEditProject);
UIController.bindTodoActions(appController.getTodoById, appController.handleDeleteTodo);
UIController.bindProjectActions(appController.handleSwitchProject, appController.handleDeleteProject);
appController.initApp();

