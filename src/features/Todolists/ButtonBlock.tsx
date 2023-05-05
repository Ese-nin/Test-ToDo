import React from 'react';
import {Button} from "@mui/material";
import {FilterType} from "bll/store/todolists";
import {observer} from "mobx-react-lite";
import s from './todos.module.css'

type Props = {
    filter: FilterType
    changeFilter: (filter: FilterType) => void
}

export const ButtonBlock: React.FC<Props> = observer(({filter, changeFilter}) => {

    const onClickHandler = (filter: FilterType) => {
        changeFilter(filter)
    }

    return (
        <div className={s.buttonsBlock}>
            <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                    onClick={() => onClickHandler('all')}>
                All
            </Button>
            <Button variant={filter === 'undone' ? 'contained' : 'outlined'}
                    onClick={() => onClickHandler('undone')}>
                Active
            </Button>
            <Button variant={filter === 'done' ? 'contained' : 'outlined'}
                    onClick={() => onClickHandler('done')}>
                Completed
            </Button>
        </div>
    );
});