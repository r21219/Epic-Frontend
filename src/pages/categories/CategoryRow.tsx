// /pages/categories/CategoryRow.tsx
import React, {useState} from "react";
import {Category} from "../../models/Category";
import TaskRow from "../tasks/TaskRow";

interface CategoryRowProps {
    category: Category;
}


const CategoryRow: React.FC<CategoryRowProps> = ({category}) => {

    return (
        <>
            {category.tasks.map((task) => (
                <TaskRow task={task} key={task.id}/>
            ))}

        </>
    );
};

export default CategoryRow;
