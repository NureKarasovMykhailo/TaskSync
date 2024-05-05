import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {subscribeRequest} from "../../../API/userApi";
import {useNavigate} from "react-router-dom";
import Loader from "../../UI/Loader/Loader";

const UserSubscription = ({ user }) => {
    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        isLoading ?
            <Container className={"w-100 h-100 border "}>
                <Loader />
            </Container>
            :
            <Container className={"w-100 h-100 border "}>
                <div className="w-100 d-flex justify-content-center">
                    <h2>Підписка</h2>
                </div>
                {user.subscription ?
                    <div>

                    </div>
                    :
                    <div className={"d-flex flex-column align-items-center p-4"}>
                        <div className={"w-100 d-flex justify-content-center align-items-center"}>
                            <h3 className={"m-3"}>Підписка відсутня</h3>
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