import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { LeftMenu } from '../../components/LeftMenu/LeftMenu'

import "./BasicLayout.scss"

export const BasicLayout = (props) => {
    const { className, children, setRefreshCheckLogin } = props
    return (
        <Container className={`basic-layout ${className}`}>
            <Row>
                <Col xs={3} className="basic-layout__menu">
                    <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin}></LeftMenu>
                </Col>
                <Col xs={9} className="basic-layout__content">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}
