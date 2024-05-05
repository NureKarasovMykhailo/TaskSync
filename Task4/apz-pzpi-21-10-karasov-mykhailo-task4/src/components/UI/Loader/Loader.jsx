import React from 'react';
import stl from './Loader.module.css';
import {Spinner} from "react-bootstrap";

const Loader = () => {
    return (
        <div className={"w-100 h-100 d-flex justify-content-center align-items-center"} style={{minHeight: '250px'}}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loader;