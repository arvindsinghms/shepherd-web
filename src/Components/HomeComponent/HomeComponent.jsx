import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { clientsAPI } from '../../mockData';
import { Grid, Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';

class HomeComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.addClient = this.addClient.bind(this);
        this.state = {
            value: '',
            clients: []
        };
    }

    componentDidMount() {
        clientsAPI.all((data) => {
            this.setState({
                clients: data
            })
        });
     }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    addClient() {
        let clientName = this.state.value;
        const cb = (client) => {
            this.setState({
                clients: [...this.state.clients, client],
                value: ''
            });
        };
        if(this.state.value.trim() !== '') {
            clientsAPI.add(clientName, cb);
        }
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
                                        <li key={obj.clientId}>
                                            <Link to={`/client/${obj.clientName}`} className="clients">{obj.clientName}</Link>
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