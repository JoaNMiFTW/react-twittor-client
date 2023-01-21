import React, { useState, useEffect } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth'
import { BasicLayout } from '../../layout/BasicLayout/BasicLayout'
import { useParams } from 'react-router-dom'
import { getUserApi } from '../../api/user'
import { BannerAvatar } from '../../components/User/BannerAvatar/BannerAvatar'
import { InfoUser } from '../../components/User/InfoUser/InfoUser'

import "./User.scss"
import { toast } from 'react-toastify'

export const User = (props) => {
    let { id } = useParams();

    const [user, setUser] = useState(null)
    const loggedUser = useAuth()

    useEffect(() => {
        getUserApi(id).then(response => {
            setUser(response)
            if (!response) toast.error("El usuario que has visitado no existe")
        }).catch(() => {
            toast.error("El usuario que has visitado no existe")
        })
    }, [id])

    return (
        <BasicLayout className='user'>
            <div className='user__title'>
                <h2>
                    {user ? `${user.nombre} ${user.apellidos}` : "Este usuario no existe"}</h2>
            </div>
            <BannerAvatar user={user} loggedUser={loggedUser} />
            <InfoUser user={user} />
            <div className='user__tweets'>Lista de Tweets!</div>
        </BasicLayout>
    )
}
