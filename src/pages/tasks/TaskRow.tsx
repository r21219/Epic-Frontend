// /pages/categories/TaskRow.tsx
import React from "react";
import Task from "../../models/Task";

interface TaskRowProps {
    task: Task;
}

const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
    return (
        <>
            <td>{task.title}</td>
            <td>{task.deadLine}</td>
            <br/>
        </>
    );
};

export default TaskRow;
