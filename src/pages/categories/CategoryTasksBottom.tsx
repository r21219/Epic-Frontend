import { useContext, useState } from "react";
import { ApiClient } from "../../controllers/ApiClient";
import { Form, Button, Row, Col } from "react-bootstrap";
import { NewTask } from "../../models/NewTask";
import DatePicker from "react-datepicker";
import { NewCategory } from "../../models/NewCategory";
import { Category } from "../../models/Category";
import { CategoryContext } from "../../Contexts/CategoryContext";

const CategoryTasksBottom = () => {
    const { categories, updateCategories, updateTasks } = useContext(CategoryContext);
    const [newTask, setNewTask] = useState<NewTask>(
        new NewTask("", null, new NewCategory("") as Category, false)
    );

    const createTask = () => {
        if (newTask.title.trim().length > 0 && newTask.category) {
            ApiClient.createTask(newTask.category.id, newTask).then((category) => {
                updateTasks(category.id, category.tasks);
                updateCategories(categories.map((existingCategory) =>
                    existingCategory.id === category.id ? category : existingCategory
                ));
                setNewTask(new NewTask("", null, new NewCategory("") as Category, false));
            });
        } else {
            console.error("Invalid input");
        }
    };

    return (
        <div className="position-fixed bottom-0 start-50 translate-middle-x">
            <div className="bg-light p-3">
                <Form>
                    <Row className="g-3 align-items-center">
                        <Col md="auto">
                            <Form.Label>Title:</Form.Label>
                        </Col>
                        <Col>
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
                        </Col>

                        <Col md="auto">
                            <Form.Label>Date:</Form.Label>
                        </Col>
                        <Col>
                            <DatePicker
                                selected={newTask.deadLine}
                                onChange={(date: Date) =>
                                    setNewTask((prevTask) => ({ ...prevTask, deadLine: date }))
                                }
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Select deadline"
                                className="form-control"
                            />
                        </Col>

                        <Col md="auto">
                            <Form.Label>Category:</Form.Label>
                        </Col>
                        <Col>
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
                        </Col>

                        <Col md="auto">
                            <Button variant="primary" type="button" onClick={createTask}>
                                Create Task
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default CategoryTasksBottom;
