import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { listenForAuthChanges } from "./slices/userSlice";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./containers/Home";
import Profile from "./containers/Profile";
import Neighbors from "./containers/Neighbors";
import Meet from "./containers/Meet";
import OurTeam from "./containers/OurTeam";
import ContactUs from "./containers/ContactUs";
import FAQ from "./containers/FAQ";

import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";

function App() {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  useEffect(() => {
    dispatch(listenForAuthChanges());
  }, [dispatch]);

  return (
    <Container fluid className="main-wrapper">
      <Router>
        <NavBar />
        {/* Always display it at the top */}
        <SignInModal />
        <SignUpModal />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile/:uid">
            {isSignedIn ? <Profile /> : <Home />}
          </Route>
          <Route path="/neighbors">
            <Neighbors />
          </Route>
          <Route path="/meet">
            <Meet />
          </Route>
          <Route path="/our-team">
            <OurTeam />
          </Route>
          <Route path="/contact-us">
            <ContactUs />
          </Route>
          <Route path="/faq">
            <FAQ />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Container>
  );
}

export default App;
