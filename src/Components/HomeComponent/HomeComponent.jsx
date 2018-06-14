import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { clientsAPI } from '../../mockData';
import { Grid, Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';

import { guid } from '../../utils/util';

function createClient(clientName) {
    let obj = {};
    obj.client_id = guid();
    obj.client_name = clientName;
    obj.created_at = new Date();
    obj.updated_at = new Date();
    obj.created_by = "Hitesh";

    return obj;
}

class HomeComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.addClient = this.addClient.bind(this);
        this.state = {
            value: '',
            clients: clientsAPI.all()
        };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    addClient() {
        let client = createClient(this.state.value);
        clientsAPI.add(client).then(() => {
            this.setState({
                clients: clientsAPI.all(),
                value: ''
            });
        })
    }

    render() {
        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col md={3} mdPush={3} className="left-panel">
                        <div>
                            <div className="left-panel-heading">
                                <span>Registered Clients</span>
                                <span title="Register New Client" className="add-element">+</span>
                            </div>
                            <ul>
                                {
                                    this.state.clients.map(obj => (
                                        <li key={obj.client_id}>
                                            <Link to={`/client/${obj.client_id}`} className="clients">{obj.client_name}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </Col>
                    <Col md={9} mdPull={9} className="right-panel">
                        <div>
                            <div className="right-panel-heading">Register New Client</div>
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                >
                                    <br />
                                    <FormControl
                                        type="text"
                                        value={this.state.value}
                                        placeholder="Enter Client Name"
                                        onChange={this.handleChange}
                                    />
                                    <Button bsStyle="primary" className="add-client" onClick={this.addClient}>
                                        Register Client
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

export default HomeComponent;