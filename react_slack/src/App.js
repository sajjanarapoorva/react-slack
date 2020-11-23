import React from 'react';
import { SideBar } from "./components/Sidebar";
import Messages from "./components/Message/Message"

import './App.css';
import { Grid } from 'semantic-ui-react';
import DetailsBar from './components/Message/DetailsBar';

function App() {
  return (
    <Grid columns="equal">
      <SideBar />
      <Grid.Column className="messagepanel">
        <Messages />
      </Grid.Column>
      <Grid.Column style={{paddingTop:"25px",padding:"25px"}} width={4}>
        <DetailsBar/>
      </Grid.Column>
    </Grid>
  );
}


export default  App;