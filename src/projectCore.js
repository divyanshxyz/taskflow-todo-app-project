import Todo from "./todoCore";
export default class Project {

    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.todos = [];
    }

    addTodo(todoInstance) {
        this.todos.push(todoInstance);
    }
    removeTodo(todoId) {
        const index = this.todos.findIndex(todo => todo.id === todoId);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
        else {
            console.log(`Todo with id: ${todoId} not found`);
        }
    }
    updateName(newName) {
        this.name = newName;
    }
    getTodo(todoId) {
        const index = this.todos.findIndex(todo => todo.id === todoId);
        if (index !== -1) {
            return this.todos[index];
        }
        else {
            console.log(`Todo with id: ${todoId} not found`);
        }
    }
    getAllTodos() {
        return this.todos;
    }
}