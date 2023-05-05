import React from 'react';
import {Task} from "./Task";
import {observer} from "mobx-react-lite";
import {StatusType} from "api/types";
import s from '../todos.module.css'
import {TaskType} from "bll/store/tasks";

type PropsType = {
    setActiveModal: (isActive: boolean) => void
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeTaskStatus: (taskId: number, status: StatusType) => void
}

export const Tasks: React.FC<PropsType> = observer(({setActiveModal, tasks, removeTask, changeTaskStatus}) => {

    const resultTasks = tasks.length ? tasks.map(t => {
        return <Task key={t.id}
                     task={t}
                     removeTask={removeTask}
                     changeStatus={changeTaskStatus}
                     entityStatus={t.entityStatus}/>
    }) : <span>List is empty</span>

    return (
        <ul className={s.taskList}>
            {resultTasks}
        </ul>
    );
});