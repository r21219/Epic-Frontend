import React, {useEffect, useState} from "react";
import {Accordion, Button, Card, Form, Modal, Stack, Table} from "react-bootstrap";

//import {Category} from "../models/Category";
//import { Category, Task, sampleCategories } from "../testing-data/sampleCategory";
import {  sampleCategories } from "../testing-data/sampleCategory";
import {renderTasks} from "./RenderTasks";
import {useCategories} from "./OperationsTask";
import { Category } from "../models/Category";
import Task from "../models/Task";
//import {deleteTask} from "./OperationsTask";


const Categories=() => {
    const { categories, setCategories, addTask, deleteTask } = useCategories(sampleCategories);

        /*let deleteTask = (categoryId: number, taskId: number) => {
            console.log(`Deleting task ${taskId} from category ${categoryId}`);

        }*/
        return sampleCategories.map((category) => (
            <Accordion key={category.id}>
                <Card>
                    <Accordion as={Card.Header} eventKey={category.id.toString()}>
                        {category.name}
                    </Accordion>
                    {/*<Accordion.Collapse eventKey={category.id.toString()}>
            <Card.Body>{renderTasks(category.tasks)}</Card.Body>
          </Accordion.Collapse>*/}
                    <Accordion.Item eventKey={category.id.toString()}>
                        <Card.Body>{renderTasks(category.tasks, category.id, deleteTask)}</Card.Body>
                    </Accordion.Item>
                </Card>
            </Accordion>
        ));

};
export { Categories, sampleCategories };
//export default Categories;