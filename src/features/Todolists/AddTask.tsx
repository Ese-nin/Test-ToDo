import React, {ChangeEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type PropsType = {
    todoId: number
    addTask: (todoId: number, title: string) => void
    setActive: (active: boolean) => void
}

export const AddTask: React.FC<PropsType> = ({todoId, addTask, setActive}) => {

    const [text, setText] = useState('')


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const onClickHandler = () => {
        if (text.trim() !== '') {
            addTask(todoId, text)
            setActive(false)
        }
    }

    return (
        <div>
            <h2>New task</h2>
            <TextField placeholder={'Enter title for new task'}
                       variant='standard'
                       value={text}
                       onChange={onChangeHandler}
                       autoFocus/>

            <Button variant="contained"
                    size="small"
                    onClick={onClickHandler}>
                +
            </Button>
        </div>
    );
};