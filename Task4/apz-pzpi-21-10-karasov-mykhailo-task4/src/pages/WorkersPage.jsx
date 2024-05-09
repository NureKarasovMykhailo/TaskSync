import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {fetchCompanyUsers} from "../API/companyApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {filterUsers} from "../utils/filterUsers";
import Loader from "../components/UI/Loader/Loader";
import '../styles/WorkerPage.css';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {ADD_WORKER_ITEM_PAGE, ADD_WORKER_PAGE} from "../utils/consts";
import {calculateAge} from "../utils/calculateAge";


const WorkersPage = observer(() => {
    const { userStore } = useContext(Context);
    const { t } = useTranslation();
    const navigation = useNavigate();

    const [workers, setWorkers] = useState([{}]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchCompanyUsers().then( response => {
           setWorkers(filterUsers(userStore.user.id, response.users))
            setIsLoading(false);
        });
    }, []);

    return (
        !isLoading ?
            <div className={"worker-page__container w-100 border p-3 m-2"}>
                { workers.length === 0 ?
                <div className={"worker-page__empty-container"}>
                    <h3>{t('yourCompanyHasNoUser')}</h3>
                    <p className={"worker-page__empty-container-label"}>{t('addWorkerNow')}</p>
                    <div className={"w-50 p-3"}>
                       <Button
                           className={"w-100"}
                           onClick={() => navigation(ADD_WORKER_PAGE)}
                       >
                           {t('addButton')}
                       </Button>
                    </div>
                </div>
                :
                    <Row className={"d-flex"}>
                        {workers.map(user => (
                            <Col key={user.id} md={3} className={"mt-3"} >
                                <Card>
                                    <div className={"d-flex justify-content-center"}>
                                        <Image width={150} height={150} src={process.env.REACT_APP_API_URL + user.userImage} />
                                    </div>
                                    <div className={"text-black-50 mt-1 justify-content-between align-items-center p-1"}>
                                        <hr/>
                                        <div>Email: {user.email}</div>
                                        <div>Ім'я: {user.firstName}</div>
                                        <div>Прізвище: {user.secondName}</div>
                                        <div>Вік: {calculateAge(user.birthday)}</div>
                                        <div className={"w-100 p-2"}>
                                            <Button
                                                variant={"outline-primary"}
                                                className={"w-100"}
                                                onClick={() => navigation(ADD_WORKER_ITEM_PAGE.replace(':id', user.id))}
                                            >
                                                Переглянути
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                }


            </div>
            :
            <Container className={"worker-page__container"}>
                < Loader />
            </Container>
    );
});

export default WorkersPage;