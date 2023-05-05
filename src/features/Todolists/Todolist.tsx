import React, {useEffect, useState} from 'react';
import {Tasks} from "./tasks/Tasks";
import {AddTask} from "./AddTask";
import {observer} from "mobx-react-lite";
import tasks from 'bll/store/tasks'
import auth from 'bll/store/auth'
import {MuiModal} from "common/modal/MuiModal";
import {ButtonBlock} from "./ButtonBlock";
import {TodolistDomainType} from "api/types";
import {FilterType} from "bll/store/todolists";
import {Button} from "@mui/material";
import {Navigate, useNavigate} from "react-router-dom";
import {Path} from "bll/Path";

type Props = {
    todolist: TodolistDomainType
    fetchTodo: () => Promise<'success' | undefined>
    filter: FilterType
    changeTodoFilter: (filter: FilterType) => void
}

export const Todolist: React.FC<Props> = observer(({todolist, fetchTodo, filter, changeTodoFilter}) => {

        const [activeModal, setActiveModal] = useState(false)

        const navigate = useNavigate()

        useEffect(() => {
            const tryFetching = async () => {
                try {
                    const data = await fetchTodo()
                    if (data === 'success') {
                        auth.setIsAuthorized(true)
                    } else {
                        auth.setIsAuthorized(false)
                        navigate(Path.LOGIN)
                    }
                } catch {
                    auth.setIsAuthorized(false)
                    navigate(Path.LOGIN)
                }
            }
            tryFetching()



            if (!auth.profile.isAuth) {
                return
            }

            fetchTodo()
            tasks.fetchTasks()

        }, [])


        if (!auth.profile.isAuth) {
            return <Navigate to={Path.LOGIN}/>
        }

        return (
            <div>
                <h1>{todolist.title}</h1>
                <Button variant='text' onClick={() => setActiveModal(true)}>Add task</Button>
                <ButtonBlock filter={filter} changeFilter={changeTodoFilter}/>
                <MuiModal active={activeModal} setActive={setActiveModal}>
                    <AddTask todoId={todolist.id}
                             addTask={tasks.addTask}
                             setActive={setActiveModal}/>
                </MuiModal>
                <Tasks tasks={tasks.tasks}
                       changeTaskStatus={tasks.changeTaskStatus}
                       removeTask={tasks.removeTask}
                       setActiveModal={setActiveModal}/>
            </div>
        );
    })
;