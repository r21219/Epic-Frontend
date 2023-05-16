// Import the necessary modules
// Import the necessary modules
import React, {useContext, useState, useEffect} from "react";
import { ApiClient } from "../../controllers/ApiClient";
import {Accordion, Button, Container, FormControl} from "react-bootstrap";
import CategoryRow from "./CategoryRow";
import CategoryTasksBottom from "./CategoryTasksBottom";
import {CategoryContext} from "../../Contexts/CategoryContext";
import CategoriesSort from "./CategoriesSort";
import {Category} from "../../models/Category";

const Categories = () => {
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedCategoryId, setEditedCategoryId] = useState<number | null>(null);

    const { categories, updateCategories } = useContext(CategoryContext);

    const handleEdit = (categoryId: number) => {
        const categoryToEdit = categories.find(category => category.id === categoryId);
        if (categoryToEdit) {
            setEditedTitle(categoryToEdit.title);
            setEditedCategoryId(categoryId); // Store the id of the category being edited
        }
        setEditing(true);
    };

    const handleSave = async () => {
        if (editedCategoryId !== null) {
            const categoryToUpdate = {
                id: editedCategoryId,
                title: editedTitle,
                tasks: []  // Depending on your model, you may want to fetch the tasks of the category being updated here
            };

            try {
                const updatedCategory = await ApiClient.updateCategory(categoryToUpdate); // Call the API to save changes
                const newCategories = categories.map(category =>
                    category.id === updatedCategory.id ? updatedCategory : category
                );
                updateCategories(newCategories);
                setEditing(false);
                setEditedCategoryId(null); // Reset the id of the category being edited
            } catch (error) {
                console.error("Error updating category title:", error);
            }
        }
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
                            {editing && editedCategoryId === category.id ? ( // If editing, show an input field
                                <>
                                    <FormControl
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                    />
                                    <Button variant="secondary"
                                            //onClick={handleSave}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSave();
                                        }
                                        }
                                    >
                                        Save
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <span>{category.title}</span>
                                    <Button
                                        className={"btn-edit-category"}
                                        variant="secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEdit(category.id);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </>
                            )}
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
