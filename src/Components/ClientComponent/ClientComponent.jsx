import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { clientsAPI, endPointsAPI } from '../../mockData';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, ButtonGroup } from 'react-bootstrap';
import '../App.css';
import {guid} from "../../utils/util";
import xml2js from "xml2js";
import { pd } from "pretty-data";
import Chart from "../../service/chart";
import myTreeData from '../../service/treedata.json';

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
            endPoints: (client && endPointsAPI.get(client.client_id)) || [],
            showData: false,
            showVisualization: false,
            currentEndpoint: ''
        };
    }

    handleNameChange(e) {
        this.setState({ nameValue: e.target.value });
    }

    handleXMLChange(e){
        this.setState({ XMLValue: e.target.value });
    }

    showData(endPoint){
        this.state.endPoints.map((function(ep){
            if(ep.endpoint_id === endPoint){
                var visualData = '<root><content><p xml:space="preserve">This is <b>some</b> content.</p></content></root>';
                xml2js.parseString(myTreeData, (function(err, result){
                    if(!err){
                        visualData = pd.json(JSON.stringify(myTreeData));
                    } else {

                    }
                }).bind(this));
                this.setState({
                    showData: true,
                    showVisualization: false,
                    currentEndpoint: ep.endpoint_name,
                    data: pd.xml('<root><content><p xml:space="preserve">This is <b>some</b> content.</p></content></root>'),
                    visualData: visualData
                })
            }
        }).bind(this));
    }

    showGraph(endPoint){
        this.state.endPoints.map((function(ep){
            if(ep.endpoint_id === endPoint){
                var visualData = '<root><content><p xml:space="preserve">This is <b>some</b> content.</p></content></root>';
                this.setState({
                    showData: false,
                    showVisualization: true,
                    currentEndpoint: ep.endpoint_name,
                    visualData: visualData
                });
                xml2js.parseString(visualData, (function(err, result){
                    if(!err){
                        // Chart().createChart("svg", myTreeData);
                    } else {

                    }
                }).bind(this));
            }
        }).bind(this));
    }

    componentDidUpdate(){
        if(this.state.showVisualization)
            Chart().createChart("svg", myTreeData);
    }

    deleteEndpoint(endPoint){
        // method stub
    }

    validateXML(e) {
        // sample xml: '<root><content><p xml:space="preserve">This is <b>some</b> content.</p></content></root>'
        try{
            xml2js.parseString(e.target.value, (function(err, result){
                if(!err){
                    this.setState({
                        XMLValue: pd.xml(e.target.value)
                    });
                }
            }).bind(this));
        } catch(err){
            console.log("xml parse fail", err);
        }
    }

    handleJSONChange(e) {
        this.setState({ JSONValue: e.target.value });
    }

    validateJSON(e) {
        try{
            var isValidJSON = JSON.parse(e.target.value);
            console.log(isValidJSON);
        } catch(err){
            console.log("json fail", err);
        }
    }

    showAddEndpoint(){
        this.setState({
            showData: false,
            showVisualization: false,
            currentEndpoint: ''
        });
    }

    addEndPoint(client) {
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
                                <span title="Add Endpoint" className="add-element" onClick={this.showAddEndpoint.bind(this)}>+</span>
                            </div>
                            { !isEndPointAvailable && <div className="no-history">No Endpoint Available</div> }
                            { isEndPointAvailable > 0 &&
                                <ul>
                                    {
                                        this.state.endPoints.map(obj => (
                                            <li key={obj.endpoint_id}>
                                                <span className="end-point">{obj.endpoint_name}</span>
                                                <ButtonGroup>
                                                    <Button className="xsmall-btn" bsStyle="default" bsSize="xsmall" onClick={this.showData.bind(this, obj.endpoint_id)}>Data</Button>
                                                    <Button className="xsmall-btn" bsStyle="primary" bsSize="xsmall" onClick={this.showGraph.bind(this, obj.endpoint_id)}>Visualise Graph</Button>
                                                    <Button className="xsmall-btn execute" bsStyle="info" bsSize="small"><Link to={`/client/${clientId}/${obj.endpoint_id}`}>Executions</Link></Button>
                                                    <Button className="xsmall-btn delete" bsStyle="danger" bsSize="small" onClick={this.deleteEndpoint.bind(this, obj.endpoint_id)}>Delete</Button>
                                                </ButtonGroup>
                                            </li>
                                        ))
                                    }
                                </ul>
                            }
                        </div>
                    </Col>
                    <Col md={9} mdPull={9} className="right-panel">
                        {
                            this.state.showData &&
                            <div>
                                <div className="right-panel-heading">Data for `{this.state.currentEndpoint}`</div>
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
                                            value={this.state.currentEndpoint}
                                        />
                                        <FormGroup controlId="formControlsTextarea">
                                            <ControlLabel>Workflow Graph in XML format</ControlLabel>
                                            <FormControl
                                                componentClass="textarea"
                                                placeholder="textarea"
                                                rows="15"
                                                onChange={this.handleXMLChange}
                                                onBlur={this.validateXML.bind(this)}
                                                value={this.state.data}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="formControlsTextarea">
                                            <ControlLabel>Endpoint Details in JSON format</ControlLabel>
                                            <FormControl
                                                componentClass="textarea"
                                                placeholder="textarea"
                                                rows="25"
                                                onChange={this.handleJSONChange}
                                                onBlur={this.validateJSON}
                                                value={this.state.visualData}
                                            />
                                        </FormGroup>
                                    </FormGroup>
                                </form>
                                <div style={{textAlign: "right"}}>
                                    <Button bsStyle="primary" className="update-endpoint" disabled>Update</Button>
                                    <p style={{fontSize: "10px"}}><i>*Update is currently disabled</i></p>
                                </div>
                            </div>
                        }
                        {
                            this.state.showVisualization &&
                            <div>
                                <div className="right-panel-heading">Visualization for `{this.state.currentEndpoint}`</div>
                                <svg width="960" height="600"><g/></svg>
                            </div>
                        }
                        {
                            !(this.state.showData || this.state.showVisualization) &&
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
                                                onBlur={this.validateXML.bind(this)}
                                                value={this.state.XMLValue}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="formControlsTextarea">
                                            <ControlLabel>Endpoint Details in JSON format</ControlLabel>
                                            <FormControl
                                                componentClass="textarea"
                                                placeholder="textarea"
                                                onChange={this.handleJSONChange}
                                                onBlur={this.validateJSON}
                                                value={this.state.JSONValue}
                                            />
                                        </FormGroup>
                                        <Button bsStyle="primary" className="add-client" onClick={() => this.addEndPoint(client)}>
                                            Add Endpoint
                                        </Button>
                                    </FormGroup>
                                </form>
                            </div>
                        }
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default ClientComponent;