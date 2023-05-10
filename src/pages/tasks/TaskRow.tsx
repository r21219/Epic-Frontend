// /pages/categories/TaskRow.tsx
import React, {useEffect, useState} from "react";
import Task from "../../models/Task";
import {Category} from "../../models/Category";
import {ApiClient} from "../../controllers/ApiClient";
import {NewTask} from "../../models/NewTask";
import {Button} from "react-bootstrap";
import {NewCategory} from "../../models/NewCategory";
import { AiOutlineDelete } from 'react-icons/ai';

interface TaskRowProps {
    task: Task;
}

const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<NewTask>(new NewTask("", null,new NewCategory("") as Category, false));
    const [titleClass, setTitleClass] = useState<string>("");
    const [deadLineClass, setDeadLineClass] = useState<Date | null>(null);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${day}.${month}.${year}`;
    };
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

            <div className="task-row">
                <div className="col">{task.title}</div>
                <div className="col">{"Due date: "}{formatDate(task.deadLine.toString())}</div>
                <Button variant="danger" onClick={createTask}><AiOutlineDelete /> {/* Trash can icon */}</Button>
            </div>
            <br/>


        </>
    );
};

export default TaskRow;
