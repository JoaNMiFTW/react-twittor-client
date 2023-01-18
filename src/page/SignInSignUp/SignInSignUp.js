import React, { useState } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap"
import LogoWhiteTwittor from "../../assets/png/logo-white.png"
import LogoTwittor from "../../assets/png/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faUsers, faComment } from "@fortawesome/free-solid-svg-icons"
import BasicModal from '../../components/Modal/BasicModal/BasicModal'
import SignUpForm from '../../components/SignUpForm/SignUpForm'

import "./SignInSignUp.scss"
import { SignInForm } from '../../components/SignInForm/SignInForm'

export const SignInSignUp = () => {
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    const openModal = content => {
        setShowModal(true)
        setContentModal(content)
    }

    return (
        <>
            <Container className='signin-signup' fluid>
                <Row>
                    <LeftComponent />
                    <RightComponent
                        openModal={openModal}
                        setShowModal={setShowModal} />
                </Row>
            </Container>
            <BasicModal show={showModal} setShow={setShowModal}>
                {contentModal}
            </BasicModal>
        </>
    )
}

function LeftComponent() {
    return (
        <Col className='signin-signup__left' xs={6}>
            <img src={LogoTwittor} alt="twittor" />
            <div>
                <h2>
                    <FontAwesomeIcon icon={faSearch} />
                    Sigue lo que te interesa
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faUsers} />
                    Enterate de qué está hablando la gente
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faComment} />
                    Únete a la conversación
                </h2>
            </div>
        </Col>
    )
}

function RightComponent(props) {
    const { openModal, setShowModal } = props;

    return (
        <Col className='signin-signup__right' xs={6}>
            <div>
                <img src={LogoWhiteTwittor} alt="Twittor" />
                <h2>Mira lo que está pasando en el mundo en este momento</h2>
                <h3>únete a twittor hoy mismo</h3>
                <Button
                    variant='primary'
                    onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
                >
                    Regístrate
                </Button>
                <Button
                    variant='outline-primary'
                    onClick={() => openModal(<SignInForm setShowModal={setShowModal} />)}
                >
                    Iniciar sesión
                </Button>
            </div>
        </Col>
    )
}
