import React from 'react';
import {Card, Container} from "react-bootstrap";
import AuthForm from "../components/forms/AuthForm/AuthForm";
import {observer} from "mobx-react-lite";
// className= "w-100 row-cols-2 d-flex justify-content-center align-items-center"
const AuthPage = observer(() => {
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column"}}>
            <Container
                style={{flex: 1}}
                className= "w-100 row-cols-2 d-flex justify-content-center align-items-center">
                <Card className={"p-5"}>
                    <h2 className={"m-auto"}>Авторизація</h2>
                    <AuthForm />
                </Card>
            </Container>
        </div>
    );
});

export default AuthPage;