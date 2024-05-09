import React from 'react';
import i18n from "../../i18n";
import {Form} from "react-bootstrap";

const LanguageSelector = () => {

    const changeLanguage = (e) => {
        const lng = e.target.value;
        i18n.changeLanguage(lng);
    };

    return (
        <div className={"w-10 p-3"}>
            <Form.Select onChange={changeLanguage}>
                <option value={'uk'}>УКР</option>
                <option value={'en'}>ENG</option>
            </Form.Select>
        </div>
    );
};

export default LanguageSelector;