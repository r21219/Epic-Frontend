import React, { useContext, useState, useEffect } from "react";
import { Category } from "../../models/Category";
import TaskRow from "../tasks/TaskRow";
import { ApiClient } from "../../controllers/ApiClient";
import { CategoryContext } from "../../Contexts/CategoryContext";

interface CategoryRowProps {
    category: Category;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category }) => {
    const { updateTasks } = useContext(CategoryContext);
    const [tasks, setTasks] = useState(category.tasks);

    useEffect(() => {
        setTasks(category.tasks);
    }, [category]);

    const handleSort = (sortBy: number) => {
        ApiClient.getSortedTasks(category.id, sortBy).then((sortedTasks) => {
            setTasks(sortedTasks);
            updateTasks(category.id, sortedTasks);
        });
    };

    return (
        <>
            <div>
                <button onClick={() => handleSort(4)}>TitleAsc</button>
                <button onClick={() => handleSort(5)}>TitleDesc</button>
                <button onClick={() => handleSort(6)}>DeadlineAsc</button>
                <button onClick={() => handleSort(7)}>DeadlineDesc</button>
                <button onClick={() => handleSort(8)}>CompleteAsc</button>
                <button onClick={() => handleSort(9)}>CompleteDesc</button>
            </div>
            {tasks.map((task) => (
                <TaskRow task={task} key={task.id} categoryId={category.id} />
            ))}
        </>
    );
};

export default CategoryRow;
