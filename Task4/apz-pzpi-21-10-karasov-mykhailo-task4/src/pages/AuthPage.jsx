import React from 'react';
import {Card, Container} from "react-bootstrap";
import AuthForm from "../components/forms/AuthForm/AuthForm";
import {observer} from "mobx-react-lite";

const AuthPage = observer(() => {
    return (
        <Container className= "row-cols-md-2 d-flex justify-content-center align-items-center" style={{minHeight: '100%', padding: '10% 0 0 0'}} >
            <Card className={"p-5"}>
                <h2 className={"m-auto"}>Авторизація</h2>
                <AuthForm />
            </Card>
        </Container>
    );
});

export default AuthPage;