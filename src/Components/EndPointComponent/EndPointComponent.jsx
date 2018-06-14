import React, { Component } from 'react';
import {executionAPI, attemptsAPI, endPointsAPI} from "../../mockData";
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import AttemptsComponent from './AttemptsComponent';
import Tree from 'react-d3-tree';

const myTreeData = [
    {
        name: 'Trigger delete from CX page',
        attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
        },
        nodeSvgShape: {
            shape: 'circle',
            shapeProps: {
                r: 10,
                fill: 'green'
            }
        },
        children: [
            {
                name: 'Trigger delete from visits page',
                attributes: {
                    keyA: 'val A',
                    keyB: 'val B',
                    keyC: 'val C',
                },
                nodeSvgShape: {
                    shape: 'circle',
                    shapeProps: {
                        r: 10,
                        fill: 'green'
                    }
                },
                children: [
                    {
                        name: 'Trigger delete from drives page',
                        attributes: {
                            keyA: 'val A',
                            keyB: 'val B',
                            keyC: 'val C',
                        },
                        nodeSvgShape: {
                            shape: 'circle',
                            shapeProps: {
                                r: 10,
                                fill: 'green'
                            }
                        },
                        children: [
                            {
                                name: 'Trigger delete from expense page',
                                attributes: {
                                    keyA: 'val A',
                                    keyB: 'val B',
                                    keyC: 'val C',
                                },
                                nodeSvgShape: {
                                    shape: 'circle',
                                    shapeProps: {
                                        r: 10,
                                        fill: 'green'
                                    }
                                },
                                children: [
                                    {
                                        name: 'Process Done',
                                        attributes: {
                                            keyA: 'val A',
                                            keyB: 'val B',
                                            keyC: 'val C',
                                        },
                                        nodeSvgShape: {
                                            shape: 'circle',
                                            shapeProps: {
                                                r: 10,
                                                fill: 'green'
                                            }
                                        }
                                    },
                                    {
                                        name: 'Process Done',
                                        attributes: {
                                            keyA: 'val A',
                                            keyB: 'val B',
                                            keyC: 'val C',
                                        },
                                        nodeSvgShape: {
                                            shape: 'circle',
                                            shapeProps: {
                                                r: 10,
                                                fill: 'green'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Level 2: B',
                attributes: {
                    keyA: 'val A',
                    keyB: 'val B',
                    keyC: 'val C',
                },
                nodeSvgShape: {
                    shape: 'circle',
                    shapeProps: {
                        r: 10,
                        fill: 'green'
                    }
                },
                children: [
                    {
                        name: 'Process Done',
                        attributes: {
                            keyA: 'val A',
                            keyB: 'val B',
                            keyC: 'val C',
                        },
                        nodeSvgShape: {
                            shape: 'circle',
                            shapeProps: {
                                r: 10,
                                fill: 'green'
                            }
                        }
                    },
                    {
                        name: 'Process Done',
                        attributes: {
                            keyA: 'val A',
                            keyB: 'val B',
                            keyC: 'val C',
                        },
                        nodeSvgShape: {
                            shape: 'circle',
                            shapeProps: {
                                r: 10,
                                fill: 'green'
                            }
                        }
                    }
                ]
            }
        ]
    },
];

const containerStyles = {
    width: '100%',
    height: '100vh',
};

const separation = {
    siblings: 2,
    nonSiblings: 2
};

const textLayout = {
    textAnchor: "start",
    x: 20,
    y: -10,
    transform: undefined
};


class EndPointComponent extends Component {
    constructor() {
        super();
        this.renderChart = this.renderChart.bind(this);
        this.state = {
            currentChart: myTreeData
        };
    }

    renderChart(chart) {
        let arr = [];
        if(!chart.hasOwnProperty("name"))
            return;
        arr.push(chart);
        this.setState({
            currentChart: arr
        });
        // let chart;
        // attemptsAPI.get(4).then((data) => {
        //     chart = data;
        //     this.setState({
        //         currentChart: chart
        //     });
        // });
    }

    sortableTreeChange(treeData ){
        console.log(treeData);
        this.setState({ treeData });
    }

    componentDidMount() {
        const dimensions = (this.treeContainer && this.treeContainer.getBoundingClientRect()) || 100;
        this.setState({
            translate: {
                x: dimensions.width / 2,
                y: dimensions.height / 10
            }
        });
    }

    render() {
        const endPointId = this.props.match.params.endPointId;
        const clientId = this.props.match.params.clientId;
        const endpoint = executionAPI.get(endPointId);
        if (!endpoint) {
            return <div>Sorry! but the endpoint was not found</div>
        }
        const client = endPointsAPI.getEndPointById(endPointId);
        const executions = executionAPI.get(endPointId);
        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col md={3} mdPush={3} className="left-panel">
                        <div>
                            <div className="left-panel-heading">{endPointId && <Link className="back" to={`/client/${clientId}`}>&laquo;</Link>}<span>{client.endpoint_name}</span></div>
                            <div>
                                { !executions.length && <div className="no-history">No Execution history found</div> }
                                { executions.length > 0 &&
                                    executions.map(obj => (
                                        <ul key={obj.execution_id} onClick={this.renderChart} className="executions">
                                            <li className="execution-name">{obj.name}</li>
                                            <li className="no-hover-effect attempts"><AttemptsComponent renderChart={this.renderChart} attempts={attemptsAPI.get(obj.execution_id).attempts}/></li>
                                        </ul>
                                    ))
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={9} mdPull={9} className="right-panel">
                        {
                            executions.length > 0 &&
                            <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
                                <Tree
                                    data={this.state.currentChart}
                                    translate={this.state.translate}
                                    orientation={'vertical'}
                                    separation={separation}
                                    textLayout={textLayout}
                                />
                            </div>
                        }
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default EndPointComponent;