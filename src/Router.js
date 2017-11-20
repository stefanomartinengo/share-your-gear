import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import Search from './components/Search/Search';
import Profile from './components/Profile/Profile';
import GearDetails from './components/Gear_Detail/GearDetails';
import InboundRequests from './components/Inbound_Requests/InboundRequests';
import OutboundRequests from './components/Outbound_Requests/OutboundRequests';
import Bag from './components/Bag/Bag';
import ViewBag from './components/Bag/ViewBag';
import AddToBag from './components/Bag/AddToBag';
import Inbox from './components/Messages/Inbox';
import AddMeetup from './components/Meetups/AddMeetup';


export default function Router() {

    return (

        <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/search' component={Search} />
            <Route path='/profile' component={Profile} />
            <Route path='/details/:id' component={GearDetails} />
            <Route path='/inbound/requests' component={InboundRequests} />
            <Route path='/outbound/requests' component={OutboundRequests} />
            <Route path='/bag' component={Bag} exact/>
            <Route path='/bag/view' component={ViewBag} />
            <Route path='/bag/add' component={AddToBag} />
            <Route path='/inbox' component={Inbox} />
            <Route path='/meetup/add' component={AddMeetup} />
        </Switch>

    )
}
