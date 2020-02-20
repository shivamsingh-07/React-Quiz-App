import React, { Component } from "react";
import { Grid, Avatar, Backdrop } from "@material-ui/core/";
import Dashboard from "../Client/dashboard";
import "./quiz.css";
import "../Client/style.css";
import firebase from "firebase";
import Background from "react-background-slideshow";
import img1 from "./img/pubg.jpg";
import img2 from "./img/aco.jpg";
import img3 from "./img/acs.jpg";
import img4 from "./img/cod.jpg";
import img5 from "./img/fc5.jpg";
import img6 from "./img/gta5.jpg";
import img7 from "./img/pubg2.jpg";
import img8 from "./img/tcgrw.jpg";
import img9 from "./img/wd2.jpg";
import img10 from "./img/fh3.jpg";

var ID = 0,
  i,
  points = 0,
  response = [];

class quiz extends Component {
  state = {
    time: 0,
    on: false,
    dashboard: false
  };

  componentDidMount = () => {
    firebase
      .database()
      .ref("Player/" + firebase.auth().currentUser.displayName + " - " + firebase.auth().currentUser.uid)
      .on("value", snap => {
        i = snap.val().Question;
        points = snap.val().Points;
      });

    this.blackout();
  };

  blackout = () => {
    this.setState({ on: true });
    ID = setTimeout(() => {
      this.setState({ on: false });
      clearTimeout(ID);
      ID = 0;
      this.change(i);
      if (i <= 20) this.countdown();
      i++;
    }, 3000);
  };

  change = index => {
    if (index <= 20) {
      document.getElementById(index - 1).style.display = "none";
      document.getElementById(index).style.display = "block";
    }

    if (index > 20) {
      console.log("working");
      this.setState({ dashboard: true });
    }

    console.log("2");
    this.update(index);
  };

  countdown = () => {
    this.setState({ time: 6 });
    ID = setInterval(() => {
      if (this.state.time > 0) {
        this.setState({ time: this.state.time - 1 });
      } else {
        clearInterval(ID);
        ID = 0;
        this.blackout();
      }
    }, 1000);
  };

  update = x => {
    console.log("3");
    firebase
      .database()
      .ref(
        "Player/" + firebase.auth().currentUser.displayName + " - " + firebase.auth().currentUser.uid + "/"
      )
      .update({
        Points: points,
        Question: x,
        Responses: response
      });
  };

