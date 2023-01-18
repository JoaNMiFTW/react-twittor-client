import React from 'react'
import { Form, Button, Spinner } from "react-bootstrap"

import "./SignInForm.scss"

export const SignInForm = () => {
    const onSubmit = e => {
        e.preventDefault()
        console.log('login..')

    }
    return (
        <div className='sign-in-form'>
            <h2>Entrar</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Control
                        type='email'
                        placeholder='Correo electronico'
                        />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='password'
                        placeholder='Contraseña'
                        />
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Iniciar sesión
                </Button>
            </Form>
        </div>
    )
}
