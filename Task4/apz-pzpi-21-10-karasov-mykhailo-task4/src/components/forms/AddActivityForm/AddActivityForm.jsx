import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import {fetchComplexities} from "../../../API/complexityApi";
import {fetchEducations} from "../../../API/educationApi";
import Loader from "../../UI/Loader/Loader";
import {useTranslation} from "react-i18next";
import {getTimeInSeconds} from "../../../utils/getTimeInSeconds";
import {createActivity} from "../../../API/activityApi";
import getFormattingErrors from "../../../utils/validationErrorsFormating";

const AddActivityForm = () => {
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(true);
    const [complexities, setComplexities] = useState([{}]);
    const [educations, setEducations] = useState([{}]);
    const [activityInfo, setActivityInfo] = useState({
        activityTitle: '',
        description: '',
        requiredWorkerCount: '',
        hoursShift: '',
        minutesShift: '',
        complexityId: null,
        educationId: null
    });
    const [validationErrors, setValidationErrors] = useState({
        activityTitle: '',
        description: '',
        requiredWorkerCount: '',
        timeShift: '',
    });

    useEffect(() => {
        setIsLoading(true);
        setValidationErrors({
            activityTitle: '',
            description: '',
            requiredWorkerCount: '',
            timeShift: '',
        });
        fetchComplexities(999, 1).then(responseComplexity => {
            setComplexities(responseComplexity.complexities);
            fetchEducations(999, 1).then(responseEducations => {
                setEducations(responseEducations.educations);
                setIsLoading(false);
            });
        });
    }, []);

    const onChange = (e) => {
        setActivityInfo({
            ...activityInfo,
            [e.target.name]: e.target.value
        });
    }

    const handleCreateActivityClick = async () => {
        try {
            console.log(activityInfo.educationId)
            console.log(activityInfo.complexityId)

            const formData = new FormData();
            formData.append('activityTitle', activityInfo.activityTitle);
            formData.append('description', activityInfo.description);
            formData.append('requiredWorkerCount', activityInfo.requiredWorkerCount);
            formData.append('timeShift', getTimeInSeconds(activityInfo.hoursShift, activityInfo.minutesShift));
            formData.append('complexityId', activityInfo.complexityId);
            formData.append('educationId', activityInfo.educationId);

            const response = await createActivity(formData);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    const formattingErrors = getFormattingErrors(error.response.data.message)
                    setValidationErrors({
                        ...validationErrors,
                        ...formattingErrors
                    });
                }
            }
        }
    }

    return (
        !isLoading ?
            <Form>
                <Form.Group className={"mb-3"} controlId={"activityTitle"}>
                    <Form.Label>Назва активності</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type={"text"}
                            name={"activityTitle"}
                            placeholder={"Назва активності"}
                            value={activityInfo.activityTitle}
                            onChange={onChange}
                            isInvalid={!!validationErrors.activityTitle}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.activityTitle}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group  className={"mb-3"} controlId={"description"} >
                    <Form.Label>Опис</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            as={"textarea"}
                            name={"description"}
                            placeholder={"Опис"}
                            value={activityInfo.description}
                            onChange={onChange}
                            isInvalid={!!validationErrors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.description}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className={"mb-3"} controlId={"requiredWorkerCount"}>
                    <Form.Label>Необхідна кількість робітників</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type={"number"}
                            name={"requiredWorkerCount"}
                            placeholder={"Необхідна кількість робітників"}
                            value={activityInfo.requiredWorkerCount}
                            onChange={onChange}
                            isInvalid={!!validationErrors.requiredWorkerCount}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.requiredWorkerCount}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className={"mb-3 w-50"} controlId={"requiredWorkerCount"}>
                    <Form.Label>Час робочої зміни</Form.Label>
                    <InputGroup className={"d-flex align-items-center"} hasValidation>
                        <Form.Control
                            className={"w-25 m-1"}
                            type={"number"}
                            name={"hoursShift"}
                            placeholder={"Час робочої зміни"}
                            value={activityInfo.hoursShift}
                            onChange={onChange}
                            isInvalid={!!validationErrors.timeShift}
                        />
                        <strong>год.</strong>
                        <Form.Control
                            className={"w-25 m-1"}
                            type={"number"}
                            name={"minutesShift"}
                            placeholder={"Час робочої зміни"}
                            value={activityInfo.minutesShift}
                            onChange={onChange}
                            isInvalid={!!validationErrors.timeShift}
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.timeShift}
                        </Form.Control.Feedback>
                        <strong>хв.</strong>
                    </InputGroup>
                </Form.Group>

                <Form.Group className={"mb-3"} controlId={"educationId"}>
                    <Form.Label>Необхідна освіта</Form.Label>
                    <Form.Select name={"educationId"} onChange={onChange} value={activityInfo.educationId}>
                        { educations.map(education => (
                            <option
                                key={education.id}
                                value={education.id}
                            >
                                { education.educationTitle }
                            </option>
                        )) }
                    </Form.Select>
                </Form.Group>

                <Form.Group className={"mb-3"} controlId={"complexityId"}>
                    <Form.Label>Складність виокнання діяльності</Form.Label>
                    <Form.Select name={"complexityId"} onChange={onChange} value={activityInfo.complexityId}>
                        { complexities.map(complexity => (
                            <option
                                key={complexity.id}
                                value={complexity.id}
                                selected={complexity.id === activityInfo.complexityId}
                            >
                                { complexity.complexityTitle }
                            </option>
                        )) }
                    </Form.Select>
                </Form.Group>
                <Button
                    className={"w-50"}
                    onClick={handleCreateActivityClick}
                >
                    {t('addButton')}
                </Button>
            </Form>
            :
            <div className={"w-100 min-vh-100 d-flex align-items-center justify-content-center"}>
                <Loader />
            </div>
    );
};

export default AddActivityForm;