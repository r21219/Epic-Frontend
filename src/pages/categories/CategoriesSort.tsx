import { useContext } from "react";
import {CategoryContext} from "../../Contexts/CategoryContext";
import {Button} from "react-bootstrap";
import {ApiClient} from "../../controllers/ApiClient";

const CategoriesSort = () => {
    const { updateCategories } = useContext(CategoryContext);

    const handleSort = async (sortBy:number) => {
        try {
            const sortedCategories = await ApiClient.getSortedCategories(sortBy);
            updateCategories(sortedCategories);
        } catch (error) {
            console.error("Error sorting categories:", error);
        }
    };

    return (
        <>
            <Button variant="secondary" onClick={() => handleSort(0)}>
                Title_ASC
            </Button>
            <Button variant="secondary" onClick={() => handleSort(1)}>
                TITLE_DESC
            </Button>
            <Button variant="secondary" onClick={() => handleSort(2)}>
                TASK_COUNT_ASC
            </Button>
            <Button variant="secondary" onClick={() => handleSort(3)}>
                TASK_COUNT_DESC
            </Button>
        </>
    );
};

export default CategoriesSort;
