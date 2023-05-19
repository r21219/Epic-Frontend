import React, {useContext, useState, useEffect} from "react";
import TaskRow from "../tasks/TaskRow";
import {ApiClient} from "../../controllers/ApiClient";
import {CategoryContext} from "../../Contexts/CategoryContext";
import Category from "../../models/Category";

interface CategoryRowProps {
    category: Category;
}

const CategoryRow: React.FC<CategoryRowProps> = ({category}) => {
    const {updateTasks} = useContext(CategoryContext);
    const [tasks, setTasks] = useState(category.tasks);

    const [sortOrder, setSortOrder] = useState({ title: 'asc', deadline: 'asc', complete: 'asc' });

    useEffect(() => {
        setTasks(category.tasks);
    }, [category]);

    const handleSort = (type: keyof typeof sortOrder) => {
        const sortBy = type === 'title'
            ? (sortOrder.title === 'asc' ? 4 : 5)
            : type === 'deadline'
                ? (sortOrder.deadline === 'asc' ? 6 : 7)
                : sortOrder.complete === 'asc' ? 8 : 9;

        ApiClient.getSortedTasks(category.id, sortBy).then((sortedTasks) => {
            setTasks(sortedTasks);
            updateTasks(category.id, sortedTasks);
            setSortOrder(prev => ({ ...prev, [type]: prev[type] === 'asc' ? 'desc' : 'asc' }));
        });
    };

    return (
        <>
            <div>
                <button onClick={() => handleSort('title')}>{`Title ${sortOrder.title === 'asc' ? '↑' : '↓'}`}</button>
                <button onClick={() => handleSort('deadline')}>{`Deadline ${sortOrder.deadline === 'asc' ? '↑' : '↓'}`}</button>
                <button onClick={() => handleSort('complete')}>{`Complete ${sortOrder.complete === 'asc' ? '↑' : '↓'}`}</button>
            </div>
            {tasks.map((task) => (
                <TaskRow task={task} key={task.id} categoryId={category.id}/>
            ))}
        </>
    );
};

export default CategoryRow;
