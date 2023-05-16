import {Category} from "../models/Category";
import {NewTask} from "../models/NewTask";
import Task from "../models/Task";


export class ApiClient {
    public static async getCategories(): Promise<Category[]> {
        const response = await fetch("http://localhost:8080/categories");
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }
    public static async getSortedCategories(sortType: number): Promise<Category[]>{
        const response = await fetch("http://localhost:8080/categories/sort/" + sortType);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }
    public static async getSortedTasks(categoryId: number,sortType: number): Promise<Task[]>{
        const response = await fetch("http://localhost:8080/tasks/sort/" + categoryId + "/" +sortType);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }
    public static async getSearchedCategories(title: string): Promise<Category[]>{
        const response = await fetch("http://localhost:8080/categories/search/" + title);
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

    public static async deleteTask(id: number): Promise<Category> {
        const response = await fetch("http://localhost:8080/categories/del/" + id,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async createTask(categoryId: number, newTask: NewTask): Promise<Category> {
        const task = {
            title: newTask.title,
            deadLine: new Date(newTask.deadLine as Date),
            category: newTask.category,
        } as Task;
        const response = await fetch("http://localhost:8080/categories/add/"+categoryId,
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
    public static async updateTask(updatedTask: Task): Promise<Task> {
        const task = {
            id: updatedTask.id,
            title: updatedTask.title,
            deadLine: new Date(updatedTask.deadLine as Date),
            category: updatedTask.category,
            complete: updatedTask.complete
        } as Task;
        const response = await fetch("http://localhost:8080/tasks",
            {
                method: "PUT",
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

    //updateCategory
    public static async updateCategory(updatedCategory: Category): Promise<Category> {
        const category = {
            id: updatedCategory.id,
            title: updatedCategory.title,
            tasks: updatedCategory.tasks,
        } as Category;
        const response = await fetch("http://localhost:8080/categories",
            {
                method: "PUT",
                body: JSON.stringify(category),
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