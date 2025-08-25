
class TaskTable {
    constructor() {
        this.tasks = new Map();
        this.autoIncrementId = 1;
    };


    create({ title, description, priority, status, assign_by, assign_to, sub_tasks }) {
        const id = this.autoIncrementId++;

        this.tasks.set(id, { id, title, description, priority, status: status ?? 'to do', assign_by, assign_to, sub_tasks });
    };


    findAll() {
        return Array.from(this.tasks.values()) || [];
    };


    findAllMy(user_id) {
        return Array.from(this.tasks.values()).filter(task => task.assign_to === Number(user_id)) || [];
    };


    findOne(id) {
        return Array.from(this.tasks.values()).find(task => task.id === id) || null;
    };


    update(id, updates) {
        const task_id = Number(id);
        const task = this.tasks.get(task_id);
        console.log({ task_id, task });
        if (!task) return null;

        if (task.status === 'done') return null;
        const update_task = { ...task, ...updates, id: task.id };

        this.tasks.set(task.id, update_task);
        return update_task;
    };


    delete(id) {
        const task = Array.from(this.tasks.values()).find(task => task.id === id) || null;
        if (!task) return null;
        if (task.status === 'done') return null;

        return this.tasks.delete(task.id);
    };

    findAllBlock() {
        return Array.from(this.tasks.values()).filter(task => task.status !== 'done') || [];
    };
};


const Task = new TaskTable();

export default Task;
