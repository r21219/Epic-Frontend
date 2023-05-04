// /pages/categories/Categories.tsx
import { useEffect, useState } from "react";
import { ApiClient } from "../../controllers/ApiClient";
import { Category } from "../../models/Category";
import { Button, Form, Modal, Stack, Table } from "react-bootstrap";
import CategoryRow from "./CategoryRow";

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        ApiClient.getCategories().then((data) => setCategories(data));
    }, []);
    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <h2>Categories</h2>
            </Stack>

            <p>Tady bude tabulka všech kategorií.</p>
            <Table bordered>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Task</th>
                    <th>Deadline</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <CategoryRow category={category} key={category.id} />
                ))}

                </tbody>
            </Table>
        </>
    );
};

export default Categories;
