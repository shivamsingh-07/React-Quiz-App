import React, { Component } from "react";
import { Grid, Modal, Button, Divider } from "@material-ui/core/";
import { Star } from "@material-ui/icons/";
import "./style.css";
import "../Server/config.js";
import Particles from "./particles.js";
import Login from "./login";
import Signup from "./signup";
import firebase from "firebase";
import Dashboard from "./dashboard";

class main extends Component {
  state = {
    open: false,
    login: false,
    signup: false,
    isSignedIn: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isSignedIn: true });
      } else {
        this.setState({ isSignedIn: false });
      }
    });
  }

  render() {
    return this.state.login ? (
      <Login />
    ) : this.state.signup ? (
      <Signup />
    ) : this.state.isSignedIn ? (
      <Dashboard />
    ) : (
      <Grid container className="back" justify="center" alignItems="center">
        <Particles />
        <Grid
          container
          className="content"
          justify="center"
          alignItems="center"
          direction="column"
          style={{ width: "100vw" }}
        >
          <ul>
            <li
              onClick={() => {
                this.setState({ login: true });
              }}
            >
              <a>Login</a>
            </li>
            <li
              onClick={() => {
                this.setState({ signup: true });
              }}
            >
              <a>Sign Up</a>
            </li>
          </ul>

          <h1>Hail Storm</h1>

          <a
            className="info"
            onClick={() => {
              this.setState({ open: true });
            }}
          >
            Know More
          </a>
        </Grid>
        {/* Info Modal */}
        <Modal
          open={this.state.open}
          onClose={() => {
            this.setState({ open: true });
          }}
          className="dialog"
        >
          <Grid
            container
            id="simple-modal-description"
            direction="column"
            justify="center"
            alignItems="center"
            className="modal"
          >
            <h2>About This Quiz</h2>
            <Divider style={{ width: "10%", height: "3px", backgroundColor: "black" }} />
            <br />
            <p style={{ textAlign: "justify" }}>
              <b>
                <i>Hail Storm </i>
              </b>
              is a short quiz having 20 MCQ based questions on general topics like Games, Cartoons, TV Series,
              Movies and Technology.
            </p>
            <br />
            <Star fontSize="large" />
            <br />
            <h3>Overview</h3>
            <p style={{ textAlign: "justify", width: "90%" }}>
              <ol type="1">
                <li>There are 20 questions in total.</li>
                <li>
                  Each question carries <b>5 Points</b>.
                </li>
                <li>There will be 3 choices from which only 1 choice will be Correct.</li>
                <li>
                  <b>6 Seconds</b> is alloted to every question.
                </li>
                <li>
                  If player failed to respond before 6 seconds, the question will skip and next question will
                  appear.
                </li>
              </ol>
            </p>
            <br />
            <h3>Good Luck!</h3>
            <br />
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                this.setState({ open: false });
              }}
            >
              Close
            </Button>
          </Grid>
        </Modal>
      </Grid>
    );
  }
}

export default main;
