
export type Task = {
    id: number;
    title: string;
    date: string;
    category: string;
    completed: boolean;
};

export type Category = {
    id: number;
    name: string;
    tasks: Task[];
};



export const sampleCategories: Category[] = [
    {
        id: 1,
        name: "Work",
        tasks: [
            {
                id: 1,
                title: "Task 1",
                date: "2023-05-01",
                category: "Work",
                completed: false,
            },
            {
                id: 2,
                title: "Task 2",
                date: "2023-05-15",
                category: "Work",
                completed: true,
            },
        ],
    },
    {
        id: 2,
        name: "Personal",
        tasks: [
            // ...tasks related to Personal category
            {
                id: 3,
                title: "Task 3",
                date: "2023-05-10",
                category: "Personal",
                completed: false,
            },
            {
                id: 4,
                title: "Task 4",
                date: "2023-05-20",
                category: "Personal",
                completed: false,
            },
        ],
    },
    // ...more categories
];

