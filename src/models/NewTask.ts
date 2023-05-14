import {Category} from "./Category";

export class NewTask{
    constructor(public title: string, public deadLine: Date | null, public category: Category,public complete: boolean) {
    }
}