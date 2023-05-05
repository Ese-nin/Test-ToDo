import {instance} from "./instance";
import {StatusType, TaskDomainType} from "./types";
import {FilterType} from "bll/store/todolists";
import {getTokenFromLS} from "utils/getTokenFromLS";

export const tasksAPI = {
    getTasks: (filter?: FilterType) => {
        const url = filter ? `tasks?status=${filter}` : `tasks`
        return instance.get<TaskDomainType[]>(url,
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromLS()}`
                }
            })
            .then((res) => {
                return res
            })
    },

    addTask: (todoId: number, title: string) => {
        return instance.post<TaskDomainType>('tasks', {todolistId: todoId, title, status: 'undone'},
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromLS()}`
                }
            })
            .then((res) => {
                return res
            })
    },
    removeTask: (taskId: number) => {
        return instance.delete(`tasks/${taskId}`,
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromLS()}`
                }
            })
            .then((res) => {
                return res
            })
    },
    changeStatus: (taskId: number, status: StatusType) => {
        return instance.patch(`tasks/${taskId}`, {status},
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromLS()}`
                }
            })
            .then((res) => {
                return res
            })
    },
    renameTask: (taskId: number, title: string) => {
        return instance.patch(`tasks/${taskId}`, {title},
            {
                headers: {
                    Authorization: `Bearer ${getTokenFromLS()}`
                }
            })
            .then((res) => {
                return res
            })
    }
}