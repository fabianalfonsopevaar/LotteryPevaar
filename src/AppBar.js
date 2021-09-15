import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Lottery from './Lottery'
import CardGenerator from './CardGenerator'

import {
    Switch,
    Route,
    Link as RouterLink
  } from "react-router-dom";

export default function Appbar() {

  return (
    <div>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" style={{marginRight: 50}}>
                Lottery Pevaar SF
            </Typography>
            <Button color="inherit" edge="start" component={RouterLink} to="/lottery">Start a Lottery</Button>
            <Button color="inherit" edge="start" component={RouterLink} to="/cardGenerator">Generate a Card</Button>
        </Toolbar>
    </AppBar>
    <Switch>
        <Route path="/lottery" default>
            <Lottery />
        </Route>
        <Route path="/cardGenerator" exact>
            <CardGenerator />
        </Route>

    </Switch>
    </div>
  );
}
