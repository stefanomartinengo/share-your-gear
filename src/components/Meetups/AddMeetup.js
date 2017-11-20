import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getUserInfo} from './../../ducks/reducer';
import './AddMeetup.css';
import Header from './../../Header';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone'
import axios from 'axios'
import addImage from './../../assets/addimage.png'

export class addMeetup extends Component {
    constructor() {
        super() 
        const startDate = new Date();
        const endDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        startDate.setHours(0, 0, 0, 0);
        endDate.setFullYear(endDate.getFullYear() + 1);
        endDate.setHours(0, 0, 0, 0);
    
        this.state = {
            startDate: startDate,
            endDate: endDate,
            autoOk: false,
            disableYearSelection: false,
        };
    }
    ComponentDidMount() {
        this.props.getUserInfo();
    }

    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", `codeinfuse, medium, gist`);
          formData.append("upload_preset", "d2nofqn5"); // Replace the preset name with your own
          formData.append("api_key", "869775194634389"); // Replace API key with your own Cloudinary key
          formData.append("timestamp", (Date.now() / 1000) | 0);
          
          // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
          return axios.post("https://api.cloudinary.com/v1_1/codeinfuse/image/upload", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }).then(response => {
            const fileURL = response.data.secure_url
            this.setState({
              image: [...this.state.image, fileURL]
            }) 
            console.log(response.data)// You should store this URL for future references in your app
          })
        });
      
        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
          alert('images added');
          });
      }
    handleChangeMinDate = (event, date) => {
        this.setState({
            startDate: date,
        });
    };

    handleChangeMaxDate = (event, date) => {
        this.setState({
            endDate: date,
        });
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        })
    }

    render() {
        console.log(this.props.user.userid)
        console.log(this.state)
        return (
            <div>
                <Header title='Add Trip'/>
            <div >
            <TextField
                ref="title"
                hintText="Adventure Name"
                /><br />
            <TextField
                ref="coordinator"
                hintText="Adventure Coordinator"
                /><br />
                
        <DatePicker
            onChange={this.handleChangeMinDate}
            autoOk={this.state.autoOk}
            floatingLabelText="Start Date"
            defaultDate={this.state.startDate}
            disableYearSelection={this.state.disableYearSelection}
          />
        <DatePicker 
            onChange={this.handleChangeMaxDate}
            autoOk={this.state.autoOk}
            floatingLabelText="End Date"
            defaultDate={this.state.endDate}
            disableYearSelection={this.state.disableYearSelection}
          />

        <TextField
                ref="description"
                hintText="Adventure Details"
                /><br />

            <TextField
                ref="gear"
                hintText="Needed Gear"
                /><br />
            <TextField
                ref="people"
                type="number"
                hintText="Needed Sac Snaggers"
                /><br />

            <Dropzone className='dropzone'
                onDrop={this.handleDrop}
                multiple
                accept="image/*" >
                <img src={ addImage } alt=''/>
                </Dropzone>

                <button> add meetup </button>
            </div>
      </div>
 
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {getUserInfo})(addMeetup)