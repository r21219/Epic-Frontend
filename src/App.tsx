import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "react-bootstrap";
import {Routes, Route, useNavigate} from "react-router-dom";
import Categories from "./pages/categories/Categories";
import UserLogin from "./pages/users/UserLogin";
import UserRegister from "./pages/users/UserRegister";
import {useEffect} from "react";

const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/login");
    }, []);

    return (
            <Container fluid className="app-container">
                <Routes>
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/" element={<Categories />} />
                    <Route path="/register" element={<UserRegister />} />
                </Routes>
            </Container>
    );
};

export default App;
