import React from 'react';
import { SideBar } from "./components/Sidebar";
import Messages from "./components/Message/Message"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import './App.css';
import { Grid } from 'semantic-ui-react';

function App() {
  return (
    <Grid columns="equal">
      <SideBar />
      <Grid.Column className="messagepanel">
        <Messages />
      </Grid.Column>
      <Grid.Column width={3}>
        <span>
        </span>
      </Grid.Column>
    </Grid>
  );
}

export default App;