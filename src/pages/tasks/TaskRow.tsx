import React, {useState, useContext} from "react";
import Task from "../../models/Task";
import {ApiClient} from "../../controllers/ApiClient";
import {Button, Form} from "react-bootstrap";
import {AiOutlineDelete} from "react-icons/ai";
import {CategoryContext} from "../../Contexts/CategoryContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import { IoEllipseOutline } from "react-icons/io5";

interface TaskRowProps {
    task: Task;
    categoryId: number;
}

const TaskRow: React.FC<TaskRowProps> = ({task, categoryId}) => {
    const { categories, updateCategories, updateTasks } = useContext(CategoryContext);
    const [editing, setEditing] = useState(false);
    const [hover, setHover] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${day}.${month}.${year}`;
    };

    const deleteTask = (taskId: number) => {
        ApiClient.deleteTask(taskId).then((category) => {
            const updatedCategories = categories.map((existingCategory) =>
                existingCategory.id === category.id ? category : existingCategory
            );
            updateTasks(category.id, category.tasks);
            updateCategories(updatedCategories);
        });
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setEditedTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSave = () => {
        ApiClient.updateTask(editedTask).then(() => {
            fetchCategoryInformation(categoryId);
            setEditing(false);
        });
    };

    const fetchCategoryInformation = (categoryId: number) => {
        ApiClient.getCategory(categoryId).then((category) => {
            const updatedCategories = categories.map((existingCategory) =>
                existingCategory.id === category.id ? category : existingCategory
            );

            updateCategories(updatedCategories);
        });
    };

    const toggleCompleted = () => {
        setEditedTask((prevTask) => ({
            ...prevTask,
            complete: !prevTask.complete,
        }));
    };

    const handleCheck = () => {
        toggleCompleted();
        handleSave();
    };


    return (
        <>
            <div className={`task-row ${task.complete ? 'completed-task' : ''}`}>
                <div
                    className="task-icon"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={toggleCompleted}
                >
                    {task.complete ? (
                        <AiFillCheckCircle />
                    ) : hover ? (
                        <AiOutlineCheckCircle />
                    ) : (
                        <IoEllipseOutline />
                    )}
                </div>

                {editing ? (
                    <>
                        <div className="col">
                            <Form.Control
                                type="text"
                                name="title"
                                value={editedTask.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col">
                            <DatePicker
                                selected={new Date(editedTask.deadLine)}
                                onChange={(date: Date) =>
                                    setEditedTask((prevTask) => ({...prevTask, deadLine: date}))
                                }
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select deadline"
                                className="form-control"
                            />
                        </div>
                        <div className="col">
                            <Button
                                variant={editedTask.complete ? "success" : "outline-success"}
                                onClick={toggleCompleted}
                            >
                                {editedTask.complete ? "Completed" : "Mark as Completed"}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="col">
                            <span onClick={handleCheck}>
                                {task.complete ? <FaCheckSquare /> : <FaRegCheckSquare />}
                            </span>
                            {task.title}
                        </div>
                        <div className="col">Due date: {formatDate(task.deadLine.toString())}</div>
                        <div className="col">Status: {task.complete ? "Completed" : "Incomplete"} </div>
                    </>
                )}
                {editing ? (
                    <Button className={"me-3"} variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                ) : (
                    <Button className={"me-3"} variant="secondary" onClick={handleEdit}>
                        Edit
                    </Button>
                )}
                <Button variant="danger" onClick={() => deleteTask(task.id)}>
                    <AiOutlineDelete/> {/* Trash can icon */}
                </Button>
            </div>
            <br/>
        </>
    );
};
export default TaskRow;