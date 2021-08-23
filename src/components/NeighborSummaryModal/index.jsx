import { React } from "react";

import { Modal, Container, Row, Col, Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import PPMaleSVG from "../../images/Profile/PPMaleSVG.svg";
import PPFemaleSVG from "../../images/Profile/PPFemaleSVG.svg";
import PPGenderless from "../../images/Profile/PPGenderless.png";

import "./index.scss";

const NeighborSummaryModal = ({ selectedNeighbor, setSelectedNeighbor }) => {
  const dispatch = useDispatch();
  const isNeighborSummaryOpen = useSelector(
    (state) => state.popup.isNeighborSummaryOpen
  );

  function createInterestString() {
    let interestsString = "";
    selectedNeighbor?.interests.forEach((interestObj, index, array) => {
      if (index === array.length - 1) {
        interestsString += `${interestObj.content}.`;
        return;
      }
      interestsString += `${interestObj.content} | `;
    });
    return interestsString;
  }

  return (
    Object.keys(selectedNeighbor).length !== 0 && (
      <Modal
        show={isNeighborSummaryOpen}
        onHide={() => {
          dispatch({ type: "neighborSummary" });
          setSelectedNeighbor({});
        }}
        id="neighbor-summary-modal"
      >
        <Container
          fluid
          className="profile-page-bg"
          style={
            selectedNeighbor?.backgroundImageUrl
              ? {
                  backgroundImage: `url(${selectedNeighbor.backgroundImageUrl})`,
                }
              : null
          }
        >
          <Container className="profile-content-container d-flex flex-column justify-content-center align-items-center flex-wrap align-content-center">
            <Row>
              <Col
                xs={12}
                sm={12}
                className="d-flex flex-column align-items-center mb-3"
              >
                <div>
                  <img
                    className="profile-photo"
                    alt="profile"
                    style={
                      selectedNeighbor?.gender === "Prefer not to say"
                        ? { width: "190px" }
                        : null
                    }
                    src={
                      selectedNeighbor?.profileImageUrl ||
                      /* eslint-disable-next-line no-nested-ternary */
                      (selectedNeighbor?.gender === "Male"
                        ? PPMaleSVG
                        : selectedNeighbor?.gender === "Female"
                        ? PPFemaleSVG
                        : PPGenderless)
                    }
                  />
                </div>
              </Col>

              <Col xs={12} sm={12}>
                <Row className="cards-row d-flex justify-content-around flex-wrap">
                  <Col
                    xs={12}
                    sm={12}
                    md={4}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Card className="info-cards white-card">
                      <Card.Body>
                        <Card.Title className="card-title">General</Card.Title>
                        <ul className="d-flex flex-column justify-content-around  mb-0">
                          <li>
                            Bio:{" "}
                            <span>
                              {selectedNeighbor?.bio ||
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper gravida tincidunt aliquam quam."}
                            </span>
                          </li>
                          <li>
                            Interests:{" "}
                            <span>
                              {selectedNeighbor?.interests ===
                                "Default interest." ||
                              selectedNeighbor?.interests === undefined
                                ? "Default interest."
                                : createInterestString()}
                            </span>
                          </li>
                          <li>
                            Education:{" "}
                            <span>
                              {selectedNeighbor?.education ||
                                "Default education."}
                            </span>
                          </li>
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      </Modal>
    )
  );
};

export default NeighborSummaryModal;
