import { React } from "react";

import { Modal, Container, Card } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { createInterestString } from "../../utils/helpers";

import PPMaleSVG from "../../images/Profile/PPMaleSVG.svg";
import PPFemaleSVG from "../../images/Profile/PPFemaleSVG.svg";
import PPGenderless from "../../images/Profile/PPGenderless.png";

import "./index.scss";

// first and last name below the image and outside the card
// we can show their aducation in here
// education, bio and interests

const NeighborSummaryModal = ({ selectedNeighbor, setSelectedNeighbor }) => {
  const dispatch = useDispatch();
  const isNeighborSummaryOpen = useSelector(
    (state) => state.popup.isNeighborSummaryOpen
  );

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
          // className="profile-page-bg"
          style={
            selectedNeighbor?.backgroundImageUrl
              ? {
                  backgroundImage: `url(${selectedNeighbor.backgroundImageUrl})`,
                }
              : null
          }
        >
          <Modal.Header>
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
          </Modal.Header>

          <Modal.Body>
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
                      {selectedNeighbor?.interests === "Default interest." ||
                      selectedNeighbor?.interests === undefined
                        ? "Default interest."
                        : createInterestString(selectedNeighbor.interests)}
                    </span>
                  </li>
                  <li>
                    Education:{" "}
                    <span>
                      {selectedNeighbor?.education || "Default education."}
                    </span>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Modal.Body>
        </Container>
      </Modal>
    )
  );
};

export default NeighborSummaryModal;
