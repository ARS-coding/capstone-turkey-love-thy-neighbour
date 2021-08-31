import React, { useState } from "react";

import { Container, Row, Col, Button, Modal } from "react-bootstrap";

import "./index.scss";
import { useFormik } from "formik";

import * as Yup from "yup";
import { Link } from "react-router-dom";
import { CTAButton } from "../../components/CustomButtons/index";

import mainImg from "../../images/firstContactUs.svg";
import logoimg from "../../images/secondContactUs.svg";

import { firestore } from "../../firebaseConfig";

function ContactUs() {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      user_message: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      last_name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      user_message: Yup.string()
        .min(2, "Mininum 10 characters")
        .max(15, "Maximum 500 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      // eslint-disable-next-line
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    firestore.collection("contacts").add({
      name,
      lastname,
      email,
      message,
    });

    setName("");
    setLastname("");
    setEmail("");
    setMessage("");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <section className="container-fluid">
      <Container className="contactus-content-container d-flex align-items-center">
        <Row className="contactus-content-row m-0">
          <Col
            xs={12}
            sm={12}
            md={6}
            className="first-column p-0 pb-xs-5 pb-md-5 d-flex flex-column justify-content-center align-items-start"
          >
            <div className="App">
              <h1 className="main-header">Contact Us</h1>
              <h5>
                Help us create effective and active communities by communicating
                with us!
              </h5>

              <form onSubmit={(formik.handleSubmit, handleSubmit)}>
                <div className="form-box">
                  <div className="first-last-names">
                    <div>
                      <input
                        className="first-name"
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={(formik.values.first_name, name)}
                        onChange={
                          (formik.handleChange, (e) => setName(e.target.value))
                        }
                      />
                      {formik.errors.first_name &&
                        formik.touched.first_name && (
                          <p>{formik.errors.first_name}</p>
                        )}
                    </div>
                    <div>
                      <input
                        className="last-name"
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={(formik.values.last_name, lastname)}
                        onChange={
                          (formik.handleChange,
                          (e) => setLastname(e.target.value))
                        }
                      />
                      {formik.errors.last_name && formik.touched.last_name && (
                        <p>{formik.errors.last_name}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      className="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={(formik.values.email, email)}
                      onChange={
                        (formik.handleChange, (e) => setEmail(e.target.value))
                      }
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p>{formik.errors.email}</p>
                    )}
                  </div>
                  <div>
                    <input
                      className="textarea"
                      type="text"
                      name="user_message"
                      placeholder="Message"
                      value={(formik.values.user_message, message)}
                      onChange={
                        (formik.handleChange, (e) => setMessage(e.target.value))
                      }
                    />
                    {formik.errors.user_message &&
                      formik.touched.user_message && (
                        <p>{formik.errors.user_message}</p>
                      )}
                  </div>
                </div>
                <div className="send-button">
                  <CTAButton onClick={handleShow}>
                    <Link to="/neighbors">Send</Link>
                  </CTAButton>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20%"
                        height="20%"
                        fill="green"
                        className="check-icon"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" />
                      </svg>
                    </Modal.Header>
                    <Modal.Body>
                      <h5>
                        The message was successfully sent.
                        <br />
                        We will get you back soon!
                      </h5>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </form>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} className="p-0 px-xs-1 px-md-1 h-100">
            <img src={mainImg} alt="img" className="img-fluid main-img" />
            <img src={logoimg} alt="img" className="img-fluid logo-img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ContactUs;
