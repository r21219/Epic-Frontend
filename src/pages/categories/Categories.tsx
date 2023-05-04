// /pages/categories/Categories.tsx
import { useEffect, useState } from "react";
import { ApiClient } from "../../controllers/ApiClient";
import { Category } from "../../models/Category";
import {Button, Container, DropdownButton, Form, FormControl, InputGroup, Modal, Stack, Table} from "react-bootstrap";
import CategoryRow from "./CategoryRow";
import TaskRow from "../tasks/TaskRow";
import {NewTask} from "../../models/NewTask";
import DatePicker from "react-datepicker";
import {NewCategory} from "../../models/NewCategory";
import Task from "../../models/Task";


const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newTask, setNewTask] = useState<NewTask>(new NewTask("", null, new NewCategory("") as Category, false));

    useEffect(() => {
        ApiClient.getCategories().then((data) => setCategories(data));
    }, []);
    const createTask = () => {
        if (newTask.title.trim().length > 0 && newTask.category) {
            ApiClient.createTask(newTask).then((task) => {
                const updatedCategories = categories.slice();
                const categoryIndex = updatedCategories.findIndex(
                    (category) => category === task.category
                );

                if (categoryIndex !== -1) {
                    updatedCategories[categoryIndex].tasks.push(task);
                    setCategories(updatedCategories);
                    setNewTask(new NewTask("", null,task.category, false));
                } else {
                    console.error("Category not found");
                }
            });
        } else {
            console.error("Invalid input");
        }
    };

    return (
        <>
            <Container fluid className="app-container">
            <Stack direction="horizontal" gap={3}>
                <h2>Categories</h2>
            </Stack>

            <p>Tady bude tabulka všech kategorií.</p>

                    Name
                    Task
                    Deadline

                {categories.map((category) => (
                    <CategoryRow category={category} key={category.id} />
                ))}



                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter task title"
                            value={newTask.title}
                            onChange={(e) =>
                                setNewTask((prevTask) => ({ ...prevTask, title: e.target.value }))
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={newTask.category?.title}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.title}>
                                    {category.title}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="deadline">
                        <Form.Label>Deadline</Form.Label>
                        <DatePicker
                            selected={newTask.deadLine}
                            onChange={(date: Date) =>
                                setNewTask((prevTask) => ({ ...prevTask, deadLine: date }))
                            }
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select deadline"
                        />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={createTask}>
                        Create Task
                    </Button>
                </Form>

            </Container>
        </>
    );
};

export default Categories;
