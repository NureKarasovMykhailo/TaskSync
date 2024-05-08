import React from 'react';
import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {PROFILE_PAGE_PATH} from "../utils/consts";

const SubscribeSuccess = () => {
    const navigation = useNavigate();

    return (
        <Container className={"h-100 w-100 d-flex justify-content-center align-items-center p-4 flex-column"} style={{minHeight: '50vh'}}>
            <div className={"mb-3"}>
                <h2>Ви успішно оформили підписку!</h2>
            </div>
            <div >
                <p style={{fontSize: "20px"}}>Перейдіть до власного профіля, щоб переглянути інформацію про підписку та додати власне підприємство</p>
            </div>
            <div className={"p-3"}>
                <Button onClick={() => navigation(PROFILE_PAGE_PATH)}>Перейти до профіля</Button>
            </div>
        </Container>
    );
};

export default SubscribeSuccess;