// /pages/categories/TaskRow.tsx
import React, {useEffect, useState} from "react";
import Task from "../../models/Task";
import {Category} from "../../models/Category";
import {ApiClient} from "../../controllers/ApiClient";
import {NewTask} from "../../models/NewTask";
import {Button} from "react-bootstrap";
import {NewCategory} from "../../models/NewCategory";

interface TaskRowProps {
    task: Task;
}

const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<NewTask>(new NewTask("", null,new NewCategory("") as Category, false));
    const [titleClass, setTitleClass] = useState<string>("");
    const [deadLineClass, setDeadLineClass] = useState<Date | null>(null);
    useEffect(() => {
        ApiClient.getTasks().then((data) => setTasks(data));
    }, []);

    const createTask = () : void =>{
        setTitleClass("Halo");
        setDeadLineClass(null);
        if(newTask.title.trim().length > 0 && newTask.category ){
            ApiClient.createTask(newTask.category.id,newTask).then(task => {
                const tasksCopy = tasks.slice();
                //tasksCopy.push(task);
                setTasks(tasksCopy);
                setNewTask(new NewTask("", null, new NewCategory("") as Category, false));
                //print in console
                console.log(task);
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

            {task.title}
            {task.deadLine.toString()}
            {<Button variant="success" onClick={createTask}>
                CreateTask
            </Button>}
            <br/>


        </>
    );
};

export default TaskRow;
