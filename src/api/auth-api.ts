import {instance} from "./instance";
import {AuthResponseType} from "./types";

export const authAPI = {
    login: (email: string, password: string) => {
        return instance.post<AuthResponseType>('login', {email, password})
            .then((res) => {
                return res
            })
    },
    register: (email: string, password: string) => {
        return instance.post<AuthResponseType>('register', {email, password})
            .then((res) => {
                return res
            })
    }
}