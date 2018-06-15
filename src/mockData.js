import clientsData from './service/clients.json';
import endPoints from './service/endPoints.json';
import executions from './service/executions.json';
import attempt1 from './service/attempt1.json';
import attempt2 from './service/attempt2.json';
import attempt3 from './service/attempt3.json';
import attempt4 from './service/attempt4.json';
import attempt5 from './service/attempt5.json';
import attempt6 from './service/attempt6.json';
import attempt7 from './service/attempt7.json';
import attempt8 from './service/attempt8.json';
import attempt9 from './service/attempt9.json';
import attempt10 from './service/attempt10.json';
import attempt11 from './service/attempt11.json';
import attempt12 from './service/attempt12.json';
import attempt13 from './service/attempt13.json';
import attempt14 from './service/attempt14.json';
import attempt15 from './service/attempt15.json';
import attempt16 from './service/attempt16.json';
import { fetchFromLocalstorage } from './utils/util';
import { addClient, fetchClients, fetchEndPoints, createEndPoint } from './service/service';

export const clientsAPI = {
    clients: fetchFromLocalstorage('clients') || clientsData,
    all: function(cb) {
        //return this.clients
        fetchClients(cb);
    },
    get: function (id) {
        const isClient = client => client.client_id === id;
        return this.clients.find(isClient);
    },
    add: function(clientName, cb) {
        addClient(clientName, cb);
        // this.clients.push(client);
        // setToLocalstorage('clients', this.clients);
        // return new Promise((resolve, reject) => {
        //     resolve({});
        // });
    }
};

export const endPointsAPI = {
    endPoints: fetchFromLocalstorage('endpoints') || endPoints,
    all: function() { return this.endPoints },
    get: function (clientName, cb) {
        //const isEndPoint = endPoint => endPoint.client_id === clientId;
        //return this.endPoints.filter(isEndPoint);
        fetchEndPoints(clientName, cb);
    },
    add: function(clientName, endPointName, xmlData, jsonData, cb) {
        // this.endPoints.push(endpoint);
        // setToLocalstorage('endpoints', this.endPoints);
        // return new Promise((resolve, reject) => {
        //     resolve({});
        // });
        createEndPoint(clientName, endPointName, xmlData, jsonData, cb);
    },
    getEndPointById: function(endPointId) {
        const isEndPoint = endPoint => endPoint.endpoint_id === endPointId;
        return this.endPoints.find(isEndPoint);
    }
};

export const executionAPI = {
    executions: executions,
    all: function() { return this.executions },
    get: function (endPointId) {
        const isExecution = execution => execution.endpoint_id === endPointId;
        return this.executions.filter(isExecution);
        //return this.executions[endPointId];
    }
};

export const attemptsAPI = {
    attempts: [
        {...attempt1},
        {...attempt2},
        {...attempt3},
        {...attempt4},
        {...attempt5},
        {...attempt6},
        {...attempt7},
        {...attempt8},
        {...attempt9},
        {...attempt10},
        {...attempt11},
        {...attempt12},
        {...attempt13},
        {...attempt14},
        {...attempt15},
        {...attempt16}
    ],
    all: function() { return this.attempts },
    get: function (id) {
        const isAttempt = execution => execution.execution_id === id;
        return this.attempts.find(isAttempt);

    }
};