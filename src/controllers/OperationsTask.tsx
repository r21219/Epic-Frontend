import React, {useEffect, useState} from "react";
import {Accordion, Button, Card, Form, Modal, Stack, Table} from "react-bootstrap";

//import {Category} from "../models/Category";
import { Category, Task, sampleCategories } from "../testing-data/sampleCategory";
import {renderTasks} from "./RenderTasks";

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

    const isFormValid = () => {
        const taskTitleValid = taskTitle.trim().length > 0;
        const deadlineValid = deadline.length > 0;
        const categoryValid = selectedCategory !== null;

        setInputValidation({
            taskTitle: taskTitleValid,
            deadline: deadlineValid,
            category: categoryValid,
        });

        return taskTitleValid && deadlineValid && categoryValid;
    };

    const addTask = (categoryId: number, task: Task) => {
        if (!isFormValid()) return;

        // Find the index of the selected category in the categories array
        const categoryIndex = categories.findIndex(
            (category) => category.id === selectedCategory?.id
        );

        if (categoryIndex !== -1 && selectedCategory) {
            // Generate a unique task ID
            const newTaskId =
                Math.max(...categories[categoryIndex].tasks.map((task) => task.id)) + 1;

            // Create a new task object
            const newTask: Task = {
                id: newTaskId,
                title: taskTitle,
                date: deadline,
                category: selectedCategory.name,
                completed: false,
            };

            // Add the new task to the tasks array of the selected category
            const updatedCategories = [...categories];
            updatedCategories[categoryIndex].tasks = [
                ...updatedCategories[categoryIndex].tasks,
                newTask,
            ];

            // Update the categories state
            setCategories(updatedCategories);

            // Clear the input fields
            setTaskTitle("");
            setDeadline("");
            setSelectedCategory(null);
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