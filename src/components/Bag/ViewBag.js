import React, { Component } from 'react'
import axios from 'axios'
import { getUserInfo } from './../../ducks/reducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

export class ViewBag extends Component {
  constructor() {
    super()

    this.state = {
      inventory: []
    }

  }
  componentDidMount() {
    this.props.getUserInfo();
    
    axios.get(`/view/bag/${this.props.user.userid}`).then((response) => {
      this.setState({
        inventory: response.data
      })
    })
  }

  render() {

    var mapGear = this.state.inventory.map((e, i, arr) => {
      if(e.rented === true) {
        return <div> Rented By: {e.borrower_id}</div> //Here- new statement to join and get borrower_id name?
      } else {
        return <div> {e.item_name } 
                      rented: {JSON.stringify(e.rented)}</div>
      }
    })

    console.log(this.state.inventory)
    return (
      <div>
        {mapGear}
        <div>
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