  render() {
    return this.state.dashboard ? (
      <Dashboard />
    ) : (
      <Grid>
        <Background
          images={[img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]}
          disableClick="true"
          animationDelay="1000"
        />
        <Grid container className="background" justify="center" alignItems="center">
          <Grid item className="ques">
            <Avatar id="countdown">{this.state.time}</Avatar>
            <br /> <br />
            <Grid id="0"></Grid>
            {/* Question 1 */}
            <Grid id="1" style={{ display: "none" }}>
              <h1>Question 1</h1>
              <br />
              <h2>Name the "smallest" alien of Ben 10's omnitrix ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[0] = 1;
                  }}
                >
                  <h4>Nanomech</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[0] = 2;
                  }}
                >
                  <h4>Grey Matter</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[0] = 3;
                  }}
                >
                  <h4>Wildmutt</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 2 */}
            <Grid id="2" style={{ display: "none" }}>
              <h1>Question 2</h1>
              <br />
              <h2>"Doraemon" came from which century ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[1] = 1;
                  }}
                >
                  <h4>23rd Century</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[1] = 2;
                  }}
                >
                  <h4>22nd Century</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[1] = 3;
                  }}
                >
                  <h4>21st Century</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 3 */}
            <Grid id="3" style={{ display: "none" }}>
              <h1>Question 3</h1>
              <br />
              <h2>In the cartoon "Richie Rich", Name of Richie Rich's "Butler" ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[2] = 1;
                  }}
                >
                  <h4>Niel Tolkin</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[2] = 2;
                  }}
                >
                  <h4>Herbert Cadbury</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[2] = 3;
                  }}
                >
                  <h4>Alfred Harvey</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 4 */}
            <Grid id="4" style={{ display: "none" }}>
              <h1>Question 4</h1>
              <br />
              <h2>"DP-28" comes under which category ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[3] = 1;
                  }}
                >
                  <h4>Light Machine Gun</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[3] = 2;
                  }}
                >
                  <h4>Sub Machine Gun</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[3] = 3;
                  }}
                >
                  <h4>Marksman Rifle</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 5 */}
            <Grid id="5" style={{ display: "none" }}>
              <h1>Question 5</h1>
              <br />
              <h2>Company that developed the "Call of Duty" series ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[4] = 1;
                  }}
                >
                  <h4>Ubisoft</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[4] = 2;
                  }}
                >
                  <h4>Rebellion</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[4] = 3;
                  }}
                >
                  <h4>Activision</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 6 */}
            <Grid id="6" style={{ display: "none" }}>
              <h1>Question 6</h1>
              <br />
              <h2>Full name of "8x" scope ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[5] = 1;
                  }}
                >
                  <h4>8x ACOG</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[5] = 2;
                  }}
                >
                  <h4>8x CQBSS</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[5] = 3;
                  }}
                >
                  <h4>8x Aimpoint</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 7 */}
            <Grid id="7" style={{ display: "none" }}>
              <h1>Question 7</h1>
              <br />
              <h2>How many "Main Story" characters are there in GTA 5 ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[6] = 1;
                  }}
                >
                  <h4>2</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[6] = 2;
                  }}
                >
                  <h4>1</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[6] = 3;
                  }}
                >
                  <h4>3</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 8 */}
            <Grid id="8" style={{ display: "none" }}>
              <h1>Question 8</h1>
              <br />
              <h2>Types of bullet used in AWM sniper rifle ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[7] = 1;
                  }}
                >
                  <h4>.300 Magnum</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[7] = 2;
                  }}
                >
                  <h4>.500 Magnum</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[7] = 3;
                  }}
                >
                  <h4>.700 Magnum</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 9 */}
            <Grid id="9" style={{ display: "none" }}>
              <h1>Question 9</h1>
              <br />
              <h2>Origin, a game distribution platform is developed by ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[8] = 1;
                  }}
                >
                  <h4>Rockstar Games</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[8] = 2;
                  }}
                >
                  <h4>Rebellion</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[8] = 3;
                  }}
                >
                  <h4>Electronic Arts</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 10 */}
            <Grid id="10" style={{ display: "none" }}>
              <h1>Question 10</h1>
              <br />
              <h2>Which game was first released ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[9] = 1;
                  }}
                >
                  <h4>Battlefield 2</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[9] = 2;
                  }}
                >
                  <h4>Battlefield 1</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[9] = 3;
                  }}
                >
                  <h4>Battlefield 4</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 11 */}
            <Grid id="11" style={{ display: "none" }}>
              <h1>Question 11</h1>
              <br />
              <h2>Name of the child who goes missing in the series "Stranger Things" ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[10] = 1;
                  }}
                >
                  <h4>Lucas Sinclair</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[10] = 2;
                  }}
                >
                  <h4>Mike Wheeler</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[10] = 3;
                  }}
                >
                  <h4>Will Byers</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 12 */}
            <Grid id="12" style={{ display: "none" }}>
              <h1>Question 12</h1>
              <br />
              <h2>What was the profession of "Walter White" in the series "Breaking Bad"?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[11] = 1;
                  }}
                >
                  <h4>Drug Smuggler</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[11] = 2;
                  }}
                >
                  <h4>Teacher</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[11] = 3;
                  }}
                >
                  <h4>Doctor</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 13 */}
            <Grid id="13" style={{ display: "none" }}>
              <h1>Question 13</h1>
              <br />
              <h2>Which bank did "The Professor" robbed in the series "Money Hiest" ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[12] = 1;
                  }}
                >
                  <h4>Bank of Washington</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[12] = 2;
                  }}
                >
                  <h4>Bank of Berlin</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[12] = 3;
                  }}
                >
                  <h4>Bank of Spain</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 14 */}
            <Grid id="14" style={{ display: "none" }}>
              <h1>Question 14</h1>
              <br />
              <h2>How many seasons of the series "F.R.I.E.N.D.S" are released till now ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[13] = 1;
                  }}
                >
                  <h4>10</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[13] = 2;
                  }}
                >
                  <h4>9</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[13] = 3;
                  }}
                >
                  <h4>12</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 15 */}
            <Grid id="15" style={{ display: "none" }}>
              <h1>Question 15</h1>
              <br />
              <h2>Who played as "The Billionaire" in the movie "6 Underground" ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[14] = 1;
                  }}
                >
                  <h4>Michael Bay</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[14] = 2;
                  }}
                >
                  <h4>Ryan Reynolds</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[14] = 3;
                  }}
                >
                  <h4>David Ellison</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 16 */}
            <Grid id="16" style={{ display: "none" }}>
              <h1>Question 16</h1>
              <br />
              <h2>What is the name of the latest upcomming movie of "James Bond" ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[15] = 1;
                  }}
                >
                  <h4>No Time To Die</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[15] = 2;
                  }}
                >
                  <h4>Skyfall</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[15] = 3;
                  }}
                >
                  <h4>Licence to Kill</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 17 */}
            <Grid id="17" style={{ display: "none" }}>
              <h1>Question 17</h1>
              <br />
              <h2>Who is the current CEO of "Apple" ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[16] = 1;
                  }}
                >
                  <h4>Rob Jobs</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[16] = 2;
                  }}
                >
                  <h4>Jony Ivy</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[16] = 3;
                  }}
                >
                  <h4>Tim Cook</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 18 */}
            <Grid id="18" style={{ display: "none" }}>
              <h1>Question 18</h1>
              <br />
              <h2>What is the name of Windows 10's "Virtual Assistant" ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[17] = 1;
                  }}
                >
                  <h4>Cortana</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[17] = 2;
                  }}
                >
                  <h4>Alexa</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[17] = 3;
                  }}
                >
                  <h4>Bixby</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 19 */}
            <Grid id="19" style={{ display: "none" }}>
              <h1>Question 19</h1>
              <br />
              <h2>Name of the software in which "PUBG" was build ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[18] = 1;
                  }}
                >
                  <h4>Unity</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[18] = 2;
                  }}
                >
                  <h4>Blender</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[18] = 3;
                  }}
                >
                  <h4>Unreal Engine</h4>
                </li>
              </ol>
            </Grid>
            {/* Question 20 */}
            <Grid id="20" style={{ display: "none" }}>
              <h1>Question 20</h1>
              <br />
              <h2>Name of the latest version of "Mac OS" ?</h2>
              <br />
              <ol className="ans">
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[19] = 1;
                  }}
                >
                  <h4>Mac OS Mojave</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    response[19] = 2;
                  }}
                >
                  <h4>Mac OS El Capitan</h4>
                </li>
                <li
                  onClick={() => {
                    clearInterval(ID);
                    ID = 0;
                    this.blackout();
                    points -= 5;
                    response[19] = 3;
                  }}
                >
                  <h4>Mac OS Catalina</h4>
                </li>
              </ol>
            </Grid>
          </Grid>
        </Grid>
        <Backdrop open={this.state.on} style={{ zIndex: "500", backdropFilter: "blur(10px)" }}>
          <Grid className="ripple"></Grid>
        </Backdrop>
      </Grid>
    );
  }
}

export default quiz;
