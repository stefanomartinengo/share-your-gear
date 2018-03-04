import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getUserInfo} from './../../ducks/reducer';
import './AddMeetup.css';
import Header from './../../Header';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import addImage from './../../assets/addimage.png';

export class addMeetup extends Component {
    constructor() {
        super() 
        const startDate = new Date()
        const endDate = new Date();


        startDate.setFullYear(startDate.getFullYear());
        startDate.setHours(0, 0, 0, 0);
        endDate.setFullYear(endDate.getFullYear());
        endDate.setHours(0, 0, 0, 0);
    
        this.state = {
            formattedStartDate: '',
            formattedEndDate: '',
            startDate: startDate,
            endDate: endDate,
            autoOk: false,
            disableYearSelection: false,
            image: [],
            valueCoordinator: '',
            valueTitle: '',
            valueDescription: '',
            valueGear: '',
            valuePeople: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
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
        var adateStamp = date;
        var amonth = (adateStamp.getMonth() + 1)
        var aday = adateStamp.getDate()
        var ayear = adateStamp.getFullYear()
        var atimeStamp = `${amonth}/${aday}/${ayear}`
        console.log(atimeStamp)
       this.setState({
            startDate: date,
            formattedStartDate: atimeStamp
        })
    };

    handleChangeMaxDate = (event, date) => {
        var adateStamp = date
        var amonth = (adateStamp.getMonth() + 1)
        var aday = adateStamp.getDate()
        var ayear = adateStamp.getFullYear()
        var atimeStamp = `${amonth}/${aday}/${ayear}`
        this.setState({
            endDate: date,
            formattedEndDate: atimeStamp
        });
    };

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        })
    }

    handleDate(event, date){
        this.setState({
            startDate: this.state.formattedStartDate, 
            endDate: this.state.formattedEndDate
        })
    }
        formatDate(date){
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      }
        handleCoordinator = (event) => {
            this.setState({
                valueCoordinator: event.target.value
            })
        }
        handleTitle = (event) => {
            this.setState({
            valueTitle: event.target.value,
            });
        };
        handlePeople = (event) => {
            this.setState({
            valuePeople: event.target.value
            })
        };
        handleGear = (event) => {
            this.setState({
                valueGear: event.target.value
            })
        };
        handleDescription = (event) => {
            this.setState({
                valueDescription: event.target.value
            })
        }
    handleSubmit() {
        axios.post('/adventure/add', { 
            coordinator: this.refs.coordinator.getValue(),
            title: this.refs.title.getValue(),
            duration: `From: ${this.state.formattedStartDate} -- Till: ${this.state.formattedEndDate}`,
            description: this.refs.description.getValue(),
            gear: this.refs.gear.getValue(),
            people: +this.refs.people.getValue(),
            images: this.state.image,
            coordinator_id: this.props.user.userid

         })
         alert('your trip has been added')
         this.setState({
         valueTitle: '',
         valueCoordinator: '',
         valueDescription: '',
         valueGear: '',
         valuePeople: '',
         startDate: this.state.startDate,
         endDate: this.state.endDate
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
                onChange={this.handleTitle}
                value={this.state.valueTitle}
                ref="title"
                hintText="Adventure Name"
                /><br />
            <TextField
                onChange={this.handleCoordinator}
                value={this.state.valueCoordinator}
                ref="coordinator"
                hintText="Adventure Coordinator"
                /><br />
                
        <DatePicker
            formatDate={this.formatDate}
            // onChange={this.handleDate} 
            value ={this.state.startDate}
            onChange={this.handleChangeMinDate}
            autoOk={this.state.autoOk}
            floatingLabelText="Start Date"
            defaultDate={this.state.startDate}
            disableYearSelection={this.state.disableYearSelection}
          />
        <DatePicker 
            formatDate={this.formatDate}
            // onChange={this.handleDate} 
            value ={this.state.endDate}
            onChange={this.handleChangeMaxDate}
            autoOk={this.state.autoOk}
            floatingLabelText="End Date"
            defaultDate={this.state.endDate}
            disableYearSelection={this.state.disableYearSelection}
          />

        <TextField
        onChange={this.handleDescription}
            value={this.state.valueDescription}
                ref="description"
                hintText="Adventure Details"
                /><br />

            <TextField
            onChange={this.handleGear}
                value={this.state.valueGear}
                ref="gear"
                hintText="Needed Gear"
                /><br />
            <TextField
                value={this.state.valuePeople}
                onChange={this.handlePeople}
                ref="people"
                type="number"
                hintText="Needed Sac Snaggers"
                /><br />

            <Dropzone 
                className='dropzone'
                onDrop={this.handleDrop}
                multiple
                accept="image/*" >
                <img src={ addImage } alt=''/>
                </Dropzone>

                <button onClick={ () => this.handleSubmit()}> add meetup </button>
            </div>
      </div>
 
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {getUserInfo})(addMeetup)