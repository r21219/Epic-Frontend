import React, {useContext, useEffect, useState} from "react";
import { ApiClient } from "../../controllers/ApiClient";
import {Accordion, Button, Container} from "react-bootstrap";
import CategoryRow from "./CategoryRow";
import CategoryTasksBottom from "./CategoryTasksBottom";
import {CategoryContext} from "../../Contexts/CategoryContext";
import CategoriesSort from "./CategoriesSort";
import Task from "../../models/Task";
import {Category} from "../../models/Category";

/*interface CategoryRowProps {
    category: Category;
}*/
//const Categories: React.FC<CategoryRowProps> = ({ category}) => {
const Categories = () => {
    const [editing, setEditing] = useState(false);
    //const [editedCategory, setEditedCategory] = useState({ ...category});
    const { categories, updateCategories } = useContext(CategoryContext);
    const handleEdit = () => {
        setEditing(true);
    };

    useEffect(() => {
        ApiClient.getCategories().then((data) => updateCategories(data));
    }, []);

    return (
        <Container fluid className="app-container">
            <h2>Categories</h2>
            <CategoriesSort/>
            <Accordion defaultActiveKey="1" alwaysOpen>
                {categories.map((category) => (
                    <Accordion.Item eventKey={category.id.toString()} key={category.id}>
                        <Accordion.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span>{category.title}</span>
                            <Button
                                className={"btn-edit-category"}
                                variant="secondary"
                                onClick={(e) => {
                                    e.stopPropagation(); // Stop event propagation
                                    handleEdit(); // Pass the id of the category to be edited
                                }}
                            >
                                Edit
                            </Button>
                        </Accordion.Header>
                        <Accordion.Body>
                            <CategoryRow category={category} key={category.id} />
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            <CategoryTasksBottom />
        </Container>


    );
};

export default Categories;
