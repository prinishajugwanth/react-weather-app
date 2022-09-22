import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function TemperatureItems(props) {
  return (
    <ListGroup.Item key={props.index}>
      <Row>
        <Col>{props.description}</Col>
        <Col>
          {props.value} {props.unit}
        </Col>
      </Row>
    </ListGroup.Item>
  );
}
