import React, { createContext, useState } from 'react';
import {Category} from "../models/Category";

interface CategoryProviderProps {
    children: React.ReactNode;
}

interface CategoryContextType {
    categories: Category[];
    updateCategories: (updatedCategories: Category[]) => void;
}

export const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    updateCategories: () => {}
});

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    const updateCategories = (updatedCategories: Category[]) => {
        setCategories(updatedCategories);
    };

    return (
        <CategoryContext.Provider value={{ categories, updateCategories }}>
            {children}
        </CategoryContext.Provider>
    );
};
