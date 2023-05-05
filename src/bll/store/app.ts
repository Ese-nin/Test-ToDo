import {makeAutoObservable} from "mobx";

export type AppStatusType = 'loading' | 'idle' | 'failed' | 'succeeded'
type ErrorType = string | null

type StateType = {
    status: AppStatusType
    error: ErrorType
}

class App {

    state: StateType = {
        status: 'idle',
        error: null
    }


    constructor() {
        makeAutoObservable(this)
    }

    setAppStatus = (status: AppStatusType) => {
        this.state.status = status
    }

    setAppError = (error: ErrorType) => {
        this.state.error = error
    }
}

export default new App()