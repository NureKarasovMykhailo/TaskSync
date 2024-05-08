import React, {useState} from 'react';
import {Alert, Button, Container, Form} from "react-bootstrap";
import {addUserEducation} from "../../../API/userApi";

const AddEducationModel = ({ educations, onAddSuccess }) => {
    const [error, setError] = useState('');
    const [educationTitle, setEducationTitle] = useState('');

    const handleAddEducation = async () => {
        try {
            const formData = new FormData();
            formData.append('educationTitle', educationTitle);
            const response = await addUserEducation(formData);
            onAddSuccess(true);

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <Container className={"w-100 h-100"}>
            <div className={"w-100 d-flex justify-content-center"}>
                <h4>Оберіть освіту</h4>
            </div>

            <Form>
                <Form.Group controlId={"educationTitle"}>
                    <Form.Label>Освіта</Form.Label>
                    <Form.Control
                        list={"educations"}
                        placeholder={"Введіть назву освіти..."}
                        value={educationTitle}
                        onChange={(e) => setEducationTitle(e.target.value)}
                    />
                    <datalist id={"educations"}>
                        { educations.map(education => (
                            <option key={education.id} value={education.educationTitle} />
                        )) }
                    </datalist>
                </Form.Group>
                { error &&
                    <Alert variant={"danger"} className={"mt-3"}>
                        { error }
                    </Alert>
                }
                <Button className={"mt-3"} onClick={handleAddEducation}>Додати освіту</Button>
            </Form>

        </Container>
    );
};

export default AddEducationModel;