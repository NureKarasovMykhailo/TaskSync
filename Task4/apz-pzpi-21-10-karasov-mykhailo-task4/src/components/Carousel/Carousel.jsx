import Carousel from 'react-bootstrap/Carousel';
import React from "react";
import stl from './Carousel.css';

function CarouselMain () {
    const slides = [
        {
            img: 'Assets/carousel-main-first-slide.jpg',
            header: 'Ефективне керування персоналом: ключ до успіху вашого бізнесу',
            text: 'Дізнайтеся, як наша платформа допоможе вам оптимізувати управління персоналом, ' +
                ' збільшити продуктивність та знизити витрати. Реалізуйте свій потенціал разом з нами!'
        },
        {
            img: 'Assets/carousel-main-second-slide.jpg',
            header: 'Модернізуйте своє управління персоналом разом з нами',
            text: 'Наша інноваційна платформа пропонує передові інструменти для ефективного управління персоналом.' +
                ' Використовуйте технології для досягнення великих результатів'
        },
        {
            img: 'Assets/carousel-main-third-slide.jpg',
            header: 'Зробіть ваш бізнес сильнішим: управляйте своїм персоналом з легкістю',
            text: 'Завдяки нашій платформі ви зможете ефективно керувати своїм персоналом, мотивувати команду ' +
                'та розвивати бізнес швидше і ефективніше. Почніть з нами сьогодні!'
        }
    ]

    return (
       <Carousel>
           { slides.map((slide, index) => (
               <Carousel.Item key={index}>
                   <img
                       className='d-block carousel__slide'
                       src={slide.img}
                       alt="Error while loading photo"
                   />
                   <Carousel.Caption>
                       <h3>{slide.header}</h3>
                       <p>{slide.text}</p>
                   </Carousel.Caption>
               </Carousel.Item>
           ))}
       </Carousel>
    );
}

export default CarouselMain;