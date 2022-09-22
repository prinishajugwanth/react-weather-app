import "../css/TemperatureDetails.css";

import TemperatureItem from "./TemperatureItem";

import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import ReactAnimatedWeather from "react-animated-weather";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function TemperatureDetails(props) {
  let [unit, setUnit] = useState("°C");

  function iconFor(condition) {
    let knownConditions = {
      Smoke: "CLEAR_DAY",
      Snow: "SNOW",
      Rain: "RAIN",
      Thunderstorm: "RAIN",
      Drizzle: "RAIN",
      Sand: "SLEET",
      Dust: "FOG",
      Ash: "FOG",
      Squall: "FOG",
      Clouds: "CLOUDY",
      Tornado: "WIND",
      Clear: "CLEAR_DAY",
      Mist: "FOG",
      Haze: "FOG",
      Fog: "FOG",
    };
    return knownConditions[condition];
  }

  function convertToKmph(value) {
    return Math.round((value * 18) / 5);
  }

  function renderInUnit(event) {
    setUnit(event.target.getAttribute("unit"));
  }
  function convertTempToSelectedUnit(value) {
    if (unit === "°C") {
      return Math.round(value);
    } else {
      return Math.round(value * (9 / 5) + 32);
    }
  }

  return (
    <>
      <Card className="text-center mx-2">
        <Card.Header>Current Weather Conditions</Card.Header>
        <Card.Body>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{props.name}</Card.Title>
              <Card.Text>
                {props.currentConditions.weather[0].main} -{" "}
                {props.currentConditions.weather[0].description}
              </Card.Text>
              <ReactAnimatedWeather
                icon={iconFor(props.currentConditions.weather[0].main)}
                color="black"
                size={60}
                animate={true}
              />
              <Card.Text>
                Feels like{" "}
                {convertTempToSelectedUnit(
                  props.currentConditions.main.feels_like
                )}{" "}
                {unit}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <TemperatureItem
                description="Temperature"
                value={convertTempToSelectedUnit(
                  props.currentConditions.main.temp
                )}
                unit={unit}
                index="1"
              ></TemperatureItem>
              <TemperatureItem
                description="Minimum"
                value={convertTempToSelectedUnit(
                  props.currentConditions.main.temp_min
                )}
                unit={unit}
                index="2"
              ></TemperatureItem>
              <TemperatureItem
                description="Maximum"
                value={convertTempToSelectedUnit(
                  props.currentConditions.main.temp_max
                )}
                unit={unit}
                index="3"
              ></TemperatureItem>
              <TemperatureItem
                description="Humidity"
                value={Math.round(props.currentConditions.main.humidity)}
                unit="%"
                index="4"
              ></TemperatureItem>
              <TemperatureItem
                description="Pressure"
                value={Math.round(props.currentConditions.main.pressure)}
                unit="hPa"
                index="5"
              ></TemperatureItem>
              <TemperatureItem
                description="Wind Speed"
                value={convertToKmph(props.currentConditions.wind.speed)}
                unit="km/h"
                index="6"
              ></TemperatureItem>
            </ListGroup>
            <Card.Body>
              <Button
                variant="secondary"
                className="mt-2 mx-2"
                onClick={renderInUnit}
                unit="°C"
              >
                °C
              </Button>
              <Button
                variant="secondary"
                className="mt-2 mx-2"
                onClick={renderInUnit}
                unit="°F"
              >
                °F
              </Button>
            </Card.Body>
          </Card>
          <Button variant="primary" className="mt-2">
            5 day Forcast
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">date time here</Card.Footer>
      </Card>
    </>
  );
}
