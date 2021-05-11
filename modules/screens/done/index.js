import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import style from './style';

class Done extends React.Component {

    render() {
        return (
            <View style={style.container}>
                <Text>adsass</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { reducer } = state
    return { reducer }
};

export default connect(mapStateToProps)(Done);