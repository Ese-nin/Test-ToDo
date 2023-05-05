import {makeAutoObservable} from "mobx";
import {todolistsAPI} from "api";
import {StatusCode, TodolistDomainType} from "api/types";
import tasks from "./tasks";
import app from "./app";
import {handleAppErrors, handleNetworkErrors} from "utils/handleErrors";

type todoType = TodolistDomainType & { filter: FilterType }
export type FilterType = 'all' | 'undone' | 'done'

class Todolists {

    todolist = {} as todoType

    constructor() {
        makeAutoObservable(this)
    }

    fetchTodolist = async () => {
        app.setAppStatus('loading')
        try {
            const data = await todolistsAPI.getTodolists()
            if (data.status === StatusCode.OK) {
                this.todolist = {...data.data, filter: "all"}
                app.setAppStatus('succeeded')
                return 'success'
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

    // addTodolist = async (title: string) => {
    //     const data = await todolistsAPI.addTodolist(title)
    //     this.todolists.push(data.data)
    // }

    // removeTodolist = async (todoId: number) => {
    //     await todolistsAPI.removeTodolist(todoId)
    //     this.todolist = this.todolist.filter(t => t.id !== todoId)
    // }

    renameTodolist = async (title: string) => {
        app.setAppStatus('loading')
        try {
            const data = await todolistsAPI.renameTodolist(title)
            if (data.status === StatusCode.OK) {
                this.todolist.title = title
                app.setAppStatus('succeeded')
            } else {
                handleAppErrors()
            }
        } catch (err) {
            handleNetworkErrors(err)
        }
    }

    changeTodolistFilter = async (filter: FilterType) => {
        if (filter === 'all') {
            await tasks.fetchTasks()
        } else {
            await tasks.fetchTasks(filter)
        }
        this.todolist.filter = filter
    }

    resetTodolists() {
        this.todolist = {} as todoType
    }
}

export default new Todolists()