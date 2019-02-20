import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Game from './components/Game'
import Home from './components/Home'
import LeaderBoard from './components/LeaderBoard'
import Navbar from './components/Navbar'
import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyCO_jbCGL7v35WgI_2WxU8MI4I_Htgf-2w",
    authDomain: "flamingo-clicky.firebaseapp.com",
    databaseURL: "https://flamingo-clicky.firebaseio.com",
    projectId: "flamingo-clicky",
    storageBucket: "flamingo-clicky.appspot.com",
    messagingSenderId: "318315470218"
})

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/game',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
}

class App extends Component {
    state = {
        isSignedIn: false,
        name: '',
        uid: ''
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({isSignedIn: !!user})
        )
        firebase.auth().onAuthStateChanged(user => {
            firebase.database().ref(`/users/${user.uid}`).once('value')
            .then(r => r.val())
            .then(dbUser => {
                this.setState({ name: user.displayName, uid: user.uid })
                if(!dbUser) {
                firebase.database().ref(`/users/${user.uid}`).push({
                    name: user.displayName,
                    scores: []
                })
                }
            })
        })
      }
      componentWillUnmount() {
        this.unregisterAuthObserver();
      }
    render () {
        return (
            <>
            <Router basename={'/Clicky'}>
                <div>
                    <Navbar uiConfig={uiConfig} isSignedIn={this.state.isSignedIn} userName={this.state.name} />
                    <Route exact path='/' component={Home} />
                    <Route path='/game' component={() => <Game uid={this.state.uid} />} />
                    <Route path='/leaderboard' component={LeaderBoard}/>
                </div>
            </Router>
            </>
        )
    }
}

export default App