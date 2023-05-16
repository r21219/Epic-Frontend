import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CategoryProvider} from "./Contexts/CategoryContext";
import {UserProvider} from "./Contexts/UserContext";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <CategoryProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </CategoryProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
