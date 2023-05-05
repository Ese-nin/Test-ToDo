import React, {ChangeEvent} from 'react';
import {Button, Checkbox} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {observer} from 'mobx-react-lite';
import {StatusType} from "api/types";
import s from '../todos.module.css'
import {TaskType} from "bll/store/tasks";
import {AppStatusType} from "bll/store/app";

type PropsType = {
    task: TaskType
    removeTask: (taskId: number) => void
    changeStatus: (taskId: number, status: StatusType) => void
    entityStatus: AppStatusType
}

export const Task: React.FC<PropsType> = observer(({task, removeTask, changeStatus, entityStatus}) => {

    const onClickHandler = () => {
        removeTask(task.id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? 'done' : 'undone'
        changeStatus(task.id, status)
    }

    const isDisabled = entityStatus === 'loading'

    return (
        <li className={s.task}>
            <Checkbox disabled={isDisabled} checked={task.status === 'done'} onChange={onChangeHandler}/>
            <p className={s.taskTitle} title={task.title}>{task.title}</p>
            <Button disabled={isDisabled} onClick={onClickHandler}>
                <DeleteOutlinedIcon color={'error'}/>
            </Button>
        </li>
    );
});