import React, {useState} from 'react';
import {Button, Card, Container, Form, FormGroup, FormLabel} from "react-bootstrap";
import '../styles/AddCompanyPage.css';
import {createCompany} from "../API/companyApi";

const AddCompanyPage = () => {
    const [companyData, setCompanyData] = useState({
        companyName: '',
        description: '',
        companyImage: {}
    });

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setCompanyData({
                ...companyData,
                companyImage: e.target.files[0]
            });
        } else {
            setCompanyData({
                ...companyData,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleCreateCompany = async (e) => {
        try {
            const formData = new FormData();
            formData.append('companyName', companyData.companyName);
            formData.append('description', companyData.description);
            formData.append('companyImage', companyData.companyImage);

            const response = await createCompany(formData);
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card className={"h-100 border p-4 add-company__container"}>
            <div className={"w-100 d-flex justify-content-center"}>
                <h3>Додавання компанії</h3>
            </div>

            <Form className={"w-75"}>
                <Form.Group className={"mb-3"} controlId={"companyName"}>
                    <Form.Label>Назва компанії</Form.Label>
                    <Form.Control
                        type={"text"}
                        placeholder={"Введіть назву компанії"}
                        name={"companyName"}
                        value={companyData.companyName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"description"}>
                    <Form.Label>Опис</Form.Label>
                    <Form.Control
                        as={"textarea"}
                        placeholder={"Опис"}
                        name={"description"}
                        value={companyData.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <FormGroup className={"mb-3"} controlId={"companyImage"}>
                    <FormLabel>Лого компанії</FormLabel>
                    <Form.Control type={"file"} onChange={handleChange}/>
                </FormGroup>

                <Button
                    className={"w-50"}
                    type={"button"}
                    onClick={handleCreateCompany}
                >
                    Додати
                </Button>
            </Form>
        </Card>
    );
};

export default AddCompanyPage;