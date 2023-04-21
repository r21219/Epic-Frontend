import {Button, Card, Col, Form, Row} from "react-bootstrap";
import React from "react";

//import sampleCategory from /testing-data
import { Category, Task, sampleCategories } from "../testing-data/sampleCategory";

const renderTasks = (
    tasks: Task[],
    categoryId: number,
    deleteTask: (categoryId: number, taskId: number) => void
) => {
    return tasks.map((task) => (
        <Card>
            <Row key={task.id} className="task">
                <Col>
                    <Form.Check
                        type="checkbox"
                        id={`task-checkbox-${task.id}`}
                        className="task-checkbox"
                        checked={task.completed}
                        onChange={() => {
                            // Handle checkbox change event
                        }}
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor={`task-checkbox-${task.id}`} className="task-title">
                        {task.title}
                    </Form.Label>
                </Col>
                <Col>
                    <span className="task-date">{task.date}</span>
                </Col>
                <Col>
                    <span className="task-category">{task.category}</span>
                </Col>
                <Col xs="auto">
                    <Button
                        variant="danger"
                        onClick={() => deleteTask(categoryId, task.id)}
                    >
                        {/* Replace the text with a delete icon */}
                        Delete
                    </Button>
                </Col>
            </Row>
        </Card>
    ));
};

export { renderTasks, sampleCategories };