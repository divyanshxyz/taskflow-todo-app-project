export default class Todo {
    constructor(title, description, dueDate, priority, notes, checklist, isComplete)  {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority
        this.notes = notes;
        this.checklist = checklist;
        this.isComplete = isComplete;
    }

    toggleComplete() {
        this.isComplete = !this.isComplete;
    }
    updatePriority(newPriority) {
        this.priority = newPriority;
    }
    editDetails(newDetailsObject) {
        if(newDetailsObject.title)
            this.title = newDetailsObject.title;
        if(newDetailsObject.description)
            this.description = newDetailsObject.description;
        if(newDetailsObject.dueDate)
            this.dueDate = newDetailsObject.dueDate;
        if(newDetailsObject.priority)
            this.priority = newDetailsObject.priority;
        if(newDetailsObject.notes)
            this.notes = newDetailsObject.notes;
        if(newDetailsObject.checklist)
            this.checklist = newDetailsObject.checklist;
        if(newDetailsObject.isComplete)
            this.isComplete = newDetailsObject.isComplete;
    }
}