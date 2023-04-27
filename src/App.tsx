// App.tsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    Container,
    Row,
    Col,
    Accordion,
    Card,
    Form, Button, Modal,
} from "react-bootstrap";
import "./App.css";
//import {useAppState} from "./controllers/AppState";
import {sampleCategories} from "./testing-data/sampleCategory";
import {renderTasks} from "./controllers/RenderTasks";
import {Category} from "./models/Category";
import {useCategories} from "./controllers/OperationsTask";
import Categories from "./pages/categories/Categories";


import Task from "./models/Task";
import {ApiClient} from "./controllers/ApiClient";
import CategoryRow from "./pages/categories/CategoryRow";


const App: React.FC = () => {
    const {categories, setCategories, deleteTask} = useCategories(sampleCategories);

    //const { categories, setCategories, addTask, deleteTask } = useCategories(sampleCategories);
    const {addTask} = useCategories(sampleCategories);

    const [searchTerm, setSearchTerm] = useState("");
    //const [categories, setCategories] = useState<Category[]>(sampleCategories);

    const [taskTitle, setTaskTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [inputValidation, setInputValidation] = useState({
        taskTitle: true,
        //deadline: true,
        category: true,
    });

    /*const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
    };*/
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    // Modal for adding new category visibility
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value);
        setInputValidation((prevState) => ({
            ...prevState,
            taskTitle: e.target.value.trim().length > 0,
        }));
    };

    useEffect(() => {
        ApiClient.getCategories().then(data => setCategories(data));
    }, []);


    const handleDeadlineChange = (date: Date | null) => {
        if (date) {
            setDeadline(date.toISOString().split("T")[0]);
        } else {
            setDeadline("");
        }
    };

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
        setInputValidation((prevState) => ({ ...prevState, category: true }));
    };


    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    /*const validateInput = () => {
        const newValidation = {
            taskTitle: taskTitle.length > 0,
            //deadline: deadline.length > 0,
            category: !!selectedCategory,
        };
        setInputValidation(newValidation);
        return Object.values(newValidation).every(Boolean);
    };*/
    const validateInput = () => {
        const validationResult = {
            taskTitle: taskTitle.trim().length > 0,
            category: selectedCategory !== null,
        };

        setInputValidation(validationResult);
        return validationResult.taskTitle && validationResult.category;
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
        const maxId = Math.max(
            ...categories.flatMap((category) =>
                category.tasks.map((task: Task) => task.id)
            )
        );
        const newTask: Task = {
            id: maxId + 1,
            title: taskTitle,
            deadLine: deadline,
            category: selectedCategory.title,
            completed: false,
        };
        addTask(selectedCategory.id, newTask);
        clearInput();
    };


    return (

        <Categories/>


    );
};


export default App;
