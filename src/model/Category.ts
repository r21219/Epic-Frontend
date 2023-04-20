import{Tasks} from "./Tasks";

export interface Category {
    id: number;
    name: string;
    tasks: Tasks[];
}