import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CategoryProvider} from "./Contexts/CategoryContext";
import {UserProvider} from "./Contexts/UserContext";

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <CategoryProvider>
                <App/>
            </CategoryProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
