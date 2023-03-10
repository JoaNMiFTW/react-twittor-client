import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import AvatarNotFound from "../../../assets/png/avatar-no-found.png"
import { API_HOST } from '../../../utils/constants'
import { checkFollowApi, followUserApi, unFollowUserApi } from '../../../api/follow'
import { ConfigModal } from '../../Modal/ConfigModal/ConfigModal'
import { EditUserForm } from '../EditUserForm/EditUserForm'

import "./BannerAvatar.scss"

export const BannerAvatar = (props) => {
    const { user, loggedUser } = props
    const [showModal, setShowModal] = useState(false)
    const [following, setFollowing] = useState(null)
    const [reloadFollow, setReloadFollow] = useState(false)

    const bannerUrl = user?.banner ? `${API_HOST}/obtenerBanner?id=${user.id}` : null
    const avatarUrl = user?.avatar ? `${API_HOST}/obtenerAvatar?id=${user.id}` : null

    useEffect(() => {
        if (user) {
            checkFollowApi(user?.id).then(response => {
                if (response?.status) {
                    setFollowing(true)
                } else {
                    setFollowing(false)
                }
            })
        }
        setReloadFollow(false)
    }, [user, reloadFollow])

    const onFollow = () => {
        followUserApi(user.id).then(() => {
            setReloadFollow(true)
        })
    }

    const onUnFollow = () => {
        unFollowUserApi(user.id).then(() => {
            setReloadFollow(true)
        })
    }


    return (
        <div className='banner-avatar' style={{ backgroundImage: `url('${bannerUrl}')` }}>
            <div className='avatar' style={{ backgroundImage: `url('${avatarUrl}')` }}></div>
            {user && (
                <div className='options'>
                    {loggedUser._id === user.id && <Button onClick={() => setShowModal(true)}>Editar perfil</Button>}


                    {loggedUser._id !== user.id &&
                        following !== null &&
                        (following ?
                            <Button onClick={onUnFollow} className='unfollow'>
                                <span>Siguiendo</span>
                            </Button>
                            :
                            <Button onClick={onFollow}>
                                Seguir
                            </Button>)}
                </div>

            )}

            <ConfigModal show={showModal} setShow={setShowModal} title="Editar perfil">
                <EditUserForm user={user} setShowModal={setShowModal} />
            </ConfigModal>
        </div>
    )
}
