import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function TemperatureItems(props) {
  return (
    <ListGroup className="list-group-flush">
      {props.items.map(function (item, index) {
        return (
          <ListGroup.Item key={index}>
            <Row>
              <Col>{item.description}</Col>
              <Col>
                {item.value} {item.unit}
              </Col>
            </Row>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
