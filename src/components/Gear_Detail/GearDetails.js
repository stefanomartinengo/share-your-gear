import React, { Component } from "react";
import "./GearDetails.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo } from "./../../ducks/reducer";
import axios from "axios";
import Header from "./../../Header";

export class GearDetails extends Component {
constructor() {
super();
this.state = {
    itemDetails: [{}],
    images: [],
    date: ""
};
this.sendRequest = this.sendRequest.bind(this);
this.backButton = this.backButton.bind(this);
}

componentDidMount() {
axios.get(`/get/details/${this.props.match.params.id}`).then(response => {
    this.setState({
    itemDetails: response.data,
    images: response.data[0].image_url
    });
});
}

sendMessage() {
function addZero(i) {
    if (i < 10) {
    i = "0" + i;
    }
    return i;
}

let dateStamp = new Date();
let month = dateStamp.getMonth();
let day = dateStamp.getDay();
let year = dateStamp.getFullYear();
let hour = dateStamp.getHours();
let minutes = addZero(dateStamp.getMinutes());
let timeStamp = `${month}/${day}/${year} || ${hour}:${minutes}`;
if (this.refs.message.value.length > 0) {
    axios.post("/send/message/", {
    senderid: +this.props.user.userid,
    receiverid: +this.state.itemDetails[0].owner_id,
    message: this.refs.message.value,
    item: this.state.itemDetails[0].item_name,
    date: timeStamp
    });
    alert("Message Sent");
    this.refs.message.value = "";
} else {
    alert("Please include message");
    }
}

sendRequest() {
if (this.refs.message.value.length > 0) {
    axios
    .post(`/send/request/`, {
        item_id: this.state.itemDetails[0].itemid,
        owner_id: this.state.itemDetails[0].owner_id,
        borrower_id: this.props.user.userid,
        approved: false,
        pending: true,
        request_message: this.refs.message.value
    })
    .then(() => {
        alert("Request Sent");
        this.refs.message.value = "";
    });
} else {
    return alert("Please send a message with your Request");
}
}

backButton() {
if (this.props.user.userid === this.state.itemDetails[0].owner_id) {
    return (
    <Link to={`/bag/view`}>
        <button> View Bag </button>
    </Link>
    );
} else {
    return (
    <Link
        to={`/search?${this.props.category}&${this.props.city}&${
        this.props.zipcode
        }`}
    >
        <button> Back </button>
    </Link>
    );
    }
}
render() {
var getAllImages = this.state.images.map((e, i, arr) => {
    return <img key={i} src={e} alt="imgs" />
});
return this.props.user.userid !== this.state.itemDetails[0].owner_id ? (
    <div>
    {" "}
    <Header title="GEAR DETAILS" />
    <div className="product-details-wrapper">
        <div className="details-wrapper">
        <div>
            <div className="product-title">
            <h2>{this.state.itemDetails[0].item_name}</h2>
            </div>
            <div className="images-details">{getAllImages}</div>
            <div className="product-details">
            <p> PRODUCT DETAILS </p>
            <div className="description">
                {this.state.itemDetails[0].item_description}
            </div>
            </div>{" "}
            <div className="location">
            <p>
                {" "}
                LOCATION: {this.state.itemDetails[0].city},{" "}
                {this.state.itemDetails[0].zipcode}{" "}
            </p>
            </div>
        </div>
        <div className="buttons">
            {/* <Link to={`/search?${this.props.category}&${this.props.city}&${this.props.zipcode}`}> */}
            <button onClick={() => this.sendRequest()}> SEND REQUEST </button>
            {/* </Link> */}
            <textarea ref="message" placeholder="message here" />
            <button> View users Profile </button>
            <button onClick={() => this.sendMessage()}> Send Message </button>
            {this.backButton()}
        </div>
        {this.props.user.userid === this.state.itemDetails[0].owner_id ? (
            <button> edit </button>
        ) : null}
        </div>
    </div>
    </div>
) : (
    <div>
    {" "}
    <Header title="GEAR DETAILS" />
    <div className="product-details-wrapper">
        <div className="details-wrapper">
        <div>
            <div className="product-title">
            <h2>{this.state.itemDetails[0].item_name}</h2>
            </div>
            <div className="images-details">{getAllImages}</div>
            <div className="product-details">
            <p> PRODUCT DETAILS </p>
            <div className="description">
                {this.state.itemDetails[0].item_description}
            </div>
            </div>{" "}
            <div className="location">
            <p>
                {" "}
                LOCATION: {this.state.itemDetails[0].city},{" "}
                {this.state.itemDetails[0].zipcode}{" "}
            </p>
            </div>
        </div>
        {this.backButton()}
        {this.props.user.userid === this.state.itemDetails[0].owner_id ? (
            <button> edit </button>
        ) : null}
        </div>
    </div>
    </div>
);
}
}
function mapStateToProps(state) {
return state;
}
export default connect(mapStateToProps, { getUserInfo })(GearDetails);
