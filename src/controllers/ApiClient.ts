import {Category} from "../models/Category";


export class ApiClient {
    public static async getCategories(): Promise<Category[]> {
        const response = await fetch("http://localhost:8080/categories");
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


}