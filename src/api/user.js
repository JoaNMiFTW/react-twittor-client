import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function getUserApi(id) {
    const url = `${API_HOST}/verperfil?id=${id}`

    //si no hay methor asume que es un GET
    const params = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }

    return fetch(url, params).then(response => {
        // eslint-disable-next-line
        if (response.status >= 400) throw null
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}

export function uploadBannerApi(file) {
    const url = `${API_HOST}/subirBanner`
    const formData = new FormData()

    formData.append("banner", file)

    console.log("adios")
    console.log(file)

    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        },
        body: formData
    }

    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err
    })
}