import React, { Component } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from './../../assets/mountain-climbing-by-Vexels.png'
import { connect } from 'react-redux'
import { getUserInfo } from './../../ducks/reducer'

export class Search extends Component {
  constructor() {
    super()

    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  searchItems() {
    axios.get('/search/gear/?category=' + this.refs.select.value + '&city=' + this.refs.city.value + '&zipcode=' + this.refs.zip.value + '&userid=' + this.props.user.userid)
      .then((res) => {
        this.setState({ items: res.data })
      })
    this.refs.city.value = ''
    this.refs.zip.value = ''
  }

  render() {
    var mapGear = this.state.items.map((e, i, arr) => {
      return <div key={i} className='list-gear'>
        <Link to={`/details/${e.itemid}`}>
          <img alt='' src={e.image_url} /> {e.item_name}
        </Link>
      </div>

    })
    //Render map function to get all the items to render below
    console.log(this.state.items)
    console.log(this.props.user.userid)
    return (

      <div className='search'>
        <Link to='/profile'>
          {<img alt='' src={logo} />}
        </Link>


        <div className='header'>
          <p>Pick your Category</p>
        </div>

        <div className='form'>

          <select ref='select' >
            <option value="Climbing">Climbing</option>
            <option value="Cycling">Cycling</option>
            <option value="Canyoneering">Canyoneering</option>
            <option value="Water Sports">Water Sports</option>
            <option value="Winter Sports">Winter Sports</option>
            <option value="Hunting">Hunting</option>
          </select>

          <input
            ref='city'
            placeholder='City' />

          <input
            ref='zip'
            placeholder='zip code' />

          <button onClick={() => this.searchItems()}> Search </button>

        </div>

        <div className='list-container'>
          <div className='search-list'>
            {mapGear}
          </div>
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

export default connect(mapStateToProps, { getUserInfo })(Search)



