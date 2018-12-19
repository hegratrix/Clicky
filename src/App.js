import React, { Component } from "react"
import { BrowserRouter as Router, Route, } from 'react-router-dom'
// import PropTypes from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
import Archive from './components/Archive'

// const styles = {

// }

class App extends Component {
    render () {
        return (
            <>
            <Router>
                <div>
                    <Navbar></Navbar>
                    <Route exact path ='/' component = {Home} />
                </div>
            </Router>
            </>
        )
    }
}

export default App;
