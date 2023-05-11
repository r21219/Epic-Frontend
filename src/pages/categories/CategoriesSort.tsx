import {useContext, useState} from "react";
import {CategoryContext} from "../../Contexts/CategoryContext";
import {Button, FormControl} from "react-bootstrap";
import {ApiClient} from "../../controllers/ApiClient";

const CategoriesSort = () => {
    const {updateCategories} = useContext(CategoryContext);
    const [searchTerm, setSearchTerm] = useState("");
    const handleSort = async (sortBy: number) => {
        try {
            const sortedCategories = await ApiClient.getSortedCategories(sortBy);
            updateCategories(sortedCategories);
        } catch (error) {
            console.error("Error sorting categories:", error);
        }
    };
    const handleSearch = async () => {
        if (searchTerm.trim() === "") {
            const searchedCategories = await ApiClient.getCategories()
            updateCategories(searchedCategories);
        }
        else {
            try {
                const searchedCategories = await ApiClient.getSearchedCategories(searchTerm);
                updateCategories(searchedCategories);
            } catch (error) {
                console.error("Error searching categories:", error);
            }
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
            <FormControl
                type="text"
                placeholder="Search categories"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch}>
                Search
            </Button>
        </>
    );
};

export default CategoriesSort;
