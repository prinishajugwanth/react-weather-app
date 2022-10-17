import React, { useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

import TemperatureDetails from './TemperatureDetails';

export default function Search() {
    let [located, setLocated] = useState(false);
    let [latitude, setLatitude] = useState(0);
    let [longitude, setLongitude] = useState(0);
    let [cityname, setCityname] = useState('');
    let [currentWeatherConditions, setCurrentWeatherConditions] = useState();
    let [loadingGeo, setLoadingGeo] = useState(false);
    let [loadingSearch, setLoadingSearch] = useState(false);

    const apiId = '45a279e4eb49922fc1c93e07d331e80a';

    function geoLocateUser(event) {
        if (navigator.geolocation) {
            setLoadingGeo(true);
            setLoadingSearch(false);
            setLocated(false);
            navigator.geolocation.getCurrentPosition(function (position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                resolveCityNameFromGeoLocation(position.coords);
            });
        }
    }

    function resolveCityNameFromGeoLocation(coords) {
        let getCityNameUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiId}&units=metric`;
        axios.get(getCityNameUrl).then(function (data) {
            setCityname(data.data.name);
            setCurrentWeatherConditions(data.data);
            setLocated(true);
            setLoadingGeo(false);
            setLoadingSearch(false);
        });
    }

    function updateCity(event) {
        setLocated(false);
        setCityname(event.target.value);
    }

    function searchUserCity(event) {
        setLoadingGeo(false);
        setLoadingSearch(true);
        setLocated(false);
        resolveGeolocationFromCityName();
    }

    function resolveGeolocationFromCityName() {
        let getCoordinatesUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiId}&units=metric`;
        axios.get(getCoordinatesUrl).then(function (data) {
            setCityname(data.data.name);
            setLatitude(data.data.coord.lat);
            setLongitude(data.data.coord.lon);
            setCurrentWeatherConditions(data.data);
            setLocated(true);
            setLoadingGeo(false);
            setLoadingSearch(false);
        });
    }

    return (
        <>
            <InputGroup className='px-2'>
                <Form.Control placeholder='Enter City' aria-label='city' onChange={updateCity} />
                <Button variant='outline-secondary' onClick={geoLocateUser}>
                    {!loadingGeo && <i className='bi bi-geo'></i>}
                    {loadingGeo && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />}
                    <span className='visually-hidden'>Loading...</span>
                </Button>
                <Button variant='outline-secondary' onClick={searchUserCity}>
                    {!loadingSearch && <i className='bi bi-search'></i>}
                    {loadingSearch && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />}
                </Button>
            </InputGroup>
            {located && <TemperatureDetails latitude={latitude} longitude={longitude} name={cityname} currentConditions={currentWeatherConditions} />}
        </>
    );
}
