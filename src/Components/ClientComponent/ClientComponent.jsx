import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { clientsAPI, endPointsAPI } from '../../mockData';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import '../App.css';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

class ClientComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: ''
        };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        const clientId = this.props.match.params.clientId;
        const client = clientsAPI.get(
            parseInt(clientId, 10)
        );
        if (!client) {
            return <div>Sorry! but the client was not found</div>
        }
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={4} mdPush={4} className="left-panel">
                        <div>
                            <div className="left-panel-heading">{client.name}</div>
                            <ul>
                                {
                                    endPointsAPI.all().map(obj => (
                                        <li key={obj.number}>
                                            <Link className="exe-link" to={`/endpoint/${obj.number}`}>{obj.name}</Link>
                                            <Button className="xsmall-btn" bsStyle="primary" bsSize="xsmall">Data</Button>
                                            <Button className="xsmall-btn" bsStyle="primary" bsSize="xsmall">Visualise Graph</Button>
                                            <Button className="xsmall-btn" bsStyle="primary" bsSize="xsmall">Info</Button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Col>
                    <Col md={8} mdPull={8} className="right-panel">
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
                                        onChange={this.handleChange}
                                        value={this.state.value}
                                    />
                                    <FormGroup controlId="formControlsTextarea">
                                        <ControlLabel>Workflow Graph in XML format</ControlLabel>
                                        <FormControl componentClass="textarea" placeholder="textarea" />
                                    </FormGroup>
                                    <FormGroup controlId="formControlsTextarea">
                                        <ControlLabel>Endpoint Details in JSON format</ControlLabel>
                                        <FormControl componentClass="textarea" placeholder="textarea" />
                                    </FormGroup>
                                    <Button bsStyle="primary" className="add-client">
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