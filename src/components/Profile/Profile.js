import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserInfo } from "./../../ducks/reducer";
import Header from "./../../Header";

import "./Profile.css";

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      wannado: [],
      can_do: [],
      pageToggle: false
    };
    this.editPageToggle = this.editPageToggle.bind(this);
    this.toggleEditButton = this.toggleEditButton.bind(this);
  }

  componentDidMount() {
    this.props.getUserInfo().then(() => {
      this.setState({
        wannado: this.props.user.outdoorwannados,
        can_do: this.props.user.outdoordos
      });
      this.refs.first_name.value = this.props.user.first_name;
      this.refs.last_name.value = this.props.user.last_name;
      this.refs.aboutme.value = this.props.user.aboutme;
    });
  }

  editPageToggle() {
    this.setState({ pageToggle: !this.state.pageToggle });
  }

  toggleEditButton() {
    if (!this.state.pageToggle) {
      return (
        <button
          className="uh"
          onClick={() => {
            this.editPageToggle();
          }}
        >
          EDIT
        </button>
      );
    } else {
      return (
        <button
          className="uh"
          onClick={() => {
            this.editPageToggle();
          }}
        >
          SAVE
        </button>
      );
    }
  }
  render() {
    var can_do = this.state.can_do.map((e, i, arr) => {
      return (
        <textarea
          disabled={this.state.pageToggle ? false : true}
          className="thingswedo"
          key={e}
          value={e}
        />
      );
    });
    var wannado = this.state.wannado.map((e, i, arr) => {
      return (
        <textarea
          disabled={this.state.pageToggle ? false : true}
          className="thingswedo"
          key={e}
          value={e}
        />
      );
    });
    return (
      <div className="profile-container">
        <Header title="PROFILE" />
        <div className="profilepic">
          <img src={this.props.user.picture} alt="" />
        </div>
        <div className="button-container">
          <div className="button-container-child">
            <div className="user-info">
              <div className="nameprofile">
                <textarea
                  disabled={this.state.pageToggle ? false : true}
                  ref="first_name"
                />
                <textarea
                  ref="last_name"
                  disabled={this.state.pageToggle ? false : true}
                />
              </div>
              <h1> ABOUT </h1>
              <div className="aboutme">
                <textarea
                  className="name"
                  disabled={this.state.pageToggle ? false : true}
                  ref="aboutme"
                />
              </div>

              <div className="thingstodo">
                <div>
                  {" "}
                  <h1> Things I do: </h1>
                  <div className="list-dos">{can_do}</div>
                </div>
                <div>
                  <h1> Things I want to do: </h1>
                  <div className="list-dos">{wannado}</div>
                </div>
              </div>
              {this.toggleEditButton()}
            </div>
            <a href={process.env.REACT_APP_LOGOUT}>
              <button> LOGOUT </button>{" "}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getUserInfo })(Profile);
