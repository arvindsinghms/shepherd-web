// IMPORT DATA FROM STATIC JSON FILE

// COMPONENT
const simulateError = false;
const registerClientUrl = "http://ec2-54-173-37-0.compute-1.amazonaws.com:8080/shephard-core/register/client";
const fetchClientsUrl = "http://ec2-54-173-37-0.compute-1.amazonaws.com:8080/shephard-core/retrieve/client";
const fetchEndpointsUrl = "http://ec2-54-173-37-0.compute-1.amazonaws.com:8080/shephard-core/retrieve/endpoints";
const createEndpointUrl = "http://ec2-54-173-37-0.compute-1.amazonaws.com:8080/shephard-core/register/endpoint";
/**
 * get all client
 * @returns {Promise<any>}
 */
export const fetchClients = (cb) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const res = JSON.parse(xhttp.responseText);
            if(typeof cb === 'function')
                cb(res.message);
        }
    };

    xhttp.open("GET", fetchClientsUrl, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
};

/**
 * add new client
 * @param clientName
 * @returns {Promise<any>}
 */
export const addClient = (clientName, cb) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const res = {
                clientName: clientName,
                clientId: JSON.parse(xhttp.responseText).clientId
            };
            if(typeof cb === 'function')
                cb(res);
        }
    };
    xhttp.open("POST", registerClientUrl, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({"clientName": clientName}));
};

/**
 * get all the endpoint for a client
 * @param clientId
 * @returns {Promise<any>}
 */
export const fetchEndPoints = (clientName, cb) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const res = JSON.parse(xhttp.responseText);
            if(typeof cb === 'function')
                cb(res.message);
        }
    };
    const url = fetchEndpointsUrl + "?clientName=" + clientName;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
};

/**
 * create endpoint
 * @param workflow_graph
 * @param endpoint_detail
 * @returns {Promise<any>}
 */
export const createEndPoint = (clientName, endpointName, graphDetails, nodesDetails, cb) => {
    var xhttp = new XMLHttpRequest();
    const req = {
        clientName: clientName,
        endpointName: endpointName,
        graphDetails: graphDetails,
        nodesDetails: nodesDetails
    }
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const res = {
                endpointName: endpointName,
                clientName: clientName
            };
            if(typeof cb === 'function')
                cb(res);
        }
    };
    xhttp.open("POST", createEndpointUrl, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(req));
};

/**
 * fetch all the execution for the endpoint_id
 * @param endpoint_id
 * @returns {Promise<any>}
 */
export const fetchExecutions = (endpoint_id) => {

};

/**
 * execute workflow
 * @param client_name
 * @param endponit_name
 * @param payload
 * @returns {Promise<any>}
 */
export const executeWorkflow = (client_name, endpoint_name, payload) => {

};