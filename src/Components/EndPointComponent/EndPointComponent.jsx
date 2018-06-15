import React, { Component } from 'react';
import {executionAPI, attemptsAPI, endPointsAPI} from "../../mockData";
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button, ButtonGroup, FormGroup, FormControl, InputGroup, Form  } from 'react-bootstrap';
import AttemptsComponent from './AttemptsComponent';
import './tree.css';
import Chart from '../../service/chart';
import myTreeData from '../../service/treedata.json';

function createExecution(endpointName, executionName) {
    let obj = {};
    obj.executionName = executionName;
    obj.endpointName = endpointName;
    return obj;
}

class EndPointComponent extends Component {
    constructor() {
        super();
        this.renderChart = this.renderChart.bind(this);
        this.createFormRows = this.createFormRows.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            currentChart: myTreeData,
            mode: 'execute_workflow',
            payLoad: {},
            payloadCounter: 1,
            isLoading: false,
            executionFieldValue: ''
        };
    }

    handleChange(e) {
        this.setState({ executionFieldValue: e.target.value });
    }

    setMode(mode) {
        this.setState({
            mode: mode
        })
    }

    renderChart(chart) {
        let arr = [];
        if(!chart.hasOwnProperty("name"))
            return;
        arr.push(chart);
        this.setState({
            mode: 'render_chart',
            currentChart: arr
        });
    }

    executeEndPoint() {
        const endpointName = this.props.match.params.endpointName;
        var execution = createExecution(endpointName, this.state.executionFieldValue);

        executionAPI.add(execution);
    }

    componentDidUpdate() {
        if(this.state.mode === 'render_chart')
            Chart().createChart("svg", myTreeData);
    }

    createFormRows = () => {
        let arr = [];
        let counter = this.state.payloadCounter;
        for(let i = 0; i < counter; i++) {
            arr.push(<FormGroup key={i} className="execution-form-item">
                <InputGroup>
                    <FormControl type="text" />
                    <FormControl type="text" className="item-content" />
                </InputGroup>
            </FormGroup>);
        }
        return arr;
    };

    addRow() {
        this.setState({
            payloadCounter: this.state.payloadCounter+1
        });
        console.log(this.state.payloadCounter);
    };

    render() {
        const endpointName = this.props.match.params.endpointName;
        const clientName = this.props.match.params.clientName;
        // const endpoint = executionAPI.get(endPointId);
        // if (!endpoint) {
        //     return <div>Sorry! but the endpoint was not found</div>
        // }
        //const client = endPointsAPI.getEndPointById(endPointId);
        const executions = executionAPI.get(endpointName);
        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col md={3} mdPush={3} className="left-panel">
                        <div>
                            <div className="left-panel-heading">
                                {endpointName && <Link className="back" to={`/client/${clientName}`}>&laquo;</Link>}
                                <span>{endpointName}</span>
                                <span title="Add Execution" className="add-element" onClick={() => this.setMode('execute_workflow')}>+</span>
                            </div>
                            <div>
                                { !executions.length && <div className="no-history">No Execution history found</div> }
                                { executions.length > 0 &&
                                    executions.map(obj => (
                                        <ul key={obj.execution_id} onClick={this.renderChart} className="executions">
                                            <li className="execution-name">{obj.name}</li>
                                            <li className="no-hover-effect attempts"><AttemptsComponent renderChart={this.renderChart} attempts={attemptsAPI.get(obj.executionName).attempts}/></li>
                                        </ul>
                                    ))
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={9} mdPull={9} className="right-panel">
                    {
                        this.state.mode === 'execute_workflow' &&
                        <div className="add-execution-form-container">
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="Enter Execution Name"
                                onChange={this.handleChange}
                            />
                            <div className="execution-form-title">Add Initial payload in key value pair</div>
                            <Form componentClass="fieldset" inline>
                                {this.createFormRows()}
                            </Form>
                            <Button bsStyle="primary" className="add-client" onClick={() => this.executeEndPoint()}>
                                Execute endpoint
                            </Button>
                            <Button bsStyle="primary" className="add-client add-form-row" onClick={() => this.addRow()}>+</Button>
                        </div>
                    }
                    {
                        executions.length > 0 &&
                        this.state.mode === 'render_chart' &&
                        <div>
                            <ButtonGroup vertical={true} className="execution-actions">
                                <Button bsStyle="success" bsSize="small">Resume</Button>
                                <Button bsStyle="primary" bsSize="small">Restart</Button>
                                <Button bsStyle="danger" bsSize="small" >Kill</Button>
                            </ButtonGroup>
                            <div>
                                <svg className="endpoint" width="960" height="600"><g/></svg>
                            </div>
                        </div>
                    }
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default EndPointComponent;