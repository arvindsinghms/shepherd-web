import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { clientsAPI } from '../../mockData';
import { Grid, Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';

class HomeComponent extends Component {
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
        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col md={3} mdPush={3} className="left-panel">
                        <div>
                            <div className="left-panel-heading">Registered Clients</div>
                            <ul>
                                {
                                    clientsAPI.all().map(obj => (
                                        <li key={obj.number}>
                                            <Link to={`/client/${obj.number}`} className="clients">{obj.name}</Link>
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
                                    <Button bsStyle="primary" className="add-client">
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