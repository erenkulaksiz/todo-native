import React from 'react';
import { connect } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Api from '../../classes/api.js';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeartbeat, faCheckCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';

import Todo from '../screens/todo';
import Later from '../screens/later';
import Done from '../screens/done';

const Tab = createBottomTabNavigator();

class Main extends React.Component {

    _refresh() {
        this.props.dispatch({ type: 'SET_LOADING', payload: true })
        Api.refreshTodoList()
            .then((res) => {
                this.props.dispatch({ type: 'SET_TASKS', payload: res.data });
                this.props.dispatch({ type: 'SET_LOADING', payload: false })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this._refresh();

    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Todo" component={Todo}
                    options={{
                        tabBarLabel: 'Todo',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcon icon={faHeartbeat} size={size} color={color} />
                        ),
                    }} />
                <Tab.Screen name="Later" component={Later}
                    options={{
                        tabBarLabel: 'Later',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcon icon={faCheckCircle} size={size} color={color} />
                        ),
                    }} />
                <Tab.Screen name="Done" component={Done}
                    options={{
                        tabBarLabel: 'Done',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcon icon={faLightbulb} size={size} color={color} />
                        ),
                    }} />
            </Tab.Navigator>
        );
    }
}

const mapStateToProps = (state) => {
    const { reducer } = state
    return { reducer }
};

export default connect(mapStateToProps)(Main);