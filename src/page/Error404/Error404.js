import React from 'react'
import { BasicLayout } from '../../layout/BasicLayout/BasicLayout'
import { Link } from 'react-router-dom'
import Error404Image from "../../assets/png/error-404.png"
import Logo from "../../assets/png/logo.png"


import "./Error404.scss"

export const Error404 = () => {
    return (
        <div className="error404">
            <img src={Logo} alt="Twittor" />
            <img src={Error404Image} alt="Error404" />
            <Link to="/" >Volver al incio</Link>
        </div>
    )
}
