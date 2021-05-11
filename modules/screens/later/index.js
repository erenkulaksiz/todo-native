import React from 'react';
import { Text, View, Button } from 'react-native';
import style from './style';
import Card from '../../card';
import PropTypes from 'prop-types';

import Spinner from 'react-native-loading-spinner-overlay';

class Later extends React.Component {

    render() {

        const {
            state,
        } = this.props

        const taskList = [];

        state.tasks.map((task, index) => {
            if (task.taskTarget == 1) {
                taskList.push(<Card task={task} key={index} />)
            }
        })

        return (
            <View style={style.container}>
                <Spinner
                    visible={state.loading}
                    textContent={'Loading...'}
                />
                {taskList}
            </View>
        );
    }
}

Later.propTypes = {
    state: PropTypes.object,
}

export default Later;