import React from 'react';
import {Container} from "react-bootstrap";
import './UserEducatios.css';

const UserEducations = () => {
    return (
        <Container className={"border user-educations__container"} >
            <div className={"user-educations__header"}>
                <h2>Освіти</h2>
            </div>
            <div className={"user-educations__list"}>

            </div>
        </Container>
    );
};

export default UserEducations;