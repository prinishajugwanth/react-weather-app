import '../css/TemperatureDetails.css';

import DailyForecast from './DailyForecast';

import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

import axios from 'axios';

export default function TemperatureDetails(props) {
    const apiId = '45a279e4eb49922fc1c93e07d331e80a';
    let [forecast, setForecast] = useState(null);
    let [forecastLoaded, setForecastLoaded] = useState(false);

    function LoadingButton() {
        const [isLoading, setLoading] = useState(false);

        useEffect(() => {
            if (isLoading) {
                let getCoordinatesUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.latitude}&lon=${props.longitude}&exclude=hourly,minutely&appid=${apiId}&units=metric`;
                axios.get(getCoordinatesUrl).then(function (data) {
                    data.data.daily.splice(6, 2);
                    data.data.daily.splice(0, 1);

                    setForecast(data.data.daily);
                    setForecastLoaded(true);
                    setLoading(false);
                });
            }
        }, [isLoading]);

        const handleClick = () => setLoading(true);

        return (
            <Button variant='outline-secondary' disabled={isLoading} onClick={!isLoading ? handleClick : null}>
                {isLoading ? 'Loading...' : '5 day Forecast'}
            </Button>
        );
    }

    return (
        <>
            <Carousel fade variant='dark' className='mb-0' indicators={false} controls={forecastLoaded} wrap={false}>
                <Carousel.Item key={6}>
                    <DailyForecast cityName={props.name} data={props.currentConditions} title='Today' index={6} />
                </Carousel.Item>

                {forecastLoaded &&
                    forecast.map((data, index) => (
                        <Carousel.Item key={index}>
                            <DailyForecast cityName={props.name} data={data} title={data.dt} index={index} />
                        </Carousel.Item>
                    ))}
            </Carousel>
            <LoadingButton />
        </>
    );
}
