import React from 'react';
import {Container} from "react-bootstrap";
import AdminAddCompanyForm from "../components/forms/AdminAddCompany/AdminAddCompanyForm";

const AdminAddCompany = () => {
    return (
        <Container className={"w-100 min-vh-100 border mt-3 mb-3 p-3"}>
            <div>
                <h2>Додавання компанії</h2>
            </div>
            <div className={"mt-3"}>
                <AdminAddCompanyForm />
            </div>
        </Container>
    );
};

export default AdminAddCompany;