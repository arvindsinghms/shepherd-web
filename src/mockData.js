import clients from './service/clients.json';
import endPoints from './service/endPoints.json';
import attempt1 from './service/attempt1.json';
import attempt2 from './service/attempt2.json';
import attempt3 from './service/attempt3.json';
import attempt4 from './service/attempt4.json';

export const clientsAPI = {
    clients: [
        {number: 1, name: 'client 1'},
        {number: 2, name: 'client 2'},
        {number: 3, name: 'client 3'},
        {number: 4, name: 'client 4'}
    ],
    all: function() { return this.clients },
    get: function (id) {
        const isClient = client => client.number === id;
        return this.clients.find(isClient);
    }
};

export const endPointsAPI = {
    executions: [
        {number: 1, name: 'end point 1'},
        {number: 2, name: 'end point 2'},
        {number: 3, name: 'end point 3'}
    ],
    all: function() { return this.executions },
    get: function (id) {
        const isExecution = execution => execution.number === id;
        return this.executions.find(isExecution);
    }
};

export const executionAPI = {
    executions: [
        {number: 1, name: 'exe 1'},
        {number: 2, name: 'exe 2'},
        {number: 3, name: 'exe 3'}
    ],
    all: function() { return this.executions },
    get: function (id) {
        const isExecution = execution => execution.number === id;
        return this.executions.find(isExecution);
    }
};

export const attemptsAPI = {
    attempts: [
        {number: 1, name: 'attempt 1'},
        {number: 2, name: 'attempt 2'},
        {number: 3, name: 'attempt 3'}
    ],
    all: function() { return this.attempts },
    get: function (id) {
        console.log("called");
        //const isExecution = attempt => attempt.id === id;
        //return this.attempts.find(isExecution);
        return new Promise((resolve, reject) => {
            //resolve(isExecution.attempts);
            resolve(attempt4);
        });
    }
};