export default interface Task {
    id: number;
    title: string;
    deadLine: Date;
    category: string;
    completed: boolean;
}