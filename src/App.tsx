// App.tsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import "react-datepicker/dist/react-datepicker.css";

import {
    Container,
} from "react-bootstrap";
import "./App.css";
import Categories from "./pages/categories/Categories";

const App = () => {
    return (
        <Container fluid className="app-container">
        <Categories/>
        </Container>

    );
};


export default App;