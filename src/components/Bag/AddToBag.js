import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from './../../ducks/reducer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './AddToBag.css'
import Dropzone from 'react-dropzone'
import Header from './../../Header'


export class AddToBag extends Component {
  constructor() {
    super()

    this.state = {
      image: []
    }
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


  componentDidMount() {
    this.props.getUserInfo();
  }

  handleClick() {
    axios.post(`/add/bag/`, {
      item_name: this.refs.name.value,
      owner_id: this.props.user.userid,
      image_url: this.state.image,
      item_description: this.refs.description.value,
      category: this.refs.select.value,
      city: this.refs.city.value,
      zipcode: +this.refs.zipcode.value
    })
    alert('Your gear has been added to your bag! Thanks for sharing!')
    this.refs.name.value = ''
    this.state.image = ''
    this.refs.description.value = ''
    this.refs.city.value = ''
    this.refs.zipcode.value = ''

  }

  render() {
    console.log(this.props.user.userid)
    console.log(this.refs.value)
    console.log(this.state.image)
    return (
      <div className='container'>
        <Header title='FILL YOUR SAC'/>
        <div>
          <div className='input-container'>
            <div className='input-container-child'>
              <select ref='select' >

                <option>Categories</option>
                <option value="Climbing">Climbing</option>
                <option value="Cycling">Cycling</option>
                <option value="Canyoneering">Canyoneering</option>
                <option value="Water Sports">Water Sports</option>
                <option value="Winter Sports">Winter Sports</option>
                <option value="Hunting">Hunting</option>
                <option value="Sports">Sports</option>
              </select>
              
              <input ref='name' placeholder='item' />
              <textarea ref='description' placeholder='Item Description'
                cols="61"></textarea>



              <Dropzone className='dropzone'
                onDrop={this.handleDrop}
                multiple
                accept="image/*" >
                <p> UPLOAD PICTURES  HERE</p>
                </Dropzone>

              <input ref='city' placeholder='city' />
              <input ref='zipcode' placeholder='zipcode' />

            </div>
          </div>
          <button onClick={() => this.handleClick()}> Add To Bag </button>
          <Link to='/bag'> <button> BACK </button></Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { getUserInfo })(AddToBag)
