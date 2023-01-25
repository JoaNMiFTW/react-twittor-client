import React, { useState, useEffect } from 'react'
import { BasicLayout } from '../../layout/BasicLayout/BasicLayout'
import { Spinner, ButtonGroup, Button } from 'react-bootstrap'
import { getFollowsApi } from '../../api/follow'
import queryString from 'query-string'
import { ListUsers } from '../../components/ListUsers/ListUsers'

import "./Users.scss"
import { isEmpty } from 'lodash'
import { useLocation } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

export const Users = (props) => {
    const { setRefreshCheckLogin } = props
    const [users, setUsers] = useState(null)
    const location = useLocation()
    const params = useUsersQuery(location)
    const [typeUser, setTypeUser] = useState(params.type || "follow")
    const [btnLoading, setBtnLoading] = useState(false)

    const onSearch = useDebouncedCallback((value) => {
        setUsers(null)
        location.search = queryString.stringify({ type: typeUser, page: 1, search: value })
    }, 500)

    useEffect(() => {
        getFollowsApi(queryString.stringify(params)).then(response => {
            if(params.page == 1){
                if (isEmpty(response)) {
                    setUsers([])
                } else {
                    setUsers(response)
                }
            }else{
                if(!response){
                    setBtnLoading(0)
                }else{
                    setUsers([...users, ...response])
                    setBtnLoading(false)
                }
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

    const moreData = () => {
        setBtnLoading(true)
        const newPage = parseInt(params.page) + 1
        location.search = queryString.stringify({ ...params, page: newPage})
    }


    return (
        <BasicLayout title="Usuarios" className="users" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div className="users__title">
                <h2>Usuarios</h2>
                <input
                    onChange={(e) => onSearch(e.target.value)}
                    type="search"
                    name="" id=""
                    placeholder='Busca un usuario....' />
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
                <>
                    <ListUsers users={users} />
                    <Button className='load-more' onClick={moreData}>
                        {!btnLoading ? (
                            btnLoading !== 0 && "Cargar más usuarios"
                        ) : (
                            <Spinner
                                as='span'
                                animation='grow'
                                size='sm'
                                role='status'
                                aria-hidden='true'
                            />
                        )}
                    </Button>
                </>
            )}
        </BasicLayout>
    )
}

function useUsersQuery(location) {
    const { page = 1, type = "follow", search = "" } = queryString.parse(location.search)
    return { page, type, search }
}
