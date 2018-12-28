import React, { Component } from 'react'
import Flamingo from './images.json'
import shuffle from 'shuffle-array'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Result from './gameComponents/Results'
import firebase from 'firebase'

const styles =  ({
    gridList: {
        padding: 2,
        marginTop: 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: 715,
        height: 500,
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: 'black'
    },
    tile: {
        width: 175,
        height: 125,
    }
  });

class Game extends Component {
    state = {
        flamingo: [],
        clicked: [],
        count: 0,
        complete: false
    }

    componentDidMount = () => {
        this.setState({ flamingo: shuffle(Flamingo)})
    }
    handleClick = name => {
        if (this.state.clicked.indexOf(name) !== -1) {
            firebase.database().ref(`users/${this.props.uid}`).once('value')
            .then(r => r.val())
            .then(user => {
                for (const key in user) {
                    if (user.hasOwnProperty(key)) {
                        let scores = user[key].scores ? user[key].scores : []
                        scores.push(this.state.count)
                        firebase.database().ref(`/users/${this.props.uid}/${key}`).update({ scores: scores})
                    }
                }
            })
            this.setState({ complete: true })
        } else {
        let clickedArr = this.state.clicked
        clickedArr.push(name)
        let count = this.state.count
        count++
        this.setState({ flamingo: shuffle(Flamingo), clicked: clickedArr, count: count })
        }
    }
    handleClose = () => {
        this.setState({ complete: false, count: 0, flamingo: shuffle(Flamingo) })
      }

    render () {
        return (
            <>
            <div >
                <GridList style={styles.gridList} cols={4}>
                <Result count={this.state.count} handleClose={this.handleClose} complete={this.state.complete} />
                    {this.state.flamingo.map((flamingo, index) => index < 16 ?
                        <GridListTile style={styles.tile} onClick={() => this.handleClick(flamingo.name)} key={flamingo.name} cols={1}>
                            <img style={styles.image} src={flamingo.image} alt={'flamingo'} />
                        </GridListTile>
                        : null
                    )}
                </GridList>
            </div>
            </>
        )
    }
}

export default Game