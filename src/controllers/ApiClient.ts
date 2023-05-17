import Category from "../models/Category";
import {NewTask} from "../models/NewTask";
import Task from "../models/Task";
import User from "../models/User";
import {NewCategory} from "../models/NewCategory";


export class ApiClient {
    public static async getCategories(): Promise<Category[]> {
        const response = await fetch("http://localhost:8080/categories");
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async getSortedCategories(sortType: number, userName: String | undefined): Promise<Category[]> {
        const response = await fetch("http://localhost:8080/categories/sort/" + sortType + "/" + userName);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async getSortedTasks(categoryId: number, sortType: number): Promise<Task[]> {
        const response = await fetch("http://localhost:8080/tasks/sort/" + categoryId + "/" + sortType);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async getSearchedCategories(title: string,userName: String | undefined): Promise<Category[]> {
        const response = await fetch("http://localhost:8080/categories/search/" + title + "/" + userName);
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
    public static async geByUser(userName: String | undefined): Promise<Category[]> {
        const response = await fetch("http://localhost:8080/categories/user/" + userName);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }
    public static async deleteCategory(id: number){
        const response = await fetch("http://localhost:8080/categories/" + id,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });
        if (response.ok) {
            return;
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
        const response = await fetch("http://localhost:8080/categories/add/" + categoryId,
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

    public static async createUser(newUserName: String, password: String){
        const user = {
            name: newUserName,
            password: password
        }as User
        const response = await fetch("http://localhost:8080/users",
            {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            });
        if (response.ok) {
            return;
        }
        throw new Error(await response.text());
    }

    public static async loginUser(userName: String, password: String): Promise<User> {
        const response = await fetch("http://localhost:8080/users/" + userName + "/" + password);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async createNewCategory(newCategory: Category, user: User | null): Promise<Category> {
        const category = {
            title: newCategory.title,
            tasks: newCategory.tasks,
            user: user
        } as NewCategory;
        const response = await fetch("http://localhost:8080/categories",
            {
                method: "POST",
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