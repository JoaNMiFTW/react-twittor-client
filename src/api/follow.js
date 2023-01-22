import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function checkFollowApi(idUser) {
    const url = `${API_HOST}/consultaRelacion?id=${idUser}`

    const params = {
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}

export function followUserApi(idUser) {
    const url = `${API_HOST}/altaRelacion`

    const data = {'id':`${idUser}`}

    const params = {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}

export function unFollowUserApi(idUser) {
    const url = `${API_HOST}/bajaRelacion`

    const data = {'id':`${idUser}`}

    const params = {
        method: "DELETE",
        headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}