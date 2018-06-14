import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { clientsAPI, endPointsAPI } from '../../mockData';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, ButtonGroup } from 'react-bootstrap';
import '../App.css';
import {guid} from "../../utils/util";

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

function createEndPoint(clientId, endpointName) {
    let obj = {};
    obj.endpoint_name = endpointName;
    obj.endpoint_id = guid();
    obj.client_id = clientId;
    obj.workflow_graph = "workflow graph";
    obj.endpoints_details = "endpoints details"
    obj.created_at = new Date();
    obj.updated_at = new Date();
    obj.created_by = "Hitesh";

    return obj;
}

class ClientComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleXMLChange = this.handleXMLChange.bind(this);
        this.handleJSONChange = this.handleJSONChange.bind(this);
        //this.addEndPoint = this.addEndPoint.bind(this);
        const clientId = this.props.match.params.clientId;
        const client = clientsAPI.get(clientId);
        this.state = {
            nameValue: '',
            XMLValue: '',
            JSONValue: '',
            endPoints: (client && endPointsAPI.get(client.client_id)) || []
        };
    }

    handleNameChange(e) {
        this.setState({ nameValue: e.target.value });
    }

    handleXMLChange(e) {
        this.setState({ XMLValue: e.target.value });
    }

    handleJSONChange(e) {
        this.setState({ JSONValue: e.target.value });
    }

    addEndPoint(client) {
        console.log(client);
        let endpoint = createEndPoint(client.client_id, this.state.nameValue);
        endPointsAPI.add(endpoint).then(() => {
            this.setState({
                endPoints: endPointsAPI.get(client.client_id),
                nameValue: '',
                XMLValue: '',
                JSONValue: ''
            });
        });
    }

    render() {
        const clientId = this.props.match.params.clientId;
        const client = clientsAPI.get(clientId);
        if (!client) {
            return <div>Sorry! but the client was not found</div>
        }

        const isEndPointAvailable = this.state.endPoints.length;
        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col md={3} mdPush={9} className="left-panel">
                        <div>
                            <div className="left-panel-heading">
                                {clientId && <Link className="back" to="/">&laquo;</Link>}
                                <span>{client.client_name}</span>
                                <span title="Add Endpoint" className="add-element">+</span>
                            </div>
                            { !isEndPointAvailable && <div className="no-history">No Endpoint Available</div> }
                            { isEndPointAvailable > 0 &&
                                <ul>
                                    {
                                        this.state.endPoints.map(obj => (
                                            <li key={obj.endpoint_id}>
                                                <span className="end-point">{obj.endpoint_name}</span>
                                                <ButtonGroup>
                                                    <Button className="xsmall-btn" bsStyle="default" bsSize="xsmall">Data</Button>
                                                    <Button className="xsmall-btn" bsStyle="primary" bsSize="xsmall">Visualise Graph</Button>
                                                    <Button className="xsmall-btn execute" bsStyle="info" bsSize="small"><Link to={`/client/${clientId}/${obj.endpoint_id}`}>Executions</Link></Button>
                                                </ButtonGroup>
                                            </li>
                                        ))
                                    }
                                </ul>
                            }
                        </div>
                    </Col>
                    <Col md={9} mdPull={9} className="right-panel">
                        <div>
                            <div className="right-panel-heading">Add New End Point</div>
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                >
                                    <br />
                                    <FieldGroup
                                        id="formControlsText"
                                        type="text"
                                        label="Enter Endpoint name"
                                        placeholder="Endpoint name"
                                        onChange={this.handleNameChange}
                                        value={this.state.nameValue}
                                    />
                                    <FormGroup controlId="formControlsTextarea">
                                        <ControlLabel>Workflow Graph in XML format</ControlLabel>
                                        <FormControl
                                            componentClass="textarea"
                                            placeholder="textarea"
                                            onChange={this.handleXMLChange}
                                            value={this.state.XMLValue}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId="formControlsTextarea">
                                        <ControlLabel>Endpoint Details in JSON format</ControlLabel>
                                        <FormControl
                                            componentClass="textarea"
                                            placeholder="textarea"
                                            onChange={this.handleJSONChange}
                                            value={this.state.JSONValue}
                                        />
                                    </FormGroup>
                                    <Button bsStyle="primary" className="add-client" onClick={() => this.addEndPoint(client)}>
                                        Add Endpoint
                                    </Button>
                                </FormGroup>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default ClientComponent;