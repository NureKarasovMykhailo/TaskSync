import React, {useContext} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {formatTime} from "../../utils/formatTime";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {hasUserRole} from "../../utils/hasUserRole";
import {getRoleTitles} from "../../utils/getRoleTitles";
import {RoleEnum} from "../../utils/enums/RoleEnum";
import {deleteActivity} from "../../API/activityApi";
import {useNavigate} from "react-router-dom";
import {ACTIVITY_PAGE} from "../../utils/consts";

const ActivityListItem = observer(({ activity, onDelete }) => {
    const { userStore } = useContext(Context);
    const navigation = useNavigate();

    const handleDeleteActivity = async (activityId) => {
        try {
            await deleteActivity(activityId);
            onDelete(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Col md={4} className={"p-3"}>
            <Card className={"d-flex p-3"}>
                <div className={"d-flex w-100 justify-content-center h-100"} >
                    <strong>{ activity.activityTitle }</strong>
                </div>
                <hr />
                <div className={"mt-2 w-100"}>
                    <p><strong>Опис:</strong> {activity.description}</p>
                </div>
                <div>
                    <p><strong>Необхідна освіта:</strong> {activity.education.educationTitle}</p>
                    <p><strong>Час робочої зміни:</strong> {formatTime(activity.timeShift)} </p>
                    <p><strong>Необхідна кількість робочого персоналу:</strong> {activity.requiredWorkerCount} </p>
                </div>
                < hr/>
                <div className={"mt-3 w-100 d-flex flex-column align-items-center"}>
                    <Button
                        className={"w-50"}
                        variant={"outline-primary"}
                        onClick={() => navigation(ACTIVITY_PAGE.replace(':id', activity.id))}
                    >
                        Переглянути
                    </Button>
                    { hasUserRole(getRoleTitles(userStore.user.roles), [RoleEnum.SUBSCRIBER, RoleEnum.COMPANY_ADMIN]) &&
                        <Button
                            className={"w-50 mt-3"}
                            variant={"outline-danger"}
                            onClick={() => handleDeleteActivity(activity.id)}
                        >
                            Видалити
                        </Button>
                    }
                </div>
            </Card>
        </Col>
    );
});

export default ActivityListItem;