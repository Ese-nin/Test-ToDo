import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {Register} from "./features/Auth/Register";
import {Login} from "./features/Auth/Login";
import {Header} from "./common/Header/Header";
import {Path} from "./bll/Path";
import {LinearProgress} from "@mui/material";
import app from 'bll/store/app'
import todos from 'bll/store/todolists'
import {observer} from "mobx-react-lite";
import {Todolist} from "./features/Todolists/Todolist";
import {ErrorAlert} from "./common/ErrorAlert/ErrorAlert";

export const App = observer(() => {

    return (
        <div className="App">
            <Header/>
            {app.state.status === 'loading' && <LinearProgress/>}
            <Routes>
                <Route path={'/'} element={<Navigate to={Path.TODOS}/>}/>
                <Route path={Path.REG} element={<Register/>}/>
                <Route path={Path.LOGIN} element={<Login/>}/>
                <Route path={Path.TODOS} element={<Todolist todolist={todos.todolist}
                                                            fetchTodo={todos.fetchTodolist}
                                                            filter={todos.todolist.filter}
                                                            changeTodoFilter={todos.changeTodolistFilter}/>}/>
                <Route path={Path["404"]} element={<h1>404 Page not found</h1>}/>
                <Route path={'*'} element={<Navigate to={Path["404"]}/>}/>
            </Routes>
            <ErrorAlert/>
        </div>
    )
});
