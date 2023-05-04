import {Category} from "./Category";

export default interface Task {
    id: number;
    title: string;
    deadLine: Date;
    category: Category;
    completed: boolean;
}