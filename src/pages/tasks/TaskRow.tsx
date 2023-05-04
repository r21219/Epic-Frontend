// /pages/categories/TaskRow.tsx
import React, {useEffect, useState} from "react";
import Task from "../../models/Task";
import {Category} from "../../models/Category";
import {ApiClient} from "../../controllers/ApiClient";
import {NewTask} from "../../models/NewTask";
import {Button} from "react-bootstrap";

interface TaskRowProps {
    task: Task;
}

const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<NewTask>(new NewTask("", null,"Work", false));
    const [titleClass, setTitleClass] = useState<string>("");
    const [deadLineClass, setDeadLineClass] = useState<Date | null>(null);
    useEffect(() => {
        ApiClient.getTasks().then((data) => setTasks(data));
    }, []);

    const createTask = () : void =>{
        setTitleClass("");
        setDeadLineClass(null);
        if(newTask.title.trim().length > 0 && newTask.category ){
            ApiClient.createTask(newTask).then(task => {
                const tasksCopy = tasks.slice();
                tasksCopy.push(task);
                setTasks(tasksCopy);
                setNewTask(new NewTask("", null, "Work", false));
                //closeModal();
            });
        } else {
            /*if(!newBand.name || newBand.name.trim().length === 0){
                setNameClass("border border-danger");
            }
            if(!newBand.founded){
                setFoundedClass("border border-danger");
            }*/
            <p>Chyba</p>
        }
    };
    return (
        <>

            <td>{task.title}</td>
            <td>{task.deadLine.toString()}</td>
            <Button variant="success" onClick={createTask}>
                CreateTask
            </Button>
            <br/>
        </>
    );
};

export default TaskRow;
