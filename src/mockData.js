import clientsData from './service/clients.json';
import endpoints from './service/endPoints.json';
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
import { fetchFromLocalstorage, setToLocalstorage } from './utils/util';
import { addClient, fetchClients, fetchEndPoints, createEndPoint } from './service/service';

export const clientsAPI = {
    clients: fetchFromLocalstorage('clients') || clientsData,
    all: function(cb) {
        fetchClients(cb);
    },
    get: function (id) {
        const isClient = client => client.clientId === id;
        return this.clients.find(isClient);
    },
    add: function(clientName, cb) {
        addClient(clientName, cb);
    }
};

export const endPointsAPI = {
    endpoints: fetchFromLocalstorage('endpoints') || endpoints,
    all: function() { return this.endPoints },
    get: function (clientName, cb) {
        //const isEndPoint = endPoint => endPoint.clientId === clientId;
        //return this.endPoints.filter(isEndPoint);
        fetchEndPoints(clientName, cb);
    },
    add: function(clientName, endpointName, xmlData, jsonData, cb) {
        // this.endPoints.push(endpoint);
        // setToLocalstorage('endpoints', this.endPoints);
        createEndPoint(clientName, endpointName, xmlData, jsonData, cb);
    },
    getEndPointById: function(endpointId) {
        const isEndpoint = endpoint => endpoint.endpointId === endpointId;
        return this.endpoints.find(isEndpoint);
    }
};

export const attemptsAPI = {
    attempts: fetchFromLocalstorage('attempts') || [
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
        const isAttempt = attempt => attempt.executionId === id;
        return this.attempts.find(isAttempt);
    },
    add: function(attempt) {
        this.attempts.push(attempt);
        setToLocalstorage('attempts', this.attempts);
    }
};

export const executionAPI = {
    executions: fetchFromLocalstorage('executions') || executions,
    all: function() { return this.executions },
    get: function (endpointName) {
        const isExecution = execution => execution.endpointName === endpointName;
        return this.executions.filter(isExecution);
    },
    add: function(execution) {
        this.executions.push(execution);
        setToLocalstorage('executions', this.executions);

        // create default attempt

    }
};

