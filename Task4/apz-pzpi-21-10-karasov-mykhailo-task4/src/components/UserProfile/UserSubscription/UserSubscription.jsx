import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {subscribeRequest} from "../../../API/userApi";
import {useNavigate} from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import {fetchSubscribe} from "../../../API/subscribeApi";

const UserSubscription = ({ user }) => {
    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [subscribe, setSubscribe] = useState({});
    console.log(user)
    const handleSubscribeBtnClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await subscribeRequest();
            if (response.links) {
                window.location.href = response.links[0].href;
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        fetchSubscribe(user.id).then(response => {
            setSubscribe(response);
            console.log(subscribe)
        });
    }, []);


    return (
        isLoading ?
            <Container className={"w-100 h-100 border " } style={{minHeight: "250px"}}>
                <Loader />
            </Container>
            :
            <Container className={"w-100 h-100 border "}>
                <div className="w-100 d-flex justify-content-center p-3">
                    <h2>Підписка</h2>
                </div>
                {subscribe ?
                    <div>
                        <div>
                            <p>Статус підписки: { subscribe.isValid ? <b>Активна</b> : <b>НЕ активна</b> }</p>
                        </div>
                    </div>
                    :
                    <div className={"d-flex flex-column align-items-center p-4"}>
                        <div className={"w-100 d-flex justify-content-center align-items-center"}>
                            <p className={"m-3 fs-5"}>Підписка відсутня</p>
                        </div>
                        <div>
                            <Button
                                className={"m-3"}
                                variant={"primary"}
                                onClick={handleSubscribeBtnClick}
                            >
                                Оформити підписку
                            </Button>
                        </div>
                    </div>
                }
            </Container>
    );
}

export default UserSubscription;