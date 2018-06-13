// IMPORT DATA FROM STATIC JSON FILE
import clients from './clients.json';

// COMPONENT
const simulateError = false;
/**
 * get all client
 * @returns {Promise<any>}
 */
export const fetchClients = () => {
    return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            if (simulateError) {
                reject('Failed to fetch list of zip codes');
            } else {
                resolve(clients);
            }
        }, 1000);
    });
};

/**
 * add new client
 * @param clientName
 * @returns {Promise<any>}
 */
export const addClient = (clientName) => {
    return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            if (simulateError) {
                reject('Failed to fetch list of zip codes');
            } else {
                resolve(clients);
            }
        }, 1000);
    });
};

/**
 * get all the endpoint for a client
 * @param clientId
 * @returns {Promise<any>}
 */
export const fetchEndPoints = (clientId) => {
    return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            if (simulateError) {
                reject('Failed to fetch list of zip codes');
            } else {
                resolve(clients);
            }
        }, 1000);
    });
};

/**
 * create endpoint
 * @param workflow_graph
 * @param endpoint_detail
 * @returns {Promise<any>}
 */
export const createEndPoint = (workflow_graph, endpoint_detail) => {
    return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            if (simulateError) {
                reject('Failed to fetch list of zip codes');
            } else {
                resolve(clients);
            }
        }, 1000);
    });
};

/**
 * fetch all the execution for the endpoint_id
 * @param endpoint_id
 * @returns {Promise<any>}
 */
export const fetchExecutions = (endpoint_id) => {
    return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            if (simulateError) {
                reject('Failed to fetch list of zip codes');
            } else {
                resolve(clients);
            }
        }, 1000);
    });
};

/**
 * execute workflow
 * @param client_name
 * @param endponit_name
 * @param payload
 * @returns {Promise<any>}
 */
export const executeWorkflow = (client_name, endpoint_name, payload) => {
    return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            if (simulateError) {
                reject('Failed to fetch list of zip codes');
            } else {
                resolve(clients);
            }
        }, 1000);
    });
};