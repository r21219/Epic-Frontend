import {useContext, useState} from "react";
import {ApiClient} from "../../controllers/ApiClient";
import {Form, Button, Row, Col} from "react-bootstrap";
import {NewTask} from "../../models/NewTask";
import DatePicker from "react-datepicker";
import {NewCategory} from "../../models/NewCategory";
import {CategoryContext} from "../../Contexts/CategoryContext";
import Category from "../../models/Category";

const CategoryTasksBottom = () => {
    const { categories, updateCategories, updateTasks } = useContext(CategoryContext);
    const [newTask, setNewTask] = useState<NewTask>(
        new NewTask("", null, categories[0] || new NewCategory("") as Category, false)
    );
    const [titleError, setTitleError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);


    const createTask = () => {
        let isError = false;
        if (newTask.title.trim().length === 0) {
            setTitleError(true);
            isError = true;
        }
        if (!newTask.category || newTask.category.title === "Select a category") {
            setCategoryError(true);
            isError = true;
        }

        if (isError) {
            return;
        }

        ApiClient.createTask(newTask.category.id, newTask).then((category) => {
            updateTasks(category.id, category.tasks);
            updateCategories(
                categories.map((existingCategory) =>
                    existingCategory.id === category.id ? category : existingCategory
                )
            );
            setNewTask(new NewTask("", null, newTask.category, false));
            setTitleError(false);
            setCategoryError(false);
        });
    };



    return (
        <div id={"input-newTask"} className="position-fixed bottom-0 start-50 translate-middle-x w-75">
            <div className="new-task p-3">
                <Form className={"pb-5"}>
                    <Row className="g-3 align-items-center">
                        <Col md="auto">
                            <Form.Label>Title:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Do or do not, there is no try"
                                value={newTask.title}
                                className={titleError ? 'border-danger' : ''}
                                onChange={(e) => {
                                    setTitleError(false);
                                    setNewTask((prevTask) => ({
                                        ...prevTask,
                                        title: e.target.value,
                                    }))
                                }}
                            />
                            {titleError && <div className="text-danger">Task title is required</div>}

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
                                value={newTask.category?.id}
                                className={categoryError ? 'border-danger' : 'select-category'}
                                onChange={(e) => {
                                    const selectedCategoryId = parseInt(e.target.value);
                                    const selectedCategory = categories.find(
                                        (category) => category.id === selectedCategoryId
                                    );
                                    if (selectedCategory) {
                                        setCategoryError(false);
                                        setNewTask((prevTask) => ({
                                            ...prevTask,
                                            category: selectedCategory,
                                        }));
                                    }
                                }}

                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </Form.Control>
                            {categoryError && <div className="text-danger">Task category is required</div>}

                        </Col>

                        <Col md="auto">
                            <Button variant="primary" type="button" className={"create-task"} onClick={createTask}>
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
