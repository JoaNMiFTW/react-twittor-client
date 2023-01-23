import React, { useState, useEffect } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth'
import { BasicLayout } from '../../layout/BasicLayout/BasicLayout'
import { useParams } from 'react-router-dom'
import { getUserApi } from '../../api/user'
import { BannerAvatar } from '../../components/User/BannerAvatar/BannerAvatar'
import { InfoUser } from '../../components/User/InfoUser/InfoUser'
import { ListTweets } from '../../components/ListTweets/ListTweets'

import "./User.scss"
import { toast } from 'react-toastify'
import { getUserTweetsApi } from '../../api/tweet'

export const User = (props) => {
    let { id } = useParams();

    const [user, setUser] = useState(null)
    const [tweets, setTweets] = useState(null)
    const loggedUser = useAuth()

    const [page, setPage] = useState(1)
    const [loadingTweet, setLoadingTweet] = useState(false)

    useEffect(() => {
        getUserTweetsApi(id, 1).then(response => {
            setTweets(response)
        }).catch(() => {
            setTweets([])
        })
    }, [id])

    useEffect(() => {
        getUserApi(id).then(response => {
            setUser(response)
            if (!response) toast.error("El usuario que has visitado no existe")
        }).catch(() => {
            toast.error("El usuario que has visitado no existe")
        })
    }, [id])

    const moreData = () => {
        const pageTemp = page + 1
        setLoadingTweet(true)

        getUserTweetsApi(id, pageTemp).then(response => {
            if(!response){
                setLoadingTweet(0)
            }else{
                setTweets([...tweets, ...response])
                setPage(pageTemp)
                setLoadingTweet(false)
            }
        })

    }

    return (
        <BasicLayout className='user'>
            <div className='user__title'>
                <h2>
                    {user ? `${user.nombre} ${user.apellidos}` : "Este usuario no existe"}</h2>
            </div>
            <BannerAvatar user={user} loggedUser={loggedUser} />
            <InfoUser user={user} />
            <div className='user__tweets'>
                <h3>Tweets</h3>
                {tweets && <ListTweets tweets={tweets} />}
                <Button onClick={moreData}>
                    {!loadingTweet ? (
                       loadingTweet !== 0 && 'Cargar más tweets'
                    ) : (
                        <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
                    )}
                </Button>
            </div>
        </BasicLayout>
    )
}
