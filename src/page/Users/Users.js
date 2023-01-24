import React, { useState, useEffect } from 'react'
import { BasicLayout } from '../../layout/BasicLayout/BasicLayout'
import { Spinner, ButtonGroup, Button } from 'react-bootstrap'
import { getFollowsApi } from '../../api/follow'
import queryString from 'query-string'
import { ListUsers } from '../../components/ListUsers/ListUsers'

import "./Users.scss"
import { isEmpty } from 'lodash'
import { useLocation } from 'react-router-dom'

export const Users = (props) => {
    const { setRefreshCheckLogin } = props
    const [users, setUsers] = useState(null)
    const location = useLocation()
    const params = useUsersQuery(location)
    const [typeUser, setTypeUser] = useState(params.type || "follow")

    useEffect(() => {
        getFollowsApi(queryString.stringify(params)).then(response => {
            if (isEmpty(response)) {
                setUsers([])
            } else {
                setUsers(response)
            }
        }).catch(err => {
            setUsers([])
        })
    }, [location.search])

    const onChangeType = type => {
        setUsers(null)

        if (type === "new") {
            setTypeUser("new")
        } else {
            setTypeUser("follow")
        }

        location.search = queryString.stringify({ type: type, page: 1, search: "" })
    }


    return (
        <BasicLayout title="Usuarios" className="users" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="users__title">
                <h2>Usuarios</h2>
                <input type="search" name="" id="" placeholder='Busca un usuario....' />
            </div>

            <ButtonGroup className='users__options'>
                <Button 
                className={typeUser === "follow" && "active"}
                onClick={() => onChangeType("follow")}
                >
                    Siguiendo
                </Button>
                <Button 
                className={typeUser === "new" && "active"}
                onClick={() => onChangeType("new")}
                >
                    Nuevos
                </Button>
            </ButtonGroup>

            {!users ? (
                <div className="users__loading">
                    <Spinner animation='border' variant='info' />
                    Buscando usuarios
                </div>
            ) : (
                <ListUsers users={users} />
            )}
        </BasicLayout>
    )
}

function useUsersQuery(location) {
    const { page = 1, type = "follow", search = "" } = queryString.parse(location.search)
    return { page, type, search }
}
