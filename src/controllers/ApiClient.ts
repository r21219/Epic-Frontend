import {Category} from "../models/Category";
import {NewTask} from "../models/NewTask";
import Task from "../models/Task";
import {NewCategory} from "../models/NewCategory";


export class ApiClient {
    public static async getCategories(): Promise<Category[]> {
        const response = await fetch("http://localhost:8080/categories");
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async getTasks(): Promise<Task[]> {
        const response = await fetch("http://localhost:8080/tasks");
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async getCategory(id: number): Promise<Category> {
        const response = await fetch("http://localhost:8080/categories/" + id);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async createTask(newTask: NewTask): Promise<Task> {
        const task = {
            title: newTask.title,
            deadLine: new Date(newTask.deadLine as Date),
            category: newTask.category,
            completed: newTask.completed
        } as Task;
        const response = await fetch("http://localhost:8080/tasks",
            {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.text());
    }



}