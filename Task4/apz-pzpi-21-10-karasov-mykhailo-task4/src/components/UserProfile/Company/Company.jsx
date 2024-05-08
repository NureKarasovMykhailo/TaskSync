import React from 'react';
import {Button, Container} from "react-bootstrap";
import './Company.css';
import {useNavigate} from "react-router-dom";
import {ADD_COMPANY} from "../../../utils/consts";

const Company = ({ user }) => {
    const navigation = useNavigate();

    const handleCreateCompanyClick = (e) => {
        navigation(ADD_COMPANY);
    }

    return (
        <Container className={"w-100 h-100 border p-3 company-page__container"}>
            <div className={"w-100 d-flex justify-content-center"}>
                <h2>Компанія</h2>
            </div>

            { user.companyId ?
                <div></div>
                :
                <div className={"company-page__no-company-container"}>
                    <p >Ви ще не додали компанію. Ви можете зробити це у будь-який момент.</p>
                    <div className={"company-page__add-company-button"}>
                        <Button
                            className={"company-page__add-button"}
                            type={"button"}
                            onClick={handleCreateCompanyClick}
                        >
                            Додати
                        </Button>
                    </div>
                </div>
            }
        </Container>
    );
};

export default Company;