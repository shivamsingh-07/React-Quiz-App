import React, { Component } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  InputLabel,
  FormControl,
  Input,
  IconButton,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Avatar,
  Snackbar
} from "@material-ui/core";
import { Visibility, VisibilityOff, Error } from "@material-ui/icons/";
import "../Server/config.js";
import firebase from "firebase";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Main from "./main";
import Login from "./login";

var ID = null;

class signup extends Component {
  state = {
    main: false,
    login: false,
    activeStep: 0,
    showPassword: false,
    name: "",
    password: null,
    email: "",
    selectedDate: null,
    error: "",
    show: false
  };

  handleChange = type => e => {
    this.setState({ ...this.state, [type]: e.target.value });
  };

  createAccount = () => {
    if (this.state.email === "" || this.state.password === null) {
      this.setState({ error: "No Fields can remain Empty!", show: true });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(() => {
              this.setState({ activeStep: 1 });
              ID = setInterval(() => {
                firebase
                  .auth()
                  .currentUser.reload()
                  .then(() => {
                    if (firebase.auth().currentUser.emailVerified) {
                      clearInterval(ID);
                      ID = null;
                      this.setState({ activeStep: 2 });
                    }
                  });
              }, 1000);
            })
            .catch(e => {
              this.setState({ error: e.message, show: true });
            });
        })
        .catch(e => {
          this.setState({ error: e.message, show: true });
        });
    }
  };

  signUp = () => {
    var user = firebase.auth().currentUser;
    if (this.state.name === "" || this.state.selectedDate === null) {
      this.setState({ error: "No Fields can remain Empty!", show: true });
    } else {
      user.updateProfile({
        displayName: this.state.name
      });

      firebase
        .database()
        .ref("Player/" + this.state.name + " - " + user.uid + "/")
        .set({
          DOB:
            new Date(this.state.selectedDate).getDate() +
            "-" +
            (new Date(this.state.selectedDate).getMonth() + 1) +
            "-" +
            new Date(this.state.selectedDate).getFullYear(),
          Email: this.state.email,
          Points: 0,
          Question: 1,
          Username: this.state.name
        });

      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setState({ activeStep: 3, error: "You are now Successfully Registered.", show: true });
          ID = setTimeout(() => {
            clearTimeout(ID);
            ID = null;
            this.setState({ main: true });
          }, 3000);
        })
        .catch(e => {
          this.setState({ error: e.message, show: true });
        });
    }
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Grid container justify="center" alignItems="center" direction="column" className="panel">
            <form autoComplete="off">
              <TextField
                id="standard-basic"
                label="Email"
                className="input"
                placeholder="Your Email"
                onChange={this.handleChange("email")}
              />
              <br /> <br />
              <FormControl className="input">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  placeholder="Your Password"
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.password}
                  onChange={this.handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          this.setState({
                            showPassword: !this.state.showPassword
                          });
                        }}
                        onMouseDown={event => {
                          event.preventDefault();
                        }}
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <br /> <br /> <br />
              <Button variant="contained" color="primary" className="input" onClick={this.createAccount}>
                Create Account
              </Button>
              <br /> <br />
              <Button
                variant="contained"
                className="input"
                onClick={() => {
                  this.setState({ main: true });
                }}
              >
                Back
              </Button>
              <br /> <br />
              <a
                onClick={() => {
                  this.setState({ login: true });
                }}
              >
                Already Registered? Log In
              </a>
              <br /> <br />
            </form>
          </Grid>
        );
      case 1:
        return (
          <Grid container alignItems="center">
            <br />
            <p>An email has been send to your email for verification.</p>
            <br /> <br />
          </Grid>
        );
      case 2:
        return (
          <Grid container justify="center" alignItems="center" direction="column" className="panel">
            <form autoComplete="off">
              <Grid container justify="center" alignItems="center">
                <Avatar id="profile">{this.state.name.substr(0, 1).toUpperCase()}</Avatar>
              </Grid>
              <br />
              <TextField
                label="Name"
                className="input"
                onChange={this.handleChange("name")}
                placeholder="Your Full Name"
                className="input"
              />
              <br /> <br />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    className="input"
                    label="Date of Birth"
                    format="dd-MM-yyyy"
                    value={this.state.selectedDate}
                    onChange={date => {
                      this.setState({
                        selectedDate: new Date(date)
                      });
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <br /> <br />
              <Button variant="contained" color="primary" className="input" onClick={this.signUp}>
                Sign Up
              </Button>
              <br /> <br />
            </form>
          </Grid>
        );
      default:
        return (
          <Grid>
            <h1>Error Occured</h1>
          </Grid>
        );
    }
  };

  render() {
    return this.state.main ? (
      <Main />
    ) : this.state.login ? (
      <Login />
    ) : (
      <Grid container className="container" justify="center" alignItems="center" direction="column">
        <Grid item className="signup">
          <Stepper activeStep={this.state.activeStep} orientation="vertical" className="step">
            {["Create Account", "Verify Email Address", "Add Personal Details"].map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <p>{this.getStepContent(index)}</p>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.show}
          autoHideDuration={3000}
          onClose={() => {
            this.setState({ show: false });
          }}
          message={
            <Grid container alignItems="center" justify="center">
              <Error />
              &nbsp;&nbsp;
              <Grid item>{this.state.error}</Grid>
            </Grid>
          }
        />
      </Grid>
    );
  }
}

export default signup;
