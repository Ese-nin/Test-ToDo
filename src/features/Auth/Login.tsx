import React from 'react';
import * as Yup from 'yup'
import {useFormik} from "formik";
import auth from 'bll/store/auth'
import s from "./auth.module.css"
import {Link, Navigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {Path} from "bll/Path";
import {observer} from "mobx-react-lite";

export const Login = observer(() => {



    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required()
        }),
        onSubmit: async ({email, password}) => {
            try {
                await auth.login(email, password)
            } catch (err) {
                console.error(err)
            }
        },
    })

    if (auth.profile.isAuth) {
        return <Navigate to={Path.TODOS}/>
    }

    return (
        <div className={s.wrapper}>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <h2>Sign in</h2>
                <TextField variant='standard'
                           placeholder={'email'}
                           id={'email'}
                           {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email
                    && <div className={s.errorMessage}>{formik.errors.email}</div>}

                <TextField variant='standard'
                           placeholder={'password'}
                           id={'password'}
                           type={'password'}
                           {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password
                    && <div className={s.errorMessage}>{formik.errors.password}</div>}

                <Button variant="contained"
                        size="small"
                        type={'submit'}>
                    Sign in
                </Button>
                <span>Don't have account?</span>
                <Link to={Path.REG}>Sign up</Link>
            </form>
        </div>
    );
});