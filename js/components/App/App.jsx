import React from 'react';

import 'whatwg-fetch';

import './App.scss';
import Body1 from '../Body1/Body1.jsx';
import Body2 from "../Body2/Body2.jsx";
import Body3 from "../Body3/Body3.jsx";
import {
    HashRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom';


class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classNav: "main__navigation",
            classHeader: "header"
        }
    }

    handleClick = () => {
        this.setState({
            classNav: "main__navigation-clicked",
            classHeader: "header-clicked"
        })
    };

    render() {
        return (
            <div>
                <div className={this.state.classHeader}>
                <h1>Choose your level</h1>
                </div>
                <div className={this.state.classNav}>
                    <ul>
                        <li onClick={this.handleClick} className="ball"><Link to="/">Easy</Link></li>
                        <li onClick={this.handleClick}><Link to="/body2">Medium</Link></li>
                        <li onClick={this.handleClick}><Link to="/body3">Hard</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}


export default class App extends React.Component {

    render() {
        return (
            <HashRouter>
                <div className="container">
                    <Nav/>
                    <Switch>
                        <Route exact path="/" component={Body1}/>
                        <Route path="/body2" component={Body2}/>
                        <Route path="/body3" component={Body3}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}