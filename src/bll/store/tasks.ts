import {StatusCode, StatusType, TaskDomainType} from "api/types";
import {makeAutoObservable, runInAction} from "mobx";
import app, {AppStatusType} from 'bll/store/app'
import todo from 'bll/store/todolists'
import {tasksAPI} from "api";
import {FilterType} from "./todolists";
import {handleAppErrors, handleNetworkErrors} from "utils/handleErrors";

export type TaskType = TaskDomainType & { entityStatus: AppStatusType }

class Tasks {

    tasks: TaskType[] = []

    constructor() {
        makeAutoObservable(this)
    }

    fetchTasks = async (filter?: FilterType) => {
        app.setAppStatus('loading')
        try {
            const data = filter ? await tasksAPI.getTasks(filter) : await tasksAPI.getTasks()
            if (data.status === StatusCode.OK) {
                runInAction(() => {
                    this.tasks = data.data.map(t => ({...t, entityStatus: 'idle'}))
                })
                app.setAppStatus('succeeded')
            } else if (data.status === StatusCode.UNAUTHORIZED) {
                app.setAppStatus('failed')
                app.setAppError('You are not authorized')
            } else {
                handleAppErrors()
            }
        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    addTask = async (todoId: number, title: string) => {
        app.setAppStatus('loading')
        try {
            const data = await tasksAPI.addTask(todoId, title)
            if (data.status === StatusCode.CREATED) {
                runInAction(() => {
                    this.tasks.push({...data.data, status: 'undone', entityStatus: "idle"})
                })
                app.setAppStatus('succeeded')
            } else {
                handleAppErrors()
            }
        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    removeTask = async (taskId: number) => {
        app.setAppStatus('loading')
        this.changeTaskEntityStatus(taskId, 'loading')
        try {
            const data = await tasksAPI.removeTask(taskId)
            if (data.status === StatusCode.OK) {
                runInAction(() => {
                    this.tasks = this.tasks.filter(t => t.id !== taskId)
                })
                app.setAppStatus('succeeded')
            } else if (data.status === StatusCode.UNAUTHORIZED) {
                app.setAppStatus('failed')
                app.setAppError('You are not authorized')
            } else {
                handleAppErrors()
            }
        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    changeTaskStatus = async (taskId: number, status: StatusType) => {
        let filter
        if (todo.todolist.filter === "done" || todo.todolist.filter === "undone") {
            filter = todo.todolist.filter
        }

        app.setAppStatus('loading')
        this.changeTaskEntityStatus(taskId, 'loading')
        try {
            const data = await tasksAPI.changeStatus(taskId, status)
            if (data.status === StatusCode.OK) {
                runInAction(() => {
                    this.tasks = this.tasks.map(t => t.id === taskId ? {...t, status} : t)
                })
                filter
                    ? await this.fetchTasks(filter)
                    : await this.fetchTasks()
                app.setAppStatus('succeeded')
            } else {
                handleAppErrors()
            }
        } catch (err) {
            handleNetworkErrors(err)
        } finally {
            this.changeTaskEntityStatus(taskId, 'idle')
        }

    }

    renameTask = async (taskId: number, title: string) => {
        app.setAppStatus('loading')
        this.changeTaskEntityStatus(taskId, 'loading')
        try {
            const data = await tasksAPI.renameTask(taskId, title)
            if (data.status === StatusCode.OK) {
                runInAction(() => {
                    this.tasks = this.tasks.map(t => t.id === taskId ? {...t, title} : t)
                })
                app.setAppStatus('succeeded')
            } else {
                handleAppErrors()
            }
        } catch (err) {
            handleNetworkErrors(err)
        } finally {
            this.changeTaskEntityStatus(taskId, 'idle')
        }
    }

    changeTaskEntityStatus = (taskId: number, status: AppStatusType) => {
        runInAction(() => {
            this.tasks = this.tasks.map(t => t.id === taskId ? {...t, entityStatus: status} : t)
        })
    }

    resetTasks() {
        runInAction(() => {
            this.tasks = []
        })
    }
}

export default new Tasks()