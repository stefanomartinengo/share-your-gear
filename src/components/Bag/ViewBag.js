import React, { Component } from "react";
import axios from "axios";
import { getUserInfo } from "./../../ducks/reducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./viewBag.css";
import Header from "./../../Header";
import deletex from "./../../assets/x vector.png";
export class ViewBag extends Component {
  constructor() {
    super();

    this.state = {
      inventory: [],
      rentedGear: []
    };
  }

  getBag() {
    axios.get(`/view/bag/${this.props.user.userid}`).then(response => {
      this.setState({
        inventory: response.data
      });
    });
  }

  componentDidMount() {
    this.props.getUserInfo();
    this.getBag();
  }

  deleteGear(id) {
    console.log('itemid', id);
    axios
      .delete(
        `/delete/gear`,
        {
          data: {
            owner_id: this.props.user.userid,
            itemid: id
          }
        },
        alert("Item Deleted")
      )
      .then(res => {
        this.getBag();
      });
  }

  render() {
    var mapGear = this.state.inventory.map((e, i, arr) => {
      console.log(e);
      if (e.rented === false) {
        return (
          <div key = {e.itemid} className="not-rented">
            <Link className="not-rented" key={i} to={`/details/${e.itemid}`}>
              <img alt="" src={e.image_url[0]} />
              <div className="center">
                <div className="bagitemname">{e.item_name}</div>
                <div className="descriptionbag">{e.item_description}</div>
              </div>
              <Link to={'/bag/view'}>
                <img  className="imggg" src={deletex} alt="remove" 
                      onClick={() => this.deleteGear(e.itemid)}/>{" "}
                </Link>
            </Link>
          </div>
        );
      } else {
        return (
          <div key={e.itemid} className="rented">
            <Link to={`/details/${e.itemid}`}>
              {" "}
              <img alt="" src={e.image_url[0]} />
              <div className="rentcontainer">
                <div className="rentedtext">
                  {" "}
                  <p>RENTED</p>{" "}
                </div>

                <div className="center">
                  <div className="bagitemname">{e.item_name}</div>
                  <div className="descriptionbag">{e.item_description}</div>
                </div>
                <div className="buffer" />
              </div>
                <Link to={'/bag/view'} className = 'rented'>
                <img  className="imggg" src={deletex} alt="remove" 
                      onClick={() => this.deleteGear(e.itemid)}/> </Link>{" "}
            </Link>
          </div>
        );
      }
    });
    console.log(this.state.inventory);
    return (
      <div className="bag-container">
        <Header title="VIEW YOUR SAC" />
        {!this.props.user.userid ? (
          <h1>
            {" "}
            Please <Link to="/">sign in </Link> to view your sac{" "}
          </h1>
        ) : null}
        <div className="bag">{mapGear}</div>

        <div />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getUserInfo })(ViewBag);
