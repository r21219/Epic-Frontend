import {useContext, useState} from "react";
import {CategoryContext} from "../../Contexts/CategoryContext";
import {Button, Col, Dropdown, FormControl, Row} from "react-bootstrap";
import {ApiClient} from "../../controllers/ApiClient";

const CategoriesSort = () => {
    const {updateCategories} = useContext(CategoryContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState('Select a sorting option');

    const handleSort = async (sortBy: number) => {
        try {
            const sortedCategories = await ApiClient.getSortedCategories(sortBy);
            updateCategories(sortedCategories);
        } catch (error) {
            console.error("Error sorting categories:", error);
        }
    };


    //handleSearch without async/await
    const handleSearch = (searchValue: string) => {
        if (searchValue.trim() === '') {
            return ApiClient.getCategories().then(categories => updateCategories(categories));
        } else {
            return ApiClient.getSearchedCategories(searchValue).then(categories => updateCategories(categories));
        }
    }

    const handleSearchButtonClick = () => {
        handleSearch(searchTerm);
    };


    const handleReset = async () => {
        setSearchTerm("");
        const categories = await ApiClient.getCategories()
        updateCategories(categories);
    };

    /*const handleKeyDown = async (event) => {
        if(event.key === 'Enter') {
            handleSearch();
        }
    }*/

    return (
        <>
            <div className={"search-bar position-fixed top-0 start-50 translate-middle-x w-50"}>
                <Row>
                    <Col xs={8}>
                        <FormControl
                            type="text"
                            placeholder="Search categories"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                handleSearch(e.target.value);
                            }}
                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                if (event.key === 'Enter') {
                                    handleSearch(searchTerm);
                                }
                            }}
                        />
                    </Col>
                    <Col xs={2}>
                        <Button variant="primary" onClick={handleSearchButtonClick}>
                            Search
                        </Button>
                    </Col>
                    <Col xs={2}>
                        {searchTerm && <Button variant="primary" onClick={handleReset}>
                            Reset
                        </Button>}
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <p>Sort categories by:</p>
                    </Col>
                    <Col xs={6}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {/*show selected dropdown item*/}
                                {selectedItem}

                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {
                                    handleSort(0);
                                    setSelectedItem('Title Asc (A–Z)')
                                }}>Title Asc (A–Z)</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    handleSort(1);
                                    setSelectedItem('Title Desc (Z–A)')
                                }}>Title Desc (Z–A)</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    handleSort(2);
                                    setSelectedItem('Task Count Asc (0–10)')
                                }}>Task Count Asc (0–10)</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    handleSort(3);
                                    setSelectedItem('Task Count Desc (10–0)')
                                }}>Task Count Desc (10–0)</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

            </div>
        </>
    );
};

export default CategoriesSort;
