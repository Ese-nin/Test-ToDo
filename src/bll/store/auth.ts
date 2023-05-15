import {makeAutoObservable, runInAction} from "mobx";
import {authAPI} from "api";
import app from 'bll/store/app'
import {StatusCode} from "api/types";
import {handleAppErrors, handleNetworkErrors} from "utils/handleErrors";

type ProfileType = {
    email: string
    isAuth: boolean
}

class Auth {

    profile = {
        email: '',
        isAuth: false
    } as ProfileType

    constructor() {
        makeAutoObservable(this)
    }

    login = async (email: string, password: string) => {
        app.setAppStatus('loading')
        try {
            const data = await authAPI.login(email, password)

            if (data.status === StatusCode.OK) {
                runInAction(()=>{
                    this.profile.email = email
                })
                this.setIsAuthorized(true)
                await localStorage.setItem('token', data.data.accessToken)
                app.setAppStatus('succeeded')
            } else {
                handleAppErrors()
            }
        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    setIsAuthorized = (isAuth: boolean) => {
        runInAction(()=>{
            this.profile.isAuth = isAuth
        })
    }

}

export default new Auth()