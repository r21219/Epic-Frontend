import { useContext, useState } from "react";
import { ApiClient } from "../../controllers/ApiClient";
import { Form, Button } from "react-bootstrap";
import { NewTask } from "../../models/NewTask";
import DatePicker from "react-datepicker";
import { NewCategory } from "../../models/NewCategory";
import {Category} from "../../models/Category";
import {CategoryContext} from "../../Contexts/CategoryContext";

const CategoryTasksBottom = () => {
    const { categories, updateCategories } = useContext(CategoryContext);
    const [newTask, setNewTask] = useState<NewTask>(
        new NewTask("", null, new NewCategory("") as Category, false)
    );

    const createTask = () => {
        if (newTask.title.trim().length > 0 && newTask.category) {
            ApiClient.createTask(newTask.category.id, newTask).then((category) => {
                const updatedCategories = categories.map((existingCategory) =>
                    existingCategory.id === category.id ? category : existingCategory
                );

                updateCategories(updatedCategories);
                setNewTask(
                    new NewTask("", null, new NewCategory("") as Category, false)
                );
            });
        } else {
            console.error("Invalid input");
        }
    };

    return (
        <>
            <Form>
                <div className="row">
                    <div className="col-md">
                        <Form.Group controlId="title">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task title"
                                value={newTask.title}
                                onChange={(e) =>
                                    setNewTask((prevTask) => ({
                                        ...prevTask,
                                        title: e.target.value,
                                    }))
                                }
                            />
                        </Form.Group>
                    </div>

                    <div className="col-md">
                        <Form.Group controlId="deadline">
                            <Form.Label>Date:</Form.Label>
                            <DatePicker
                                selected={newTask.deadLine}
                                onChange={(date: Date) =>
                                    setNewTask((prevTask) => ({ ...prevTask, deadLine: date }))
                                }
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select deadline"
                            />
                        </Form.Group>
                    </div>

                    <div className="col-md">
                        <Form.Group controlId="category">
                            <Form.Label>Category:</Form.Label>
                            <Form.Control
                                as="select"
                                value={newTask.category?.title}
                                onChange={(e) => {
                                    const selectedCategory = categories.find(
                                        (category) => category.title === e.target.value
                                    );
                                    if (selectedCategory) {
                                        setNewTask((prevTask) => ({
                                            ...prevTask,
                                            category: selectedCategory,
                                        }));
                                    }
                                }}
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.title}>
                                        {category.title}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div className="col-md">
                        <div className="d-flex align-items-center">
                            <Button variant="primary" type="button" onClick={createTask}>
                                Create Task
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default CategoryTasksBottom;
