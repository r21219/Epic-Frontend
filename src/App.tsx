import React, { useContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "react-bootstrap";
import Categories from "./pages/categories/Categories";
import UserLogin from  "./pages/users/UserLogin";
import {UserContext} from "./Contexts/UserContext";

const App = () => {
    const userContext = useContext(UserContext);

    if (!userContext || !userContext.user) {
        return <UserLogin />;
    }

    return (
        <Container fluid className="app-container">
            <Categories />
        </Container>
    );
};

export default App;
