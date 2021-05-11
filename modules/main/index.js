import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Api from '../classes/api.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeartbeat, faCheckCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Todo from '../screens/todo';
import Later from '../screens/later';
import Done from '../screens/done';

const Tab = createBottomTabNavigator();

class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            loading: true,
        }
    }

    async _refresh() {
        this.setState({ ...this.state, loading: true });
        await Api.refreshTodoList()
            .then((res) => {
                console.log("@refresh");
                this.setState({ ...this.state, loading: false, tasks: res });
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
                <Tab.Screen name="Todo" children={() => <Todo state={this.state} />}
                    options={{
                        tabBarLabel: 'Todo',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcon icon={faHeartbeat} size={size} color={color} />
                        ),
                    }} />
                <Tab.Screen name="Later" children={() => <Later state={this.state} />}
                    options={{
                        tabBarLabel: 'Later',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcon icon={faCheckCircle} size={size} color={color} />
                        ),
                    }} />
                <Tab.Screen name="Done" children={() => <Done state={this.state} />}
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

export default Main;