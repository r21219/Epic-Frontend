import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CategoryProvider} from "./Contexts/CategoryContext";

ReactDOM.render(
    <React.StrictMode>
        <CategoryProvider>
            <App />
        </CategoryProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
