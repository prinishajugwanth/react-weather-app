import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Search from './components/Search';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Stack from 'react-bootstrap/Stack';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <div className='WeatherApp mt-0'>
            <Stack gap={3}>
                <header className='Header'>Weather Application</header>
                <Search className='Search' />
                <footer className='Footer'>
                    <h6 className='mb-0 fw-normal'>
                        This page was designed by Prinisha Jugwanth and is an <a href='https://github.com/prinishajugwanth/react-weather-app'>open-source code</a>
                    </h6>
                </footer>
            </Stack>
        </div>
    </React.StrictMode>
);
