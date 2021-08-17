import React from "react";

import { Card, Container, Row, Col } from "react-bootstrap";
import NeighborsCards from "../../components/NeighborsCards";
import "./index.scss";

function Neighbors() {
  return (
    <Container fluid className="neighbors-container-fluid">
      <Container className="neighbors-content-container">
        <div className="my-3 d-flex justify-content-between">
          <div className="w-100 text-center text-sm-center text-md-start">
            <h1>Nearby neighbors to meet :</h1>
            <div className="filter-wrapper">
              <select>
                <option>option 1</option>
                <option>option 2</option>
                <option>option 3</option>
                <option>option 4</option>
              </select>
              <select>
                <option>option 1</option>
                <option>option 2</option>
                <option>option 3</option>
                <option>option 4</option>
              </select>
            </div>
          </div>
          <div className="quote-wrapper d-flex align-items-center d-none d-sm-none d-md-block">
            <p>
              By clicking on “Invite to Meet Button” you can notify the user you
              want to meet with and if he/she returns back to your notification,
              your e-mail adresses will be visible to each other.
            </p>
          </div>
        </div>
        <Row className="neighbors-cards d-flex justify-content-around flex-wrap">
          <Col xs={12} sm={6} md={4}>
            <NeighborsCards />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <NeighborsCards />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <NeighborsCards />
          </Col>
          <Col xs={12} sm={6} md={4}>
            <NeighborsCards />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Neighbors;
