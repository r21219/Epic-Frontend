import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import CategoryRow from "../pages/categories/CategoryRow";

const Categories = () => {
    const [categories, setCategories] = useState<any>();
    useEffect(() => {
        fetch("http://localhost:8080/categories").then(response => setCategories(response.json()))
    })
    return (
        {/*<>
            <h2>Ahoj</h2>
            {categories.map(category =>
            <CategoryRow category={category} key={category.id} />
            )}

        </> */}
    );
}


export { Categories };
