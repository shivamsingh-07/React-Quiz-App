import React, { Component } from "react";
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button
} from "@material-ui/core/";
import { Menu, Dashboard, Person, ExitToApp } from "@material-ui/icons/";
import firebase from "firebase";
import Main from "./main";
import Quiz from "../Server/quiz";
import Background from "react-background-slideshow";
import img1 from "../Server/img/pubg.jpg";
import img2 from "../Server/img/aco.jpg";
import img3 from "../Server/img/acs.jpg";
import img4 from "../Server/img/cod.jpg";
import img5 from "../Server/img/fc5.jpg";
import img6 from "../Server/img/gta5.jpg";
import img7 from "../Server/img/pubg2.jpg";
import img8 from "../Server/img/tcgrw.jpg";
import img9 from "../Server/img/wd2.jpg";
import img10 from "../Server/img/fh3.jpg";
// Jan 20, 2020 23:00:00
// Dec 23, 2019 20:35:00
var ID = 0,
  points = 0,
  ques = 0,
  distance,
  rank = 1;
var countDownDate = new Date("Jan 30, 2020 22:55:00").getTime();

class dashboard extends Component {
  state = {
    main: false,
    anchor: null,
    show: false,
    dashboard: true,
    account: false,
    leader: false,
    result: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    DOB: "",
    quiz: false
  };

  componentDidMount() {
    firebase
      .database()
      .ref("Player/" + firebase.auth().currentUser.displayName + " - " + firebase.auth().currentUser.uid)
      .on("value", snap => {
        points = snap.val().Points;
        ques = snap.val().Question;
        this.setState({ DOB: snap.val().DOB });
      });

    ID = setInterval(() => {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      this.setState({
        days:
          Math.floor(distance / (1000 * 60 * 60 * 24)) < 0
            ? "0"
            : Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours:
          Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 0
            ? "0"
            : Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes:
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) < 0
            ? "0"
            : Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds:
          Math.floor((distance % (1000 * 60)) / 1000) < 0 ? "0" : Math.floor((distance % (1000 * 60)) / 1000)
      });

      // If the count down is finished
      if (distance <= 0) {
        clearInterval(ID);
        ID = 0;
        if (Math.floor((distance % (1000 * 60)) / 1000) < -10 && (ques <= 1 || ques >= 21)) {
          this.setState({ quiz: false, result: true, dashboard: false });
        } else {
          this.setState({ quiz: true });
        }
      }
    }, 1000);
  }

  getScores = () => {
    var node = document.getElementById("data");
    var first = node.firstChild;

    while (first) {
      first.remove();
      first = node.firstChild;
    }

    rank = 1;

    firebase
      .database()
      .ref("Player")
      .orderByChild("Points")
      .on("value", snap => {
        snap.forEach(item => {
          var node = document.getElementById("data");
          var row = document.createElement("tr");
          row.innerHTML = `<td>${rank++}</td>
                           <td>${item.val().Username}</td>
                           <td>${item.val().Points * -1}</td>`;
          node.appendChild(row);
        });
      });
  };

  render() {
    return this.state.main ? (
      <Main />
    ) : this.state.quiz ? (
      <Quiz />
    ) : (
      <Grid>
        <Background
          images={[img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]}
          disableClick="true"
          animationDelay="1000"
        />

        <AppBar position="sticky" color="primary">
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <Menu
                onClick={() => {
                  this.setState({ show: true });
                }}
              />
              <Drawer
                open={this.state.show}
                onClose={() => {
                  this.setState({ show: false });
                }}
              >
                <Grid item className="drawer">
                  <List>
                    <ListItem style={{ pointerEvents: "none" }}>
                      <a style={{ fontSize: "20px" }}>Welcome, {firebase.auth().currentUser.displayName}</a>
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        this.setState({ leader: false, account: false, show: false });
                        if (distance <= 0) {
                          this.setState({ result: true });
                        } else {
                          this.setState({ dashboard: true });
                        }
                      }}
                    >
                      <ListItemIcon>
                        <Dashboard />
                      </ListItemIcon>
                      <ListItemText>Dashboard</ListItemText>
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        this.setState({
                          leader: false,
                          account: true,
                          dashboard: false,
                          show: false,
                          result: false
                        });
                      }}
                    >
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText>My Account</ListItemText>
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        firebase
                          .auth()
                          .signOut()
                          .then(() => {
                            this.setState({ main: true });
                          });
                      }}
                    >
                      <ListItemIcon>
                        <ExitToApp />
                      </ListItemIcon>
                      <ListItemText>Log Out</ListItemText>
                    </ListItem>
                  </List>
                </Grid>
              </Drawer>
            </IconButton>
            <Grid container justify="center" className="hello" sm={12}>
              <p id="title">Hail Storm</p>
            </Grid>
            <Grid container justify="flex-end" className="world" sm={1}>
              <Avatar id="avatar">
                {firebase
                  .auth()
                  .currentUser.displayName.substr(0, 1)
                  .toUpperCase()}
              </Avatar>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid container className="background" justify="center" alignItems="center">
          {/* Dashboard Grid */}
          <Grid item style={{ display: this.state.dashboard ? "block" : "none" }} className="display">
            <h1>Countdown to Quiz</h1>
            <br />
            <h2>
              {this.state.days} Days {this.state.hours} Hours {this.state.minutes} Minutes{" "}
              {this.state.seconds} Seconds
            </h2>
          </Grid>

          {/* Leaderboard Grid */}
          <Grid item style={{ display: this.state.leader ? "block" : "none" }} className="display">
            <h1>Leaderboard</h1>
            <br />
            <div id="table">
              <table>
                <thead id="head">
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Points Scored</th>
                  </tr>
                </thead>
                <tbody id="data"></tbody>
              </table>
            </div>
          </Grid>

          {/* Account Grid */}
          <Grid item style={{ display: this.state.account ? "block" : "none" }} className="display">
            <h1>My Details</h1>
            <br /> <br />
            <div style={{ textAlign: "justify", width: "80%" }}>
              <h2>Name : {firebase.auth().currentUser.displayName}</h2>
              <h2>Email : {firebase.auth().currentUser.email}</h2>
              <h2>DOB : {this.state.DOB}</h2>
            </div>
          </Grid>

          {/* Result Grid */}
          <Grid item style={{ display: this.state.result ? "block" : "none" }} className="display">
            <h1 style={{ fontFamily: "Pacifico,cursive" }}>
              Congratulations, {firebase.auth().currentUser.displayName}
            </h1>
            <h2 style={{ fontFamily: "Pacifico,cursive" }}>Quiz Completed!</h2>
            <br />
            <h2>Your Score : {points * -1}</h2>
            <br />
            <Button
              variant="outlined"
              onClick={() => {
                this.setState({
                  leader: true,
                  account: false,
                  dashboard: false,
                  show: false,
                  result: false
                });
                this.getScores();
              }}
            >
              View Leaderboard
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default dashboard;
