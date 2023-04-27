// /pages/categories/CategoryRow.tsx
import React from "react";
import { Category } from "../../models/Category";
import TaskRow from "../tasks/TaskRow";

interface CategoryRowProps {
    category: Category;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category }) => {
    return (
        <>
            <tr>
                <td>{category.title}</td>
                <td>
                {category.tasks.map((task) => (

                    <TaskRow task={task} key={task.id} />

                ))}
                </td>
            </tr>

        </>
    );
};

export default CategoryRow;
