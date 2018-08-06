import React, { Component } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { getUserInfo, historySearch } from './../../ducks/reducer'
import Header from './../../Header'
import backpack from './../../assets/backpack.png'
import * as turf from '@turf/turf'
import BookingCalendar from 'react-booking-calendar';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

// import * as geocoder from 'geocoder'

const bookings = [
  new Date(2018, 7, 24)]

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
    this.isDayBlocked = this.isDayBlocked.bind(this)
  }
  
  componentWillMount() {
    // this.props.searchGeoCenter();
    this.props.getUserInfo()
      .then(() => {
        var array = this.props.location.search.split(/[\?&]+/)
        axios.get('/search/gear/?category=' + array[1] + '&city=' + array[2] + '&zipcode=' + array[3] + '&userid=' + this.props.user.userid)
          .then((res) => {
            this.setState({ items: res.data })
          })
      })
      navigator.geolocation.getCurrentPosition( (position) => {
        this.setState({currentLocation: position.coords})
      })
  }

  newSearchItems() {
    var coords = {category: this.refs.select.value, radius: '100', lng: this.state.currentLocation.longitude, lat: this.state.currentLocation.latitude}
    console.log(coords, 'coords')
    axios.post(`/search/sql`, coords)
    .then( res => this.setState({items: res.data}))
  }

  searchItems() {
    !this.refs.zip.value ? alert('please fill out all fields') :
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.refs.zip.value + '&key=AIzaSyDmaSW_P8wv7cqs0dKmbGBsGGzSiEZRrN4')
    .then( (res)=> {
      console.log(res.data.results[0].geometry.location)
      this.setState({ currentLocation: res.data.results[0].geometry.location})})
    axios.get('/search/gear/?category=' + this.refs.select.value + '&zipcode=' + this.refs.zip.value + '&userid=' + this.props.user.userid)
      .then((res) => {
        this.setState({ items: res.data, 
                        toggle: true,
                        getMoreToggle: false })
        this.props.historySearch(this.refs.select.value, this.refs.zip.value)
        this.refs.zip.value = ''
      })
  }
  isDayBlocked(day) {
    console.log(day, 'day');
    return true;
  }
  getMore() {
    axios.get('/get/more/?category=' + this.refs.select.value + '&userid=' + this.props.user.userid)
      .then((res) => {
        this.setState({ items: res.data })
      })
    this.setState({
      getMoreToggle: true
    })
  }

  render() {
    console.log(this.state, 'state');
    var mapGear = this.state.items.map( (e,i) => {
      return ( <div key={i} className='list-gear'>
      <Link to={`/details/${e.itemid}`}>
      <img className='listimage' alt=''src={e.image_url[0]}/>
      <div>
            <p>{e.item_name}</p>
            <p>{Math.round(e.item_distance * 100) / 100} mi</p>
            <br/>
            <p>{e.city} {e.zipcode}</p>
            </div>
            </Link>
           </div>
      )
    })
    //     var mapGear = this.state.items.map((e, i, arr) => {
    //       var center = turf.point([this.state.currentLocation.lng, this.state.currentLocation.lat])
    //       var points = turf.points([ [e.lng, e.lat] ])
    //       var options = {steps: +this.refs.radius.value, units: 'miles', options: {foo: 'bar'}};
    //       var radius = turf.circle(center, this.refs.radius.value, options);
    //       if(turf.pointsWithinPolygon(points, radius).features[0]) {
    //         return <div key={i} className='list-gear'>
    //         <Link to={`/details/${e.itemid}`}>
    //           <img className='listimage' alt='' src={e.image_url[0]} />
    //           <div>
    //             <div className='item-name'>{e.item_name}</div>
    //             <br/>
   
    //             <p> {e.city}, {e.zipcode} </p>

    //           </div>
    //         </Link>
    //     </div>
    //       } return null
    // })
    return (
      <div className='search'>
        <Header test = {{name: "stefano"}} title='SEARCH GEAR' />
        {/* <Link to='/profile'>
          <img alt='' src={backpack} />
        </Link> */}


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
            ref='zip'
            placeholder='zip code' />

          <button onClick={() => this.searchItems()}> Search </button>
      <button onClick = {()=> this.newSearchItems()}> SQL </button>
          <div className='radius'>
            <p>Radius</p>
          <select ref='radius' className = 'radius_select'>
            <option value="5">5 mi</option>
            <option value="10">10 mi</option>
            <option value="25">25 mi</option>
          </select>
          </div>
        </div>
        {/* <BookingCalendar clickable bookings={bookings} /> */}
        {/* <DateRangePicker
        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        isDayBlocked={(day)=>this.isDayBlocked(day)}
        /> */}
        
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
  console.log(state)
  return state
}

export default connect(mapStateToProps, { getUserInfo, historySearch })(Search)

