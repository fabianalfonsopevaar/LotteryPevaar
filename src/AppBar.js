import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Lottery from './Lottery'
import CardGenerator from './CardGenerator'

import {
    Switch,
    Route,
    Link as RouterLink
  } from "react-router-dom";

export default function Appbar() {
    const [auth, setAuth] = useState(false)
  return (
    <div>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" style={{marginRight: 50}}>
                Lottery Pevaar SF
            </Typography>
            <Button color="inherit" edge="start" component={RouterLink} to="/lottery">Start a Lottery</Button>
            <Button color="inherit" edge="start" component={RouterLink} to="/cardGenerator">Generate a Card</Button>
            {auth && (
            <div>
                <IconButton onClick={()=>{
                    setAuth(false);
                    }}><AccountCircle /></IconButton>
            </div>
          )}
          {!auth && (
              <div>
                {/* <IconButton component={RouterLink} to="/login"> */}
                <IconButton onClick={() => {
                  let pass = prompt("Fill the password")
                  if(pass && pass==="Abc123*"){
                    setAuth(true)
                  }else{
                    setAuth(false)
                  }
                }
                }>
                    <VpnKeyIcon style={{ color: 'white' }} />
                </IconButton>
              </div>
          )}
        </Toolbar>
    </AppBar>
    <Switch>
        <Route path="/lottery" exact >
            <Lottery auth={auth} />
        </Route>
        <Route path="/cardGenerator" exact>
            <CardGenerator />
        </Route>
        <Route path="/" default>
            <Lottery  auth={auth}  />
        </Route>

    </Switch>
    </div>
  );
}
