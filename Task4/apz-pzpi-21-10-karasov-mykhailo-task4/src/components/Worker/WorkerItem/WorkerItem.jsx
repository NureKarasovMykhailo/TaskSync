import React from 'react';
import {Container, Image, ListGroup} from "react-bootstrap";
import {calculateAge} from "../../../utils/calculateAge";

const WorkerItem = ({ worker, educations }) => {


    return (
        <Container className={"w-100 mt-3 mb-3 p-4"}>
            <div className={"w-100 d-flex align-items-center justify-content-between"}>
                <div className={"w-100"}>
                    <Image width={250}  src={process.env.REACT_APP_API_URL + worker.userImage}/>
                </div>
                <div className={"w-100 text-lg"} style={{fontSize: "22px"}}>
                    <p className={"bg-body"}>Дані користувача</p>
                    <p>Email-адреса: {worker.email}</p>
                    <p>Прізвище: {worker.secondName}</p>
                    <p>Ім'я: {worker.firstName}</p>
                    <p>Дата народження: {worker.birthday}</p>
                    <p>Вік: {calculateAge(worker.birthday)}</p>
                </div>
                <div className={"w-100"} style={{fontSize: "22px"}}>
                    <p>Освіти:</p>
                    { educations.length > 0
                        ?
                        <div>
                            <ListGroup as={"ul"}>
                                {educations.map(education => (
                                    <ListGroup.Item
                                        key={education.educationTitle}
                                        as={"li"}
                                        className={"mb-3"}
                                    >
                                        {education.educationTitle}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                        :
                        <div>
                            <p>Даний користувач, ще не додав освіти</p>
                        </div>
                    }
                </div>
            </div>
        </Container>
    );
};

export default WorkerItem;