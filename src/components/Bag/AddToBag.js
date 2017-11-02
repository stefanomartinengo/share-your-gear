import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getUserInfo} from './../../ducks/reducer'
import axios from 'axios'

export class AddToBag extends Component {


  componentDidMount() {
    this.props.getUserInfo();
  }

  handleClick() {
    axios.post(`/add/bag/`, {
      item_name: this.refs.name.value,
      owner_id: this.props.user.userid,
      image_url: this.refs.imgurl.value,
      item_description: this.refs.description.value,
      category: this.refs.select.value,
      city: this.refs.city.value,
      zipcode: +this.refs.zipcode.value
    })
   alert('Your gear has been added to your bag! Thanks for sharing!')
   this.refs.name.value = ''
   this.refs.imgurl.value = ''
   this.refs.description.value = ''
   this.refs.city.value = ''
   this.refs.zipcode.value = ''

  }

  render() {
    console.log(this.props.user.userid)
    console.log(this.refs.value)
    return (
      <div>
        <h1> Add to your Bag || Share the Gear </h1>

        <div>

          <select ref='select' >
            <option value="Climbing">Climbing</option>
            <option value="Cycling">Cycling</option>
            <option value="Canyoneering">Canyoneering</option>
            <option value="Water Sports">Water Sports</option>
            <option value="Winter Sports">Winter Sports</option>
            <option value="Hunting">Hunting</option>
            <option value="Sports">Sports</option>
          </select>

          <input ref='name' placeholder='item' />
          <input ref='description' placeholder='item description' />


          <input ref='imgurl' placeholder='image url' />


          <input ref='city' placeholder='city' />
          <input ref='zipcode' placeholder='zipcode' />

        <button onClick={ () => this.handleClick()}> Add To Bag </button>

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

export default connect(mapStateToProps, {getUserInfo})(AddToBag)
