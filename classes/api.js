import React from 'react';
import axios from 'axios'

class Api extends React.Component {

    constructor() {
        super();
        this.apiRoute = 'https://5fca12143c1c220016441a5f.mockapi.io/app/api/tasks/';
    }

    async refreshTodoList() {

        return axios.get(this.apiRoute)
    }
}
const api = new Api();

export default api;
