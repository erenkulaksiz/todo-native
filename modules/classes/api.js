import React from 'react';
import axios from 'axios'

class Api extends React.Component {

    constructor() {
        super();
        this.apiRoute = 'https://5fca12143c1c220016441a5f.mockapi.io/app/api/tasks/';
    }

    async refreshTodoList() {
        return axios.get(this.apiRoute)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                throw err;
            })
    }

    async deleteTask(taskId, index) {
        return axios.delete(this.apiRoute + taskId)
            .then(res => {
                const data = res.data;
                return data;
            })
            .catch(err => {
                throw err;
            })
    }

    async addTask(taskTarget) {

        const newTask = {
            taskName: "New Task",
            taskDesc: "Description (Optional)",
            taskTarget: taskTarget
        }

        return axios.post(this.apiRoute, newTask)
            .then(res => {
                const data = res.data;
                return data;
            })
            .catch(err => {
                throw err;
            })
    }

    async updateTask(task) {

        const taskTemp = {
            taskName: task.taskName,
            taskDesc: task.taskDesc,
            id: task.taskId,
            taskTarget: task.taskTarget,
        }

        return axios.put(this.apiRoute + taskTemp.id, taskTemp)
            .then(res => {
                const data = res.data;
                return data;
            })
            .catch(err => {
                throw err;
            })
    }
}
const api = new Api();

export default api;
