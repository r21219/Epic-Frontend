import React, {useEffect, useState} from "react";
import {Accordion, Button, Card, Form, Modal, Stack, Table} from "react-bootstrap";

//import {Category} from "../models/Category";
//import { Category, Task, sampleCategories } from "../testing-data/sampleCategory";
//import {renderTasks} from "./RenderTasks";
import { Category } from "../models/Category";
import Task from "../models/Task";

export const useCategories = (initialCategories: Category[]) => {
    const [categories, setCategories] = useState<Array<Category>>(initialCategories);
    const [taskTitle, setTaskTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [inputValidation, setInputValidation] = useState({
        taskTitle: true,
        deadline: true,
        category: true,
    });



    const addTask = (categoryId: number, task: Task) => {
        // Find the index of the category with the provided categoryId
        const categoryIndex = categories.findIndex((category) => category.id === categoryId);

        if (categoryIndex !== -1) {
            // Add the new task to the tasks array of the selected category
            const updatedCategories = [...categories];
            updatedCategories[categoryIndex].tasks = [
                ...updatedCategories[categoryIndex].tasks,
                task,
            ];

            // Update the categories state
            setCategories(updatedCategories);
        }
    };

    const deleteTask = (categoryId: number, taskId: number) => {
        // Find the index of the category with the provided categoryId
        const categoryIndex = categories.findIndex(
            (category) => category.id === categoryId
        );

        if (categoryIndex !== -1) {
            // Find the index of the task with the provided taskId
            const taskIndex = categories[categoryIndex].tasks.findIndex(
                (task) => task.id === taskId
            );

            if (taskIndex !== -1) {
                // Remove the task from the tasks array of the selected category
                const updatedCategories = [...categories];
                updatedCategories[categoryIndex].tasks.splice(taskIndex, 1);

                // Update the categories state
                setCategories(updatedCategories);
            }
        }
    };
    return { categories, setCategories, addTask, deleteTask };
};