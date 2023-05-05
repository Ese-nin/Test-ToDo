import app from "bll/store/app";
import {AxiosError} from "axios";

export const handleAppErrors = () => {
    app.setAppError('Some error')
    app.setAppStatus('failed')
}

export const handleNetworkErrors = (err: unknown) => {
    const error = err as AxiosError
    app.setAppError(error.message)
    app.setAppStatus('failed')
}