import React from 'react';
import {Container} from "react-bootstrap";
import AdminEducationForm from "../components/forms/AdminEducationForm/AdminEducationForm";

const AdminAddEducation = () => {
    return (
        <Container className={"w-100 min-vh-100 border mt-3 mb-3 p-3"}>
            <div>
                <h2>Додавання освіти</h2>
            </div>
            <div>
                <AdminEducationForm />
            </div>
        </Container>
    );
};

export default AdminAddEducation;