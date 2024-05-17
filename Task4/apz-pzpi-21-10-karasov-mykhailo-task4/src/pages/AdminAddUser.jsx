import React from 'react';
import {Container} from "react-bootstrap";
import AdminAddUserForm from "../components/forms/AdminAddUserForm/AdminAddUserForm";

const AdminAddUser = () => {
    return (
        <Container className={"w-100 min-vh-100 border mt-3 mb-3 p-3"}>
            <div className={"mb-3"}>
                <h2>Додавання користувача</h2>
            </div>
            <div>
                <AdminAddUserForm />
            </div>
        </Container>
    );
};

export default AdminAddUser;