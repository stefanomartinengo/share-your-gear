import React, { Component } from 'react'
import axios from 'axios'
import { getUserInfo } from './../../ducks/reducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import './viewBag.css'

export class ViewBag extends Component {
  constructor() {
    super()

    this.state = {
      inventory: [],
      borrowerName: []
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
    axios.delete(`/delete/gear`, { data: {
      owner_id: this.props.user.userid,
      itemid: id
      }}).then( (res) => {
        this.getBag();
      })

  }
    getNames() {
      axios.get(`/view/name/${this.props.user.userid}`).then((response) => {
        console.log(response.data, 'u get it?')
        this.setState({
          borrowerName: response.data
        })
      })
    }


  render() {
    
    var mapGear = this.state.inventory.map((e, i, arr) => {
      if(e.rented === true) {
        return <div> Rented By: {e.borrower_id}</div> //Here- new statement to join and get borrower_id name?
      } else {
        return <div className='bag'> {e.item_name } <button onClick={ () => this.deleteGear(e.itemid)}> delete  </button>
                      rented: {JSON.stringify(e.rented)}</div>
      }
    })
    console.log(this.state.borrowerName)
    console.log(this.state.inventory)
    return (
      <div className='bag'>
        {mapGear}
        <div>
          <button onClick={ () => this.getNames() }> get it </button>
          <p> go back <Link to='/bag'> <button> BACK </button></Link></p>
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
