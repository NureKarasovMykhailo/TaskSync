import React from 'react';
import {Container} from "react-bootstrap";
import CarouselMain from "../components/Carousel/Carousel";
import '../styles/MainPage.css';
import Loader from "../components/UI/Loader/Loader";

const MainPage = () => {
    return (
        <Container style={{height: '100%'}}>
            <CarouselMain />

            <div className={"main-page__text-block"}>
                <div className={"main-page__text-block-image-container"}>
                    <img
                        className={"main-page__text-block-image"}
                        src={"Assets/main-page-middle-image.jpg"}
                        alt={"Error while loading image"}
                    />
                </div>
                <div className={"main-page__text-block-text"}>
                    <h3 className={"main-page__text-block-text-header"}>Ласкаво просимо на нашу платформу управління персоналом!</h3>
                    <ul>
                        <li> Тут ви знайдете інструменти для оптимізації керування вашим бізнесом;</li>
                        <li>Наші інноваційні рішення дозволять вам ефективно керувати персоналом, збільшувати
                            продуктивність та досягати нових висот;</li>
                        <li>За допомогою нашої платформи ви зможете легко створювати розклади, відстежувати робочий час,
                            контролювати завдання та багато іншого. Розвивайте свій бізнес разом з нами;</li>
                        <li>Приєднуйтесь до нашої спільноти вже сьогодні і дайте вашому бізнесу можливість рости та
                            процвітати;</li>
                    </ul>
                </div>
            </div>

            <div className={"main_page__image-container"}>
                <img
                    src={"Assets/main-page-end-image.jpg"}
                    alt={"Error while loading image"}
                    className={"main_page__image"}
                />
            </div>

        </Container>
    );
};

export default MainPage;