// import React, {useEffect} from 'react';
// import todos from 'store/todolists'
// import tasks from 'store/tasks'
// import {Todolist} from "./Todolist";
// import {observer} from "mobx-react-lite";
// import s from './todos.module.css'
//
//
// export const TodolistList: React.FC = observer(() => {
//
//     useEffect(() => {
//         const fetchTodos = async () => {
//             await todos.fetchTodolists()
//             await tasks.fetchTasks()
//         }
//         fetchTodos()
//     }, [])
//
//     const todolists = todos.todolist.map(t => {
//         return <Todolist key={t.id}
//                          todolist={t}/>
//     })
//
//     return (
//         <div className={s.todosWrapper}>
//             {todolists}
//         </div>
//     );
// });
export {}