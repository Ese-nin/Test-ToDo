import React from 'react';
import {useFormik} from "formik";
import * as Yup from "yup"
import s from "./auth.module.css"
import {Link, useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {Path} from "bll/Path";
import {authAPI} from "api/auth-api";

export const Register = () => {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password_2: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            password_2: Yup.string().min(6).required()
        }),
        onSubmit: async ({email, password, password_2}) => {
            if (password === password_2) {
                try {
                    await authAPI.register(email, password)
                    navigate(Path.LOGIN)
                } catch (error) {
                    throw new Error('Registration error')
                }
            } else {

            }
        },
    })

    return (
        <div>
            <div className={s.wrapper}>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <h2>Sign up</h2>
                    <TextField variant="standard"
                               placeholder={'email'}
                               id={'email'}
                               {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email
                        && <div className={s.errorMessage}>{formik.errors.email}</div>}

                    <TextField variant="standard"
                               placeholder={'password'}
                               type={'password'}
                               id={'password'}
                               {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password
                        && <div className={s.errorMessage}>{formik.errors.password}</div>}
                    <TextField variant="standard"
                               placeholder={'confirm password'}
                               type={'password'}
                               id={'password_2'}
                               {...formik.getFieldProps('password_2')}
                    />

                    <Button variant="contained"
                            size="small"
                            type={'submit'}>
                        Sign up
                    </Button>
                    <span>Have an account?</span>
                    <Link to={Path.LOGIN}>Sign in</Link>
                </form>
            </div>
        </div>
    );
};