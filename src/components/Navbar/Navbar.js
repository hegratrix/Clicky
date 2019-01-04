import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const styles = {
  root: {
    flexGrow: 1
  },
  bar: {
    backgroundColor: "black",
    marginTop: '-5px',
    height: 57,
  },
  grow: {
    flexGrow: 1,
    color: "#ffbdad", 
    textAlign: 'center'
  },
  link: {
    color: "#ffbdad",
    padding: 5,
    textDecoration: "none"
  }
};

class Navbar extends Component {
  render () {
    return (
      <>
      <div style={styles.root}>
        <AppBar style={styles.bar} position="static">
          <Toolbar>
            {
              this.props.isSignedIn ? (
                <>
            <Link style={styles.link} to={'./'}>Home</Link>
            <Link style={styles.link} to={'./game'}>Game</Link>
            <Link style={styles.link} to={'./leaderboard'}>LeaderBoard</Link>
            <Typography variant="h6" style={styles.grow}>
              Flamingo Clicky Game
            </Typography>
            <Typography style={styles.link}>{this.props.userName}</Typography>
            <Link style={styles.link} onClick={() => firebase.auth().signOut()} to={'/'}>Sign Out</Link>
            </>
            ) : (
              <>
              <Typography variant="h6" style={styles.grow}>
              Flamingo Clicky Game
            </Typography>
              <StyledFirebaseAuth uiConfig={this.props.uiConfig} firebaseAuth={firebase.auth()}/>
              </>
            )
            }
          </Toolbar>
        </AppBar>
      </div>
      </>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);