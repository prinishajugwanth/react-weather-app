import "../css/TemperatureDetails.css";

import TemperatureItems from "./TemperatureItems";

import ReactAnimatedWeather from "react-animated-weather";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function TemperatureDetails(props) {
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
  let details = [
    {
      description: "Minimum",
      value: Math.round(props.currentConditions.main.temp_min),
      unit: "°C",
    },
    {
      description: "Maximum",
      value: Math.round(props.currentConditions.main.temp_max),
      unit: "°C",
    },
    {
      description: "Humidity",
      value: props.currentConditions.main.humidity,
      unit: "%",
    },
    {
      description: "Pressure",
      value: props.currentConditions.main.pressure,
      unit: "hPa",
    },
    {
      description: "Wind Speed",
      value: convertToKmph(props.currentConditions.wind.speed),
      unit: "km/h",
    },
  ];

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
                Feels like {Math.round(props.currentConditions.main.feels_like)}
                °C
              </Card.Text>
            </Card.Body>
            <TemperatureItems items={details}></TemperatureItems>
            <Card.Body>
              <Card.Link href="#">Celsius</Card.Link>
              <Card.Link href="#">Fahrenheit</Card.Link>
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
