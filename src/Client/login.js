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
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Snackbar
} from "@material-ui/core";
import { AccountCircle, Visibility, VisibilityOff, Error } from "@material-ui/icons/";
import "../Server/config.js";
import firebase from "firebase";
import Main from "./main";
import Signup from "./signup";

class login extends Component {
  state = {
    open: false,
    main: false,
    signup: false,
    showPassword: false,
    password: null,
    email: "",
    show: false,
    error: ""
  };

  handleChange = type => e => {
    this.setState({ ...this.state, [type]: e.target.value });
  };

  logIn = () => {
    if (this.state.email === "" || this.state.password === null) {
      this.setState({ error: "No Fields can remain Empty!", show: true });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          var user = firebase.auth().currentUser;
          if (user.displayName === null || !user.emailVerified) {
            firebase
              .auth()
              .currentUser.delete()
              .then(() => {
                this.setState({ error: "You didn't signed up successfully !!", show: true });
              })
              .catch(e => {
                this.setState({ error: e.message, show: true });
              });
          } else {
            this.setState({ main: true });
          }
        })
        .catch(e => {
          this.setState({ error: e.message, show: true });
        });
    }
  };

  resetPassword = () => {
    if (this.state.email === "") {
      this.setState({ error: "This field cannot remain Empty!", show: true });
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(this.state.email)
        .then(() => {
          this.setState({ error: "Check your email", show: true, open: false });
        })
        .catch(e => {
          this.setState({ error: e.message, show: true });
        });
    }
  };

  render() {
    return this.state.main ? (
      <Main />
    ) : this.state.signup ? (
      <Signup />
    ) : (
      <Grid container direction="row">
        <Grid item className="left"></Grid>
        <Grid item className="right">
          <Grid container justify="space-around" alignItems="center" direction="column" className="form">
            <AccountCircle id="icon" />
            {/* Email Field */}
            <TextField
              id="standard-basic"
              label="Email"
              type="email"
              className="input"
              placeholder="Your Email"
              onChange={this.handleChange("email")}
              autoComplete="off"
            />
            {/* Password Field */}
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
                      aria-label="toggle password visibility"
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
            {/* Login Button */}
            <Button variant="contained" color="primary" className="input" onClick={this.logIn}>
              Log in
            </Button>
            {/* Back Button */}
            <Button
              variant="contained"
              className="input"
              onClick={() => {
                this.setState({ main: true });
              }}
            >
              Back
            </Button>
            {/* Links */}
            <a
              onClick={() => {
                this.setState({ open: true });
              }}
            >
              Forgot Password?
            </a>
            <a
              onClick={() => {
                this.setState({ signup: true });
              }}
            >
              Not Yet Registered? Sign Up
            </a>

            <h4>Copyright &copy; 2020 | Design By Shivam Singh</h4>
          </Grid>
        </Grid>
        {/* Passsword Reset Dialog */}
        <Dialog
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false });
          }}
        >
          <DialogTitle id="form-dialog-title">Forgot Password?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your email address below and we will send you information to change your password.
            </DialogContentText>
            <TextField
              label="Email"
              type="email"
              placeholder="Your Account Email"
              fullWidth
              onChange={this.handleChange("email")}
            />
          </DialogContent>
          <br />
          <DialogActions>
            <Button
              onClick={() => {
                this.setState({ open: false });
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            &nbsp;
            <Button color="primary" variant="contained" onClick={this.resetPassword}>
              Reset Password
            </Button>
          </DialogActions>
        </Dialog>
        {/* Snackbar Code */}
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

export default login;
