import Category from "../models/Category";
import {NewTask} from "../models/NewTask";
import Task from "../models/Task";
import User from "../models/User";
import {NewCategory} from "../models/NewCategory";

const apiPrefix = "http://localhost:8080";
export class ApiClient {
    public static async getCategories(): Promise<Category[]> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token available");
        }
        const response = await fetch(`${apiPrefix}/categories`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async getSortedCategories(sortType: number, userName: String | undefined): Promise<Category[]> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token available");
        }
        const response = await fetch(`${apiPrefix}/categories/sort/` + sortType + "/" + userName,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async getSortedTasks(categoryId: number, sortType: number): Promise<Task[]> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token available");
        }
        const response = await fetch(`${apiPrefix}/tasks/sort/` + categoryId + "/" + sortType,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async getSearchedCategories(title: string,userName: String | undefined): Promise<Category[]> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token available");
        }
        const response = await fetch(`${apiPrefix}/categories/search/` + title + "/" + userName,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async getCategory(id: number): Promise<Category> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token available");
        }
        const response = await fetch(`${apiPrefix}/categories/` + id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }
    public static async geByUser(userName: String | undefined): Promise<Category[]> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token available");
        }
        const response = await fetch(`${apiPrefix}/categories/user/` + userName,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }
    public static async deleteCategory(id: number){
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token available");
        }
        const response = await fetch(`${apiPrefix}/categories/` + id,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response.ok) {
            return;
        }
        throw new Error(await response.json());
    }

    public static async deleteTask(id: number): Promise<Category> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token available");
        }
        const response = await fetch(`${apiPrefix}/categories/del/` + id,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.json());
    }

    public static async createTask(categoryId: number, newTask: NewTask): Promise<Category> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token available");
        }
        const task = {
            title: newTask.title,
            deadLine: new Date(newTask.deadLine as Date),
            category: newTask.category,
        } as Task;
        const response = await fetch(`${apiPrefix}/categories/add/` + categoryId,
            {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.text());
    }

    public static async updateTask(updatedTask: Task): Promise<Task> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token available");
        }
        const task = {
            id: updatedTask.id,
            title: updatedTask.title,
            deadLine: new Date(updatedTask.deadLine as Date),
            category: updatedTask.category,
            complete: updatedTask.complete
        } as Task;
        const response = await fetch(`${apiPrefix}/tasks`,
            {
                method: "PUT",
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.text());
    }

    //updateCategory
    public static async updateCategory(updatedCategory: Category): Promise<Category> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token available");
        }
        const category = {
            id: updatedCategory.id,
            title: updatedCategory.title,
            tasks: updatedCategory.tasks,
        } as Category;
        const response = await fetch(`${apiPrefix}/categories`,
            {
                method: "PUT",
                body: JSON.stringify(category),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.text());
    }


    public static async createNewCategory(newCategory: Category, user: User | null): Promise<Category> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token available");
        }
        const category = {
            title: newCategory.title,
            tasks: newCategory.tasks,
            user: user
        } as NewCategory;
        const response = await fetch(`${apiPrefix}/categories`,
            {
                method: "POST",
                body: JSON.stringify(category),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.text());
    }

    public static async login(name: string, password: string): Promise<boolean> {
        const apiUrl = `${apiPrefix}/auth/login`;

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                console.log("Login token:", token);
                localStorage.setItem("token",token);
                return true;
            } else {
                const errorData = await response.json();
                console.error("Login error:", errorData);
                throw new Error(errorData.message || "Login failed");
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            throw new Error("An error occurred during login");
        }
    }

    public static async register(name: string, password: string): Promise<boolean> {
        const apiUrl = `${apiPrefix}/auth/register`;

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    password,
                }),
            });

            if (response.ok) {
                return true;
            } else {
                const errorData = await response.json();
                console.error("Register error:", errorData);
                throw new Error(errorData.message || "Registration failed");
            }
        } catch (error) {
            console.error("An error occurred during registration:", error);
            throw new Error("An error occurred during registration");
        }
    }
}