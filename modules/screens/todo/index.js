import React from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import style from './style';

import Spinner from 'react-native-loading-spinner-overlay';

class Todo extends React.Component {

    render() {
        return (
            <View style={style.container}>
                <Text>Todo asdad</Text>
                {console.log("props ", this.props.reducer.loading)}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { reducer } = state
    return { reducer }
};

export default connect(mapStateToProps)(Todo);