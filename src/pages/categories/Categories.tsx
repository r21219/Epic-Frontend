import React, {useContext, useState, useEffect} from "react";
import {ApiClient} from "../../controllers/ApiClient";
import {Accordion, Button, Container, FormControl} from "react-bootstrap";
import CategoryRow from "./CategoryRow";
import CategoryTasksBottom from "./CategoryTasksBottom";
import {CategoryContext} from "../../Contexts/CategoryContext";
import CategoriesSort from "./CategoriesSort";
import {UserContext} from "../../Contexts/UserContext"
import {useNavigate} from "react-router-dom";
import {AiOutlineDelete} from "react-icons/ai";

const Categories = () => {
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedCategoryId, setEditedCategoryId] = useState<number | null>(null);
    const {logout} = useContext(UserContext);
    const {categories, updateCategories} = useContext(CategoryContext);

    const handleEdit = (categoryId: number) => {
        const categoryToEdit = categories.find(category => category.id === categoryId);
        if (categoryToEdit) {
            setEditedTitle(categoryToEdit.title);
            setEditedCategoryId(categoryId);
        }
        setEditing(true);
    };

    const handleSave = async () => {
        if (editedCategoryId !== null) {
            const categoryToUpdate = {
                id: editedCategoryId,
                title: editedTitle,
                tasks: []
            };

            try {
                const updatedCategory = await ApiClient.updateCategory(categoryToUpdate);
                const newCategories = categories.map(category =>
                    category.id === updatedCategory.id ? updatedCategory : category
                );
                updateCategories(newCategories);
                setEditing(false);
                setEditedCategoryId(null);
            } catch (error) {
                console.error("Error updating category title:", error);
            }
        }
    };

    const deleteCategory = async (categoryId: number) => {
        try {
            await ApiClient.deleteCategory(categoryId);
            const newCategories = categories.filter((category) => category.id !== categoryId);
            updateCategories(newCategories);
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const createCategory = async () => {
    };


    const logOff = () => {
        logout();
        navigate("/login");
    }
    useEffect(() => {
        ApiClient.getCategories().then((data) => updateCategories(data));
    }, []);

    return (
        <Container fluid className="app-container">
            <Button variant="info" onClick={logOff}>Log off</Button>
            <h2>Categories</h2>
            <CategoriesSort/>
            <Button  onClick={createCategory}>Create a new category</Button>
            <Accordion defaultActiveKey="1" alwaysOpen>
                {categories.map((category) => (
                    <Accordion.Item eventKey={category.id.toString()} key={category.id}>
                        <Accordion.Header
                            style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            {editing && editedCategoryId === category.id ? ( // If editing, show an input field
                                <>
                                    <FormControl
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                    />
                                    <Button variant="secondary" onClick={handleSave}>
                                        Save
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <span>{category.title}</span>
                                    <Button
                                        className={"btn-edit-category"}
                                        variant="secondary"
                                        onClick={() => {
                                            handleEdit(category.id);
                                        }}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        className={"btn-edit-category"}
                                        variant="danger"
                                        onClick={() => {
                                            deleteCategory(category.id);
                                        }}
                                    >
                                        <AiOutlineDelete/>
                                    </Button>
                                </>
                            )}
                        </Accordion.Header>
                        <Accordion.Body>
                            <CategoryRow category={category} key={category.id}/>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            <CategoryTasksBottom/>
        </Container>


    );
};

export default Categories;
