/* eslint-disable prettier/prettier */
import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import { useSelector } from "react-redux";

import { CTAButton } from "../../components/CustomButtons/index";
import MeetImg from "../../images/meet.jpg";
import "./index.scss";
// use https://lipis.github.io/bootstrap-sweetalert/ the second from the bottom for the how was your meeting alert

function Meet() {
  const firstName = useSelector((state) => state.user.firestoreDoc?.firstName);

  return (
    <Container fluid className="meet-container-fluid">
      <Container className="meet-content-container d-flex align-items-center">
        <Row className="meet-row">
          <Col xs={12} sm={12} md={6} className="d-flex flex-column justify-content-center align-items-start">
            <h3>Hello, {firstName}</h3>
            <h1>Meet nearby people with our cutting edge algorithms.</h1>
            <p>
              After you have been matched with people near you, you can send
              them a message and meet up quickly !
            </p>
            <CTAButton>Meet Now</CTAButton>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <img src={MeetImg} className="img-fluid" alt="meet img" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Meet;
