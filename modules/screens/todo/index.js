import React from 'react';
import { Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, SafeAreaView, TouchableHighlightComponent } from 'react-native';
import style from './style';
import Card from '../../card';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faHeartbeat, faCheckCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ActionButton from 'react-native-action-button';
import PTRView from 'react-native-pull-to-refresh';

const radio_props = [
    {
        label: <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesomeIcon icon={faHeartbeat} size={12} color={"#000"} /><Text style={{ marginLeft: 4 }}>Todo</Text>
        </View>,
        value: 0
    },
    {
        label: <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesomeIcon icon={faCheckCircle} size={12} color={"#000"} /><Text style={{ marginLeft: 4 }}>Later</Text>
        </View>, value: 1
    },
    {
        label: <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesomeIcon icon={faLightbulb} size={12} color={"#000"} /><Text style={{ marginLeft: 4 }}>Done</Text>
        </View>, value: 2
    }
];

class Todo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: {
                taskId: 0,
                index: 0,
                taskName: "",
                taskDesc: "",
                taskTarget: 0,
                visible: false,
            },
            value: 0,
        }
    }

    _editName = (text) => {
        this.setState({ ...this.state, modal: { ...this.state.modal, taskName: text } })
    }

    _editDesc = (text) => {
        this.setState({ ...this.state, modal: { ...this.state.modal, taskDesc: text } })
    }

    render() {

        const {
            state,
            screen,
            onDeleteTask,
            onAddTask,
            onEditTask,
            onRefresh,
        } = this.props


        const _showModal = (taskId, index) => {
            this.setState({
                ...this.state,
                modal: {
                    ...this.state.modal,
                    taskId: taskId,
                    index: index,
                    visible: true,
                    taskName: state.tasks[index].taskName,
                    taskDesc: state.tasks[index].taskDesc,
                    taskTarget: state.tasks[index].taskTarget,
                },
                value: state.tasks[index].taskTarget,
            })
        }

        const _hideModal = () => {
            this.setState({ ...this.state, modal: { ...this.state.modal, visible: false } })
        }

        const taskList = [];

        state.tasks.map((task, index) => {
            if (task.taskTarget == screen) {
                taskList.push(
                    <Card
                        task={task}
                        key={index}
                        onClick={(callbackTask) => {
                            _showModal(task.id, index);
                        }}
                    />
                )
            }
        })

        function refresh() {
            return new Promise((resolve) => {
                onRefresh();
                resolve();
            });
        }

        return (
            <View style={style.container}>
                <Spinner
                    visible={state.loading}
                    textContent={'Loading...'} />

                <PTRView onRefresh={() => { refresh() }} >
                    <ScrollView>
                        {taskList.length > 0 ? taskList : <Text style={style.tip}>You can add tasks from right bottom.</Text>}
                    </ScrollView>
                </PTRView>

                <Modal
                    isVisible={this.state.modal.visible}
                    onSwipeComplete={() => _hideModal()}
                    swipeDirection={['down']}
                    style={style.modalWrapper}
                    onBackdropPress={() => _hideModal()}>
                    <View style={style.modal}>
                        <Text style={style.modalTitle}>
                            <FontAwesomeIcon icon={faEdit} size={18} color={"#000"} /> Edit Task
                        </Text>
                        <View style={style.inputs}>
                            <Text style={style.inputTitle}>Task Title</Text>
                            <TextInput
                                style={style.input}
                                defaultValue={this.state.modal.taskName}
                                onChangeText={text => this._editName(text)}
                            />
                            <Text style={style.inputTitle}>Task Description</Text>
                            <TextInput
                                style={style.input}
                                defaultValue={this.state.modal.taskDesc}
                                onChangeText={text => this._editDesc(text)}
                            />
                        </View>
                        <View style={style.radioWrapper}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={this.state.modal.taskTarget}
                                onPress={(value) => { this.setState({ ...this.state, modal: { ...this.state.modal, taskTarget: value } }) }}
                                formHorizontal={true}
                                labelHorizontal={false}
                            />
                        </View>
                        <View style={style.buttonWrapper}>
                            <Button title="DELETE TASK"
                                color="#bf0a0a"
                                onPress={() => { onDeleteTask(this.state.modal.taskId, this.state.modal.index); _hideModal() }}
                            />
                        </View>
                        <Button title="APPLY" onPress={() => { _hideModal(); onEditTask(this.state.modal) }} />
                    </View>
                </Modal>
                <ActionButton
                    buttonColor="#157de6"
                    onPress={() => onAddTask(screen)}
                    offsetX={15}
                    offsetY={5}
                />
            </View>
        );
    }
}

Todo.propTypes = {
    state: PropTypes.object,
    screen: PropTypes.number,
    onDeleteTask: PropTypes.func,
    onAddTask: PropTypes.func,
    onEditTask: PropTypes.func,
    onRefresh: PropTypes.func,
}

export default Todo;