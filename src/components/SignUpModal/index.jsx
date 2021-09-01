import React, { useState } from "react";
import { Modal, Button, Card, Alert } from "react-bootstrap";
import { useFormik } from "formik";

import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import { removeOneProp, setUserDocument } from "../../utils/helpers";
import constants from "../../utils/constants";

import { auth } from "../../firebaseConfig";

import logo from "../../images/logo.svg";
import {
  SignInUpButton,
  SignInUpGoogleButton,
  SignInUpFacebookButton,
} from "../CustomButtons";

import "./index.scss";

const SignUpModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialSignUpState = { isOpen: false, message: "" };
  const [signUpAlertState, setSignUpAlertState] = useState(initialSignUpState);

  const isSignUpOpen = useSelector((state) => state.popup.isSignUpOpen);
  const history = useHistory();

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    if (!values.gender) {
      errors.gender = "Required";
    }
    if (!values.district) {
      errors.district = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.repeatedPassword) {
      errors.repeatedPassword = "Required";
    } else if (values.repeatedPassword !== values.password) {
      errors.repeatedPassword = "Passwords do not match";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      district: "",
      email: "",
      password: "",
      repeatedPassword: "",
    },
    validate,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      resetForm();
      setSignUpAlertState(initialSignUpState);
      const objWithoutPasswordConfigProp = removeOneProp(
        values,
        "repeatedPassword"
      );
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((userCred) => {
          setUserDocument(userCred.user.uid, objWithoutPasswordConfigProp);
          return userCred;
        })
        .then((userCred) => {
          dispatch({ type: "signUp" });
          history.push(`/profile/${userCred.user.uid}`);
          dispatch({ type: "editProfile" });
        })
        .catch((err) =>
          setSignUpAlertState({ isOpen: true, message: err.message })
        );
      setSubmitting(false);
    },
  });

  return (
    <Modal
      show={isSignUpOpen}
      onHide={() => {
        dispatch({ type: "signUp" });
      }}
      id="sign-up-modal"
    >
      <Modal.Header>
        <img src={logo} alt="logo" />
        <h2>{t("sign_up_title")}</h2>
        <Button
          type="button"
          data-toggle="modal"
          className="btn-close"
          aria-label="Close"
          onClick={() => {
            dispatch({ type: "signUp" });
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <form onSubmit={formik.handleSubmit} id="sign-up-form">
              <input
                className="p-2"
                id="firstName"
                name="firstName"
                placeholder={t("sign_up_fname_pholder")}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error-msg">{formik.errors.firstName}</div>
              ) : null}
              <input
                className="p-2"
                id="lastName"
                name="lastName"
                placeholder={t("sign_up_lname_pholder")}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error-msg">{formik.errors.lastName}</div>
              ) : null}
              <select
                className="p-2 "
                id="gender"
                name="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
                onBlur={formik.handleBlur}
                required
              >
                <option disabled defaultValue value="">
                  {t("sign_up_gender_pholder")}
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="error-msg">{formik.errors.gender}</div>
              ) : null}
              <select
                className="p-2 flex-fill"
                id="district"
                name="district"
                onChange={formik.handleChange}
                value={formik.values.district}
                onBlur={formik.handleBlur}
                required
              >
                <option disabled defaultValue value="">
                  {t("sign_up_district_pholder")}
                </option>
                {constants.districtList.map((district) => {
                  return (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  );
                })}
              </select>
              {formik.touched.district && formik.errors.district ? (
                <div className="error-msg">{formik.errors.district}</div>
              ) : null}
              <input
                className="p-2"
                id="email"
                name="email"
                type="email"
                placeholder={t("sign_in_email_pholder")}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-msg">{formik.errors.email}</div>
              ) : null}
              <input
                className="p-2"
                id="password"
                name="password"
                type="password"
                placeholder={t("sign_up_password_pholder")}
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-msg">{formik.errors.password}</div>
              ) : null}
              <input
                className="p-2"
                id="repeatedPassword"
                name="repeatedPassword"
                type="password"
                placeholder={t("sign_up_rpassword_pholder")}
                onChange={formik.handleChange}
                value={formik.values.repeatedPassword}
                onBlur={formik.handleBlur}
              />
              {formik.touched.repeatedPassword &&
              formik.errors.repeatedPassword ? (
                <div className="error-msg">
                  {formik.errors.repeatedPassword}
                </div>
              ) : null}
            </form>
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer className="first-sign-up-modal-footer d-flex flex-column align-items-stretch">
        <SignInUpButton
          type="submit"
          disabled={formik.isSubmitting}
          form="sign-up-form"
        >
          {t("sign_up_button")}
        </SignInUpButton>
        <SignInUpGoogleButton type="submit" disabled={formik.isSubmitting}>
          {t("sign_up_google")}
        </SignInUpGoogleButton>
        <SignInUpFacebookButton type="submit" disabled={formik.isSubmitting}>
          {t("sign_up_fbook")}
        </SignInUpFacebookButton>
      </Modal.Footer>
      <Modal.Footer className="second-sign-up-modal-footer d-flex flex-column align-items-center">
        <span>
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              dispatch({ type: "signUp" });
              dispatch({ type: "signIn" });
            }}
          >
            {t("sign_up_have_account_anchor")}
          </a>
        </span>
      </Modal.Footer>
      <Alert
        variant="danger"
        show={signUpAlertState.isOpen}
        onClick={() => setSignUpAlertState(initialSignUpState)}
        dismissible
      >
        {signUpAlertState.message}
      </Alert>
    </Modal>
  );
};

export default SignUpModal;
