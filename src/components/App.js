// Import Libararies
import React from 'react';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';

import Header from "./Header";
import TodoList from './todo/TodoList';
import TodoCreate from './todo/TodoCreate';
import TodoEdit from './todo/TodoEdit';
import TodoDelete from './todo/TodoDelete';

// function component
const App = () => {
    // return jsx
    return (
        <Router>
            <div className="ui container" style={{marginTop: '20px'}}>
                <Header />
                <Routes>
                    <Route path="/" exact element={<TodoList />} ></Route>
                    <Route path="/todo/new" element={<TodoCreate />} ></Route>
                    <Route path="/todo/edit/:id" element={<TodoEdit />} ></Route>
                    <Route path="/todo/delete/:id" exact element={<TodoDelete />}></Route>
                </Routes>
            </div>
        </Router>   
    );  
};

export default App;