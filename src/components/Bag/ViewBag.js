import React, { Component } from 'react'
import axios from 'axios'
import { getUserInfo } from './../../ducks/reducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import './viewBag.css'
import Header from './../../Header'
import backpack from './../../assets/backpack.png'
export class ViewBag extends Component {
  constructor() {
    super()

    this.state = {
      inventory: [],
      rentedGear: []
    }
  }

  getBag() {
    axios.get(`/view/bag/${this.props.user.userid}`).then((response) => {
      this.setState({
        inventory: response.data
      })
    })
  }

  componentDidMount() {
    this.props.getUserInfo();
    this.getBag();
  }

  deleteGear(id) {
    console.log(id)
    axios.delete(`/delete/gear`, {
      data: {
        owner_id: this.props.user.userid,
        itemid: id
      }
    }).then((res) => {
      this.getBag();
    })

  }

  render() {

    var mapGear = this.state.inventory.map((e, i, arr) => {
      console.log(e)
      if (e.rented === false) {
        return <p key={i} className='not-rented'>  <img src={e.image_url[0]} />
          <div className='center'>
            <div className='bagitemname'>{e.item_name}</div>
            <div className='descriptionbag'>{e.item_description}</div>
          </div>
          <button onClick={() => this.deleteGear(e.itemid)}> X  </button></p>
      } else {
        return <p key={i} className='rented'>  <img src={e.image_url[0]} />
          
          <div className='rentcontainer'>
          
          <div className='rentedtext'> <p>RENTED</p>  </div>

          <div className='center'>
            <div className='bagitemname'>{e.item_name}</div>
            <div className='descriptionbag'>{e.item_description}</div>
          </div>
          <div className='buffer'></div>
          </div>

          <button onClick={() => this.deleteGear(e.itemid)}> X  </button></p>
      }
    }

    )

    console.log(this.state.inventory)
    return (
      <div className='bag-container'>
        <Header title='CHECK YOUR SAC' />
        <div className='bag'>
          {mapGear}
        </div>

        <div>
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

export default connect(mapStateToProps, { getUserInfo })(ViewBag)
