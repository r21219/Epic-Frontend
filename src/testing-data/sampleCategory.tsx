import { Category } from "../models/Category";
import Task from "../models/Task";




export const sampleCategories: Category[] = [
    {
        id: 1,
        title: "Work",
        tasks: [
            {
                id: 1,
                title: "Task 1",
                deadLine: "2023-05-01",
                category: "Work",
                completed: false,
            },
            {
                id: 2,
                title: "Task 2",
                deadLine: "2023-05-15",
                category: "Work",
                completed: true,
            },
        ],
    },
    {
        id: 2,
        title: "Personal",
        tasks: [
            // ...tasks related to Personal category
            {
                id: 3,
                title: "Task 3",
                deadLine: "2023-05-10",
                category: "Personal",
                completed: false,
            },
            {
                id: 4,
                title: "Task 4",
                deadLine: "2023-05-20",
                category: "Personal",
                completed: false,
            },
        ],
    },
    // ...more categories
    {
        id: 3,
        title: "Shopping",
        tasks: [
            // ...tasks related to Shopping category
            {
                id: 5,
                title: "Task 5",
                deadLine: "2023-05-10",
                category: "Shopping",
                completed: false,
            },
            ],
    }
];

