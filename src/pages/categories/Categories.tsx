import React, { useContext, useEffect} from "react";
import { ApiClient } from "../../controllers/ApiClient";
import { Accordion, Container } from "react-bootstrap";
import CategoryRow from "./CategoryRow";
import CategoryTasksBottom from "./CategoryTasksBottom";
import {CategoryContext} from "../../Contexts/CategoryContext";
import CategoriesSort from "./CategoriesSort";

const Categories = () => {
    const { categories, updateCategories } = useContext(CategoryContext);

    useEffect(() => {
        ApiClient.getCategories().then((data) => updateCategories(data));
    }, []);

    return (
        <Container fluid className="app-container">
            <h2>Categories</h2>
            <CategoriesSort/>
            <Accordion>
                {categories.map((category) => (
                    <Accordion.Item eventKey={category.id.toString()} key={category.id}>
                        <Accordion.Header>{category.title}</Accordion.Header>
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
