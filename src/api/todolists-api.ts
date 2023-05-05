import {instance} from "./instance";
import {TodolistDomainType} from "./types";
import {getTokenFromLS} from "utils/getTokenFromLS";


export const todolistsAPI = {
    getTodolists: () => {
        return instance.get<TodolistDomainType>('todos',
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromLS()}`
                }
            })
            .then((res) => {
                return res
            })
    },
    addTodolist: (title: string) => {
        return instance.post<TodolistDomainType>('todos', {title},
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromLS()}`
                }
            })
            .then((res) => {
                return res
            })
    },
    removeTodolist: (todoId: number) => {
        return instance.delete(`todos/${todoId}`,
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromLS()}`
                }
            })
            .then((res) => {
                return res
            })
    },
    renameTodolist: (title: string) => {
        return instance.patch(`todos`, {title},
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromLS()}`
                }
            })
    }

}