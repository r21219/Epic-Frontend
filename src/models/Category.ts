import Task from "./Task";

export default interface Category {
    id: number;
    title: string;
    tasks: Task[];
}