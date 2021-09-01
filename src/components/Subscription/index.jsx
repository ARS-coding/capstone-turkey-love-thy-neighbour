import React from "react";

import { useTranslation } from "react-i18next";

import { Container, Row, Col } from "react-bootstrap";

import PhoneAndNotificationsImg from "../../images/PhoneandNotifications.svg";
import { ReactComponent as CheckIcon } from "../../images/Check.svg";

import "./index.scss";

function Subscription() {
  const [email, setEmail] = React.useState("");
  const { t } = useTranslation();
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <section className="subscription-img-bg container-fluid">
      <Container className="subscription-content-container d-flex align-items-center">
        <Row className="subscription-content-row m-0">
          <Col
            xs={12}
            sm={12}
            md={6}
            className="first-column d-flex flex-column justify-content-center align-items-start"
          >
            <h1>
              {t("newsletter_title_one")} <br /> {t("newsletter_title_two")}
            </h1>
            <h3>{t("newsletter_update")}</h3>
            <p>{t("newsletter_subscribe")}</p>
            <div className="button-input-wrapper">
              <input
                type="email"
                className="form-email"
                aria-describedby="emailHelp"
                placeholder="E-Mail"
                value={email}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!email}
              >
                <CheckIcon />
              </button>
            </div>
          </Col>

          <Col
            xs={12}
            sm={12}
            md={6}
            className="my-md-auto d-flex d-sm-flex d-md-block justify-content-center justify-content-sm-center justify-content-md-center"
          >
            <img
              src={PhoneAndNotificationsImg}
              alt="phoneimg"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Subscription;
