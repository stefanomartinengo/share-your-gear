import React, { Component } from 'react'
import axios from 'axios'
import { getUserInfo } from './../../ducks/reducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import './viewBag.css'
import Header from './../../Header'

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

    var mapGear = this.state.inventory.map((e, i, arr) => { console.log(e)
      if (e.rented === false) {
        return <p key={i} className='not-rented'> {e.item_name} <img src={e.image_url[0]} /> <button onClick={() => this.deleteGear(e.itemid)}> X  </button></p>
      } else {
        return <p key={i} className='rented'> {e.item_name} <img src={e.image_url[0]} /> <button onClick={() => this.deleteGear(e.itemid)}> X  </button></p>
      }
    }

    )

    console.log(this.state.inventory)
    return (
      <div className='bag-container'>
         <Header title='CHECK YOUR SAC'/>
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
