import React from 'react';
import {Container} from "react-bootstrap";
import AdminAddScannerHistoryForm from "../components/forms/AdminAddScannerHistoryForm/AdminAddScannerHistoryForm";

const AdminAddScannerHistory = () => {
    return (
        <Container className={"min-vh-100 border mt-3 mb-3 border p-3"}>
            <div>
                <h2>Додавання історії датичка</h2>
            </div>
            <hr />
            <AdminAddScannerHistoryForm />
        </Container>
    );
};

export default AdminAddScannerHistory;