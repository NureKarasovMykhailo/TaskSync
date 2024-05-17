import React from 'react';
import {Container} from "react-bootstrap";
import AdminAddComplexity from "../components/forms/AdminComplexityForms/AdminAddComplexity";

const AddComplexityAdminPage = () => {
    return (
        <Container className={"w-100 min-vh-100 border mt-3 mb-3 p-3"}>
            <div>
                <h2>Додавання складності</h2>
            </div>
            <div className={"mt-3"}>
                <AdminAddComplexity />
            </div>
        </Container>
    );
};

export default AddComplexityAdminPage;