import React, {createContext, useState} from 'react';
import Task from "../models/Task";
import Category from "../models/Category";

interface CategoryProviderProps {
    children: React.ReactNode;
}

interface CategoryContextProps {
    categories: Category[];
    updateCategories: (updatedCategories: Category[]) => void;
    updateTasks: (categoryId: number, updatedTasks: Task[]) => void;
}

export const CategoryContext = createContext<CategoryContextProps>({
    categories: [],
    updateCategories: () => {
    },
    updateTasks: () => {
    },
});

export const CategoryProvider: React.FC<CategoryProviderProps> = ({children}) => {
    const [categories, setCategories] = useState<Category[]>([]);

    const updateCategories = (updatedCategories: Category[]) => {
        setCategories(updatedCategories);
    };

    const updateTasks = (categoryId: number, updatedTasks: Task[]) => {
        setCategories((prevCategories) => {
            return prevCategories.map((category) =>
                category.id === categoryId ? {...category, tasks: updatedTasks} : category
            );
        });
    };

    return (
        <CategoryContext.Provider value={{categories, updateCategories, updateTasks}}>
            {children}
        </CategoryContext.Provider>
    );
};