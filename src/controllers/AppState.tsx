import { useState } from "react";
//import { Category, Task } from "sampleCategory";
//import { addTask } from "./OperationsTask";
//import { deleteTask } from "./DeleteTask";
/*import {addTask, useCategories} from "./OperationsTask";
import { deleteTask } from "./OperationsTask";*/
import { sampleCategories, Category } from "../testing-data/sampleCategory";
import {useCategories} from "./OperationsTask";


export const useAppState = () => {
    const { categories, setCategories, addTask, deleteTask } = useCategories(sampleCategories);

    const [searchTerm, setSearchTerm] = useState("");
    //const [categories, setCategories] = useState<Category[]>(sampleCategories);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );
    const [taskTitle, setTaskTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [inputValidation, setInputValidation] = useState({
        taskTitle: true,
        deadline: true,
        category: true,
    });

    const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value);
    };

    const handleDeadlineChange = (date: Date | null) => {
        if (date) {
            setDeadline(date.toISOString().split("T")[0]);
        } else {
            setDeadline("");
        }
    };

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const validateInput = () => {
        const newValidation = {
            taskTitle: taskTitle.length > 0,
            deadline: deadline.length > 0,
            category: !!selectedCategory,
        };
        setInputValidation(newValidation);
        return Object.values(newValidation).every(Boolean);
    };

    const clearInput = () => {
        setTaskTitle("");
        setDeadline("");
        setSelectedCategory(null);
    };

    const addTaskHandler = () => {
        if (!validateInput() || !selectedCategory) {
            return;
        }
        addTask(selectedCategory.id, { id: 1,
            title: taskTitle,
            date: deadline, category: selectedCategory.name, completed: false });

        clearInput();
    };

    return {
        searchTerm,
        setSearchTerm,
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
        taskTitle,
        setTaskTitle,
        deadline,
        setDeadline,
        inputValidation,
        setInputValidation,
        handleTaskTitleChange,
        handleDeadlineChange,
        handleCategorySelect,
        handleSearchInputChange,
        validateInput,
        clearInput,
        addTaskHandler,
        deleteTask,
    };
};

