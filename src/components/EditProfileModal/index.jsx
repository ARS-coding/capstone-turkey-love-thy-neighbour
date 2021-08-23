import React from "react";

import { Modal, Button, Card } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import { useFormik } from "formik";

import { firestore } from "../../firebaseConfig";

import constants from "../../utils/constants";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { SaveChangesButton, DiscardChangesButton } from "../CustomButtons";
import "./index.scss";

const EditProfileModal = () => {
  const dispatch = useDispatch();
  const isEditProfileOpen = useSelector((user) => user.popup.isEditProfileOpen);
  const firestoreDoc = useSelector((state) => state.user.firestoreDoc);
  const uid = useSelector((state) => state.user.authCred?.uid);

  function toggleEditProfileModal() {
    dispatch({ type: "editProfile" });
  }

  // TODO: Add the validation errors for other stuff.
  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    if (!values.district) {
      errors.district = "Required";
    }
    if (!values.gender) {
      errors.gender = "Required";
    }
    if (!values.age) {
      errors.age = "Required";
    }
    if (!values.education) {
      errors.education = "Required";
    }
    if (!values.bio) {
      errors.bio = "Required";
    }
    if (!values.number) {
      errors.number = "Required";
    }
    if (!values.address) {
      errors.address = "Required";
    }
    if (!values.interests) {
      errors.interests = "Required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      firstName: firestoreDoc?.firstName || "",
      lastName: firestoreDoc?.lastName || "",
      district: firestoreDoc?.district || "",
      gender: firestoreDoc?.gender || "",
      age: firestoreDoc?.age || "",
      education: firestoreDoc?.education || "",
      bio: firestoreDoc?.bio || "",
      interests: "Default interest.",
      number: firestoreDoc?.number || "",
      address: firestoreDoc?.address || "",
      profileImageUrl: firestoreDoc?.profileImageUrl || "",
      backgroundImageUrl: firestoreDoc?.backgroundImageUrl || "",
    },
    validate,
    onSubmit: (values) => {
      firestore
        .collection("users")
        .doc(uid)
        .set(values, { merge: true })
        .then(toggleEditProfileModal);
    },
  });

  return (
    <Modal
      show={isEditProfileOpen}
      onHide={toggleEditProfileModal}
      id="edit-profile-modal"
    >
      <Modal.Header className="d-flex justify-content-between">
        <Logo />
        <h2 className="mx-auto">Edit Profile</h2>
        <Button
          type="button"
          data-toggle="modal"
          className="btn-close"
          aria-label="Close"
          onClick={toggleEditProfileModal}
        />
      </Modal.Header>

      <Modal.Body>
        <Card className="form-cards">
          <Card.Body>
            <form onSubmit={formik.handleSubmit} id="edit-profile-form">
              <div className="d-flex flex-column justify-content-between align-items-stretch">
                <input
                  className="p-2 flex-fill"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="error-msg">{formik.errors.firstName}</div>
                ) : null}
              </div>
              <div className="d-flex flex-column justify-content-between align-items-stretch">
                <input
                  className="p-2 flex-fill"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="error-msg">{formik.errors.lastName}</div>
                ) : null}
              </div>
              <div className="d-flex flex-column justify-content-between align-items-stretch">
                <select
                  className="p-2 flex-fill"
                  id="district"
                  name="district"
                  onChange={formik.handleChange}
                  value={formik.values.district}
                  onBlur={formik.handleBlur}
                >
                  <option disabled value="">
                    Districts
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
              </div>

              <div className="gender-age-wrapper d-flex">
                <div className="d-flex flex-column">
                  <select
                    className="p-2"
                    name="gender"
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                    onBlur={formik.handleBlur}
                  >
                    <option disabled value="">
                      Select your Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female </option>
                    <option value="other">Prefer not to say</option>
                  </select>

                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="error-msg">{formik.errors.gender}</div>
                  ) : null}
                </div>
                <div className="d-flex flex-column">
                  <input
                    className="p-2"
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Enter your Age"
                    min="15"
                    max="99"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.age && formik.errors.age ? (
                    <div className="error-msg">{formik.errors.age}</div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-stretch">
                <select
                  className="p-2 flex-fill"
                  id="education"
                  name="education"
                  onChange={formik.handleChange}
                  value={formik.values.education}
                  onBlur={formik.handleBlur}
                >
                  <option disabled value="">
                    Select your Education
                  </option>
                  {constants.educationList.map((education) => {
                    return (
                      <option key={education} value={education}>
                        {education}
                      </option>
                    );
                  })}
                </select>
                {formik.touched.education && formik.errors.education ? (
                  <div className="error-msg">{formik.errors.education}</div>
                ) : null}
              </div>
              <div className="d-flex flex-column justify-content-between align-items-stretch">
                <textarea
                  className="p-2 flex-fill"
                  id="bio"
                  name="bio"
                  placeholder="Your bio..."
                  onChange={formik.handleChange}
                  value={formik.values.bio}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.bio && formik.errors.bio ? (
                  <div className="error-msg">{formik.errors.bio}</div>
                ) : null}
              </div>
              <div className="d-flex flex-column justify-content-between align-items-stretch">
                <select
                  className="p-2 flex-fill"
                  id="interests"
                  name="interests"
                  onChange={formik.handleChange}
                  value={formik.values.interests}
                  onBlur={formik.handleBlur}
                >
                  <option disabled value="">
                    Select Your Interests
                  </option>
                  {constants.activityList.map((activity) => {
                    return (
                      <option key={activity} value={activity}>
                        {activity}
                      </option>
                    );
                  })}
                </select>
                {formik.touched.interests && formik.errors.interests ? (
                  <div className="error-msg">{formik.errors.interests}</div>
                ) : null}
              </div>
              <div className="d-flex flex-column justify-content-between align-items-stretch">
                <input
                  className="p-2 flex-fill"
                  id="number"
                  name="number"
                  type="tel"
                  placeholder="Number"
                  onChange={formik.handleChange}
                  value={formik.values.number}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.number && formik.errors.number ? (
                  <div className="error-msg">{formik.errors.number}</div>
                ) : null}
              </div>
              <div className="d-flex flex-column justify-content-between align-items-stretch">
                <input
                  className="p-2 flex-fill"
                  id="address"
                  name="address"
                  placeholder="Write your Address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="error-msg">{formik.errors.address}</div>
                ) : null}
              </div>
              <div className="d-flex flex-column justify-content-between align-items-stretch">
                <input
                  className="p-2 flex-fill"
                  id="profileImageUrl"
                  name="profileImageUrl"
                  type="url"
                  placeholder="Profile Image URL"
                  onChange={formik.handleChange}
                  value={formik.values.profileImageUrl}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.profileImageUrl &&
                formik.errors.profileImageUrl ? (
                  <div className="error-msg">
                    {formik.errors.profileImageUrl}
                  </div>
                ) : null}
              </div>
              <div className="d-flex flex-column justify-content-between align-items-stretch">
                <input
                  className="p-2 flex-fill"
                  id="backgroundImageUrl"
                  name="backgroundImageUrl"
                  type="url"
                  placeholder="Background Image URL"
                  onChange={formik.handleChange}
                  value={formik.values.backgroundImageUrl}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.backgroundImageUrl &&
                formik.errors.backgroundImageUrl ? (
                  <div className="error-msg">
                    {formik.errors.backgroundImageUrl}
                  </div>
                ) : null}
              </div>
            </form>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <SaveChangesButton type="submit" form="edit-profile-form">
          Save Changes
        </SaveChangesButton>
        <DiscardChangesButton onClick={toggleEditProfileModal}>
          Discard Changes
        </DiscardChangesButton>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;