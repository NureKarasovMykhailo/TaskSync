import React from 'react';
import {Container} from "react-bootstrap";
import AdminAddScannerForm from "../components/forms/AdminAddScannerForm/AdminAddScannerForm";

const AdminAddScanner = () => {
    return (
        <Container className={"mt-3 mb-3 p-3 border min-vh-100"}>
            <div>
                <h2>Додавання сканеру</h2>
            </div>
            <AdminAddScannerForm />
        </Container>
    );
};

export default AdminAddScanner;