// /pages/categories/Categories.tsx
import { useEffect, useState } from "react";
import { ApiClient } from "../../controllers/ApiClient";
import { Category } from "../../models/Category";
import {Accordion, Button, Container, DropdownButton, Form, FormControl, InputGroup, Modal, Stack, Table} from "react-bootstrap";
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
            ApiClient.createTask(newTask.category.id, newTask).then((category) => {
                console.log("Received category:", category);

                const updatedCategories = categories.map((existingCategory) =>
                    existingCategory.id === category.id ? category : existingCategory
                );

                setCategories(updatedCategories);
                setNewTask(new NewTask("", null, new NewCategory("") as Category, false));
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

                <Accordion>
                    {categories.map((category) => (
                        <Accordion.Item eventKey={category.id.toString()} key={category.id}>
                            <Accordion.Header>{category.title}</Accordion.Header>
                            <Accordion.Body>
                                    <CategoryRow category={category} key={category.id}/>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>



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
