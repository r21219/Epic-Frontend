import Task from "./Task";

export interface Category {
    id: number;
    title: string;
    tasks: Task[];
}