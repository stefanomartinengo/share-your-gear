import React, { Component } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from './../../assets/-rendition;size=1200;version=0.png'
import { connect } from 'react-redux'
import { getUserInfo, searchGeoCenter, historySearch } from './../../ducks/reducer'
import Header from './../../Header'
import backpack from './../../assets/backpack.png'
import * as turf from '@turf/turf'

export class Search extends Component {
  constructor() {
    super()

    this.state = {
      items: [],
      toggle: false,
      getMoreToggle: false,
      start: {},
      currentLocation: {lat: 0, lng: 0}
    }

  }
 
  componentDidMount() {
    this.props.searchGeoCenter();
    this.props.getUserInfo()
      .then(() => {
        var array = this.props.location.search.split(/[\?&]+/)
        axios.get('/search/gear/?category=' + array[1] + '&city=' + array[2] + '&zipcode=' + array[3] + '&userid=' + this.props.user.userid)
          .then((res) => {
            this.setState({ items: res.data })
          })
      })
    }
    circleFunction(radius) {
      var center = turf.point([this.props.center.coords.longitude, this.props.center.coords.latitude]);
      var gears = turf.points([ [-111.3, 41.221], [-111.6, 40.3] ])
      var circle = turf.circle(center, this.refs.radius.value, options);
var options = {steps: 30, units: 'miles', properties: {foo: 'bar'}};
var points = turf.point([this.props.center.coords.latitude, this.props.center.coords.longitude])
var fuck = turf.pointsWithinPolygon(gears, circle)
console.log('within', fuck)
  }

  searchItems() {
    axios.get('/search/gear/?category=' + this.refs.select.value + '&city=' + this.refs.city.value + '&zipcode=' + this.refs.zip.value + '&userid=' + this.props.user.userid)
      .then((res) => {
        this.setState({ items: res.data })
        this.props.historySearch(this.refs.city.value, this.refs.select.value, this.refs.zip.value)
        this.refs.city.value = ''
        this.refs.zip.value = ''
      })
    this.state.toggle = true
    this.state.getMoreToggle = false
  }

  getMore() {
    axios.get('/get/more/?category=' + this.refs.select.value + '&userid=' + this.props.user.userid)
      .then((res) => {
        this.setState({ items: res.data })
      })
    this.state.getMoreToggle = true;

  }




  render() {
  //   var points = turf.points([
  //     [1,1],
  //     [5,5],
  //     [7,7],
  //     [11,11],
  //     [6,8],
  //     [6,6],
  //     [6, 7]
  // ]);
  
  // var searchWithin = turf.polygon([[
  //     [1,1],
  //     [5,5],
  //     [10,10],
  //     [5,5],
  //     [1,1],

  // ]])
  
  // console.log(turf.pointsWithinPolygon(points, searchWithin));
    console.log(this.props)
    var mapGear = this.state.items.map((e, i, arr) => {
      return <div key={i} className='list-gear'>
        <Link to={`/details/${e.itemid}`}>
          <img className='listimage' alt='' src={e.image_url[0]} />
          <div className='itemname'>{e.item_name}</div>
        </Link>
      </div>
    })
    return (
      <div className='search'>
        <Header title='SEARCH GEAR' />
        <Link to='/profile'>
          <img alt='' src={backpack} />
        </Link>

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
          <button onClick={() => this.circleFunction()}> Search </button>
          <div>
            Radius
          <select ref='radius' >
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
          </div>
        </div>

        <div className='list-container'>
          {this.state.items.length > 0 ?
            <div className='search-list'>
              {mapGear}
              {!this.state.getMoreToggle ?
                <h1> Can't find what you're looking for? <button onClick={() => this.getMore()}>Click here</button> to expand search </h1>
                : null}
            </div>
            : null}
          {this.state.toggle && this.state.items.length < 1 ?

            <div className="search-list"> No results for this category. Please try a new search </div> : null}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('mapstatetoprops', state)
  return state
}

export default connect(mapStateToProps, { getUserInfo, searchGeoCenter, historySearch })(Search)



