import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import style from './style';
import PropTypes from 'prop-types';

class Card extends React.Component {

    render() {

        const {
            onClick,
            task,
        } = this.props

        return (
            <TouchableOpacity onPress={() => { onClick(task); }} style={style.container}>
                <Text style={style.cardTitle}>{task.taskName}</Text>
                <Text style={style.cardDesc}>{task.taskDesc}</Text>
            </TouchableOpacity>
        );
    }
}

Card.propTypes = {
    onClick: PropTypes.func,
    task: PropTypes.object,
}

export default Card;