import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import TemperatureItem from './TemperatureItem';
import Button from 'react-bootstrap/Button';

import ReactAnimatedWeather from 'react-animated-weather';

export default function DailyForecast(props) {
    let [unit, setUnit] = useState('°C');

    function iconFor(condition) {
        let knownConditions = {
            Smoke: 'CLEAR_DAY',
            Snow: 'SNOW',
            Rain: 'RAIN',
            Thunderstorm: 'RAIN',
            Drizzle: 'RAIN',
            Sand: 'SLEET',
            Dust: 'FOG',
            Ash: 'FOG',
            Squall: 'FOG',
            Clouds: 'CLOUDY',
            Tornado: 'WIND',
            Clear: 'CLEAR_DAY',
            Mist: 'FOG',
            Haze: 'FOG',
            Fog: 'FOG',
        };
        return knownConditions[condition];
    }

    function convertToKmph(value) {
        return Math.round((value * 18) / 5);
    }

    function renderInUnit(event) {
        setUnit(event.target.getAttribute('unit'));
    }
    function convertTempToSelectedUnit(value) {
        if (unit === '°C') {
            return Math.round(value);
        } else {
            return Math.round(value * (9 / 5) + 32);
        }
    }

    function getTime() {
        let timeNow = new Date();

        let timeString = `${String(timeNow.getHours()).padStart(2, '0')}:${String(timeNow.getMinutes()).padStart(2, '0')}:${String(timeNow.getSeconds()).padStart(2, '0')}`;
        return timeString;
    }

    function getDate() {
        let timeNow = new Date();

        let dateString = `${getDay(timeNow.getDay())}, ${getMonth(timeNow.getMonth())} ${timeNow.getDate()} ${timeNow.getFullYear()}`;

        return dateString;
    }

    function getMonth(month) {
        let months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
        return months[month];
    }

    function getDay(day) {
        let days = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
        return days[day];
    }
    function timeConverter(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let time = date + ' ' + month + ' ' + year;
        return time;
    }

    let feels_like;
    let temp;
    let temp_min;
    let temp_max;
    let humidity;
    let pressure;
    let speed;
    let cardTitle;
    if (props.index === 6) {
        feels_like = props.data.main.feels_like;
        temp = props.data.main.temp;
        temp_min = props.data.main.temp_min;
        temp_max = props.data.main.temp_max;
        humidity = props.data.main.humidity;
        pressure = props.data.main.pressure;
        speed = props.data.wind.speed;
        cardTitle = props.title;
    } else {
        feels_like = props.data.feels_like.day;
        temp = props.data.temp.day;
        temp_min = props.data.temp.min;
        temp_max = props.data.temp.max;
        humidity = props.data.humidity;
        pressure = props.data.pressure;
        speed = props.data.wind_speed;
        cardTitle = timeConverter(props.title);
    }
    return (
        <>
            <Card className='text-center mx-2'>
                <Card.Header>
                    <Card.Text className='mb-0'>Weather in {props.cityName}</Card.Text>
                    <Card.Text className='mb-0 text-muted'>
                        {getTime()} on {getDate()}
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{cardTitle}</Card.Title>
                            <Card.Text>
                                {props.data.weather[0].main} - {props.data.weather[0].description}
                            </Card.Text>
                            <ReactAnimatedWeather icon={iconFor(props.data.weather[0].main)} color='black' size={60} animate={true} />
                            <Card.Text>
                                Feels like {convertTempToSelectedUnit(feels_like)} {unit}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className='list-group-flush'>
                            <TemperatureItem description='Temperature' value={convertTempToSelectedUnit(temp)} unit={unit} index={1}></TemperatureItem>
                            <TemperatureItem description='Minimum' value={convertTempToSelectedUnit(temp_min)} unit={unit} index={2}></TemperatureItem>
                            <TemperatureItem description='Maximum' value={convertTempToSelectedUnit(temp_max)} unit={unit} index={3}></TemperatureItem>
                            <TemperatureItem description='Humidity' value={Math.round(humidity)} unit='%' index={4}></TemperatureItem>
                            <TemperatureItem description='Pressure' value={Math.round(pressure)} unit='hPa' index={5}></TemperatureItem>
                            <TemperatureItem description='Wind Speed' value={convertToKmph(speed)} unit='km/h' index={6}></TemperatureItem>
                        </ListGroup>
                        <Card.Body>
                            <Button variant='outline-secondary' className='mt-2 mx-2' onClick={renderInUnit} unit='°C'>
                                °C
                            </Button>
                            <Button variant='outline-secondary' className='mt-2 mx-2' onClick={renderInUnit} unit='°F'>
                                °F
                            </Button>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </>
    );
}
