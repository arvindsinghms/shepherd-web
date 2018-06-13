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
                                            <span>{obj.name} </span>
                                            <Link to={`/endpoint/${obj.number}`}>E</Link>
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
                                    <FormControl
                                        type="text"
                                        value={this.state.value}
                                        placeholder="Enter End Point Name"
                                        onChange={this.handleChange}
                                    />
                                    <br />
                                    <FieldGroup
                                        id="formControlsFile"
                                        type="file"
                                        label="Workflow graph : "
                                        help="Example block-level help text here."
                                    />
                                    <br />
                                    <FieldGroup
                                        id="formControlsFile"
                                        type="file"
                                        label="Endpoint details :"
                                        help="Example block-level help text here."
                                    />
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