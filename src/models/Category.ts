import Task from "./Task";

export interface Category {
    id: number;
    name: string;
    tasks: Task[];
}