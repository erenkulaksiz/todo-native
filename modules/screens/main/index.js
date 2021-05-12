import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Api from '../../classes/api.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeartbeat, faCheckCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Todo from '../todo';

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

    async _deleteTask(taskId, index) {
        await Api.deleteTask(taskId, index)
            .then((res) => {
                console.log("@del task", res);
            })
            .catch((error) => {
                console.error(error);
            });

        await this._refresh();
    }

    async _addTask(screen) {

        await Api.addTask(screen)
            .then((res) => {
                console.log("@add task", res);
            })
            .catch((error) => {
                console.error(error);
            });

        await this._refresh();
    }

    async _updateTask(task) {

        await Api.updateTask(task)
            .then((res) => {
                console.log("@update task", res);
            })
            .catch((error) => {
                console.error(error);
            });

        await this._refresh();
    }

    _renderTodo(screen) {
        return (
            <Todo
                state={this.state}
                screen={screen}
                onDeleteTask={(taskId, index) => this._deleteTask(taskId, index)}
                onAddTask={(screenCallback) => { this._addTask(screenCallback) }}
                onEditTask={(taskCallback) => { this._updateTask(taskCallback) }}
            />
        );
    }

    componentDidMount() {
        this._refresh();
    }

    render() {

        // TODO: burada tablara ayrı ayrı ekran vermek yerine bir ekran verip
        // ekran prop'u gönderebilirim. 3 ayrı ekran yapmak zorunda kalmam.

        return (
            <Tab.Navigator>
                <Tab.Screen name="Todo" children={() => this._renderTodo(0)}
                    options={{
                        tabBarLabel: 'Todo',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcon icon={faHeartbeat} size={size} color={color} />
                        ),
                    }} />
                <Tab.Screen name="Later" children={() => this._renderTodo(1)}
                    options={{
                        tabBarLabel: 'Later',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesomeIcon icon={faCheckCircle} size={size} color={color} />
                        ),
                    }} />
                <Tab.Screen name="Done" children={() => this._renderTodo(2)}
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