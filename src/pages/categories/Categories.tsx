import React, { useContext, useState, useEffect } from "react";
import { ApiClient } from "../../controllers/ApiClient";
import { Accordion, Button, Container, FormControl, Modal } from "react-bootstrap";
import CategoryRow from "./CategoryRow";
import CategoryTasksBottom from "./CategoryTasksBottom";
import { CategoryContext } from "../../Contexts/CategoryContext";
import CategoriesSort from "./CategoriesSort";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const Categories = () => {
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedCategoryId, setEditedCategoryId] = useState<number | null>(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

    const { logout, user } = useContext(UserContext);
    const { categories, updateCategories } = useContext(CategoryContext);
    const [newCategoryTitle, setNewCategoryTitle] = useState("");

    const handleEdit = (event: React.MouseEvent, categoryId: number) => {
        event.stopPropagation();
        const categoryToEdit = categories.find((category) => category.id === categoryId);
        if (categoryToEdit) {
            setEditedTitle(categoryToEdit.title);
            setEditedCategoryId(categoryId);
        }
        setEditing(true);
    };

    const handleSave = async (event: React.MouseEvent) => {
        event.stopPropagation();
        if (editedCategoryId !== null) {
            const categoryToUpdate = {
                id: editedCategoryId,
                title: editedTitle,
                tasks: [],
            };

            try {
                const updatedCategory = await ApiClient.updateCategory(categoryToUpdate);
                const newCategories = categories.map((category) =>
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
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleShowDeleteModal = (event: React.MouseEvent, categoryId: number) => {
        event.stopPropagation();
        setCategoryToDelete(categoryId);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setCategoryToDelete(null);
        setShowDeleteModal(false);
    };

    const createCategory = async () => {
        if (newCategoryTitle.trim() !== "") {
            try {
                const newCategory = {
                    id: 0,
                    title: newCategoryTitle,
                    tasks: []
                };

                const createdCategory = await ApiClient.createNewCategory(newCategory, user);

                updateCategories([...categories, createdCategory]);
                setNewCategoryTitle("");
            } catch (error) {
                console.error("Error creating category:", error);
            }
        }
    };


    const logOff = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        ApiClient.geByUser(user?.name).then((data) => updateCategories(data));
    }, []);

    return (
        <Container fluid className="app-container">
            <Button variant="info" onClick={logOff}>
                Log out
            </Button>
            <h2>Categories</h2>
            <CategoriesSort />
            <div style={{ display: "flex", marginBottom: "10px" }}>
                <FormControl
                    type="text"
                    placeholder="New category title"
                    value={newCategoryTitle}
                    onChange={(e) => setNewCategoryTitle(e.target.value)}
                />
                <Button onClick={createCategory} disabled={!user}>
                    Create
                </Button>
            </div>
            <Accordion defaultActiveKey={categories[0]?.id.toString()} alwaysOpen>
                {categories.map((category) => (
                    <Accordion.Item eventKey={category.id.toString()} key={category.id}>
                        <Accordion.Header
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {editing && editedCategoryId === category.id ? (
                                <>
                                    <FormControl
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        onKeyDown={(event: React.KeyboardEvent) => {
                                            event.stopPropagation();
                                            if ((event as any).key === "Enter") handleSave(event as any);
                                        }}
                                        onClick={(event: React.MouseEvent) => event.stopPropagation()}
                                    />
                                    <Button variant="secondary" onClick={(event) => handleSave(event)}>
                                        Save
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <span>{category.title}</span>
                                    <Button
                                        className={"btn-edit-category"}
                                        variant="secondary"
                                        onClick={(event) => handleEdit(event, category.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className={"btn-edit-category"}
                                        variant="danger"
                                        onClick={(event) => handleShowDeleteModal(event, category.id)}
                                    >
                                        <AiOutlineDelete />
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
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete this category with all its tasks?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        No
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            if (categoryToDelete !== null) deleteCategory(categoryToDelete);
                        }}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Categories;
