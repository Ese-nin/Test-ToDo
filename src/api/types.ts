export type AuthResponseType = {
    accessToken: string,
    user: {
        id: number,
        email: string
    }
}

export type TodolistDomainType = {
    id: number,
    title: string
}

export type TaskDomainType = {
    id: number
    title: string
    status: StatusType
    todolistId: number
}

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    UNAUTHORIZED = 401,
    BED_REQUEST = 404
}

export type StatusType = 'done' | 'undone'