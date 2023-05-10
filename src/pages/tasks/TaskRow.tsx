// /pages/categories/TaskRow.tsx
import React, {useContext, useEffect, useState} from "react";
import Task from "../../models/Task";
import {Category} from "../../models/Category";
import {ApiClient} from "../../controllers/ApiClient";
import {NewTask} from "../../models/NewTask";
import {Button} from "react-bootstrap";
import {NewCategory} from "../../models/NewCategory";
import {AiOutlineDelete} from 'react-icons/ai';
import {CategoryContext} from "../../Contexts/CategoryContext";

interface TaskRowProps {
    task: Task;
}

const TaskRow: React.FC<TaskRowProps> = ({task}) => {
    const { categories, updateCategories } = useContext(CategoryContext);
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${day}.${month}.${year}`;
    };
    const deleteTask = (taskId: number) => {
        ApiClient.deleteTask(taskId).then((category) => {
            const updatedCategories = categories.map((existingCategory) =>
                existingCategory.id === category.id ? category : existingCategory
            );
            updateCategories(updatedCategories);
        });
    };
    return (
        <>

            <div className="task-row">
                <div className="col">{task.title}</div>
                <div className="col">{"Due date: "}{formatDate(task.deadLine.toString())}</div>
                <Button variant="danger" onClick={() => deleteTask(task.id)}>
                    <AiOutlineDelete/> {/* Trash can icon */}
                </Button>
            </div>
            <br/>


        </>
    );
};

export default TaskRow;
