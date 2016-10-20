'use strict';

import React from 'react';
import { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './todo/components/Header.jsx';
import Footer from './todo/components/Footer.jsx';
import Panel from './todo/components/Panel.jsx';
import TodoInput from './todo/components/TodoInput.jsx';
import TodoList from './todo/components/TodoList.jsx';
import StatusBar from './todo/components/StatusBar.jsx';
import TabsComp from './todo/components/Tab.jsx';
import AppBar from 'material-ui/AppBar';
import {cyan500,deepOrange500} from 'material-ui/styles/colors';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
        textColor: cyan500,
    },
    appBar: {
        height: 50,
    },
});

class Application extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [], filter: 'all',
            selectedIndex: 0,
        };        
    }
    select = (index) => this.setState({selectedIndex: index})

    getChildContext() {
        return {muiTheme: getMuiTheme(darkTheme)};
    }

    _onTodoAdded(todo) {
        this.setState({
            todoList: [
                todo,
                ...this.state.todoList
            ]
        });
    }

    _onTodoDeleted(id) {
        this.setState({
            todoList: this.state.todoList.filter((todo) => todo.id !== id)
        });
    }

    _onTodoChanged(newTodo) {
        let newList = this.state.todoList.map((todo) => {
            if (todo.id === newTodo.id) {
                return newTodo;
            }
            return todo;
        });
        this.setState({todoList: newList});
    }

    _onChangeFilter(filter) {
        this.setState({filter: filter});
    }

    _cleanCompleted() {
        this.setState({
            todoList: this.state.todoList.filter((todo) => !todo.completed)
        });
    }
    
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <AppBar title="My AppBar" />
                <TabsComp />
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Recents"
                        icon={recentsIcon}
                        onTouchTap={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="Favorites"
                        icon={favoritesIcon}
                        onTouchTap={() => this.select(1)}
                    />
                    <BottomNavigationItem
                        label="Nearby"
                        icon={nearbyIcon}
                        onTouchTap={() => this.select(2)}
                    />
                    </BottomNavigation>
                </Paper>
            </div>
            </MuiThemeProvider>
            );
    }
}

Application.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Application;
