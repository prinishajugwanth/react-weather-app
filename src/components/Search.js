import React, { useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

import TemperatureDetails from './TemperatureDetails';

export default function Search() {
    let [located, setLocated] = useState(false);
    let [latitude, setLatitude] = useState(0);
    let [longitude, setLongitude] = useState(0);
    let [cityname, setCityname] = useState('');
    let [currentWeatherConditions, setCurrentWeatherConditions] = useState();
    let [loadingGeo, setLoadingGeo] = useState(false);
    let [loadingSearch, setLoadingSearch] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');

    const [showModalError, setShowModalError] = useState(false);
    const handleClose = () => setShowModalError(false);
    const handleShow = () => setShowModalError(true);

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
    function updateCityEnter(event) {
        if (event.key === 'Enter') {
            searchUserCity();
        }
    }

    function searchUserCity(event) {
        setLoadingGeo(false);
        setLoadingSearch(true);
        setLocated(false);
        resolveGeolocationFromCityName();
    }

    function resolveGeolocationFromCityName() {
        let getCoordinatesUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiId}&units=metric`;
        axios
            .get(getCoordinatesUrl)
            .then(function (data) {
                setCityname(data.data.name);
                setLatitude(data.data.coord.lat);
                setLongitude(data.data.coord.lon);
                setCurrentWeatherConditions(data.data);
                setLocated(true);
                setLoadingGeo(false);
                setLoadingSearch(false);
            })
            .catch(function (error) {
                console.log(error);
                setErrorMessage(error.response.data.message);
                setLoadingGeo(false);
                setLoadingSearch(false);
                setLocated(false);
                handleShow();
            });
    }

    return (
        <>
            <InputGroup className='px-2'>
                <Form.Control placeholder='Enter City' aria-label='city' onChange={updateCity} onKeyPress={updateCityEnter} />
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
            <Modal show={showModalError} onHide={handleClose} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Weather Application</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-capitalize'>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
