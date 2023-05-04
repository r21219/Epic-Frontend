export class NewTask{
    constructor(public title: string, public deadLine: Date | null,public category: string,public completed: boolean) {
    }
}