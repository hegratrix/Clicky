import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: 'black'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: 'black'
  },
  picture: {
      height: '53vh',
      width: '100%',
      objectFit: 'cover'
  }
});

class Home extends Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
        <>
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <img className={classes.picture} src="https://i.pinimg.com/originals/52/8b/e0/528be0848ce925b8266a2e17395ea95d.jpg" alt="Flamingo"></img>
            </Grid>
        </Grid>
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>What is this?</Typography>
            <Typography className={classes.secondaryHeading}>Description of the App</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              This is a Flamingo Clicky Game where you can compete against other players for the longest run of correct flamingo choices.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>How do I play?</Typography>
            <Typography className={classes.secondaryHeading}>
              Instructions on How to Play Flamingo Clicky Game
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Your task is to click on the different flamingo on the screen.  Each time a flamingo is clicked the flamingos will be shuffled.  Then you click on a flamingo you have not clicked on before.  If you click the same flamingo twice, the game is over.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Why should I sign up?</Typography>
            <Typography className={classes.secondaryHeading}>
              Steps to Start the Clicky Game.
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            Click the sign up button in the Navigation Bar to create an account.  You will need to sign in with your email account. Once you sign in, you will be able to start a new game and view your ranking on the leaderbaord.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Personal data</Typography>
            <Typography className={classes.secondaryHeading}>
              Reasons for Linking Email to Clicky Game
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              In order to keep your scores and stats secure to you as a user, we only require you to sign in with your email because of its security and reliability.  The Flamingo Clicky Game will never share your information with third parties or other users.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      </>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
