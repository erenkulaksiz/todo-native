import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import style from './style';

class Later extends React.Component {

    render() {
        return (
            <View style={style.container}>
                <Text>later</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { reducer } = state
    return { reducer }
};

export default connect(mapStateToProps)(Later);