import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import s from './header.module.css'
import {useNavigate} from "react-router-dom";
import {Path} from 'bll/Path';
import auth from 'bll/store/auth';
import tasks from 'bll/store/tasks';
import todo from 'bll/store/todolists';
import {observer} from "mobx-react-lite";

export const Header = observer(() => {

    const isAuth = auth.profile.isAuth;
    const navigate = useNavigate()

    let onClickHandler: () => void;
    if (isAuth) {
        onClickHandler = () => {
            auth.setIsAuthorized(false)
            todo.resetTodolists()
            tasks.resetTasks()
            navigate(Path.LOGIN)
        };
    } else {
        onClickHandler = () => {
            navigate(Path.LOGIN)
        };
    }

    const buttonTitle = isAuth ? 'Log out' : 'Log in'

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}} className={s.header}>
                        Todo's
                        <Button variant={'contained'} onClick={onClickHandler}>{buttonTitle}</Button>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
});