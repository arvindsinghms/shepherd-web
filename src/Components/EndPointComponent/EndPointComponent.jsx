import React, { Component } from 'react';
import {executionAPI, attemptsAPI, endPointsAPI} from "../../mockData";
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button, ButtonGroup  } from 'react-bootstrap';
import AttemptsComponent from './AttemptsComponent';
import dagreD3 from 'dagre-d3';
import { select, zoom, zoomIdentity, event } from 'd3';
import './tree.css';

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
    }

    addNodes(graph, data){
        data.forEach((function(node){
            graph.setNode(node.name, {});
            // for()
            if(node.children && node.children.length){
                graph = this.addNodes(graph, node.children);
                node.children.forEach(function(child){
                    graph.setEdge(node.name, child.name, {label: child.name});
                });
            }
        }).bind(this));
        return graph;
    }

    getTreeData(){
        var g = new dagreD3.graphlib.Graph().setGraph({});
        g = this.addNodes(g, myTreeData);
        return g;
    }

    createChart(){
        var g = this.getTreeData();

        var svg = select("svg"),
            inner = svg.select("g");

        // Set up zoom support
        var zoomed = zoom().on("zoom", function() {
            inner.attr("transform", event.transform);
        });
        svg.call(zoomed);

        // Run the renderer. This is what draws the final graph.
        new dagreD3.render()(inner, g);

        // Center the graph
        var initialScale = 0.75;
        svg.call(zoomed.transform, zoomIdentity.translate((svg.attr("width") - g.graph().width * initialScale) / 2, 20).scale(initialScale));

        // Center the graph
        var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
        inner.attr("transform", "translate(" + xCenterOffset + ", 20)");
    }

    componentDidMount() {
        this.createChart();
    }

    render() {
        const endPointId = this.props.match.params.endPointId;
        const clientId = this.props.match.params.clientId;
        const execution = executionAPI.get(
            parseInt(endPointId, 10)
        );
        if (!execution) {
            return <div>Sorry! but the execution was not found</div>
        }
        const client = endPointsAPI.getEndPointById(endPointId);
        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col md={3} mdPush={3} className="left-panel">
                        <div>
                            <div className="left-panel-heading">{endPointId && <Link className="back" to={`/client/${clientId}`}>&laquo;</Link>}<span>{client.endpoint_name}</span></div>
                            <div>
                                {
                                    executionAPI.get(endPointId).map(obj => (
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
                        <ButtonGroup vertical={true} className="execution-actions">
                            <Button bsStyle="success" bsSize="small">Resume</Button>
                            <Button bsStyle="primary" bsSize="small">Restart</Button>
                            <Button bsStyle="danger" bsSize="small" >Kill</Button>
                        </ButtonGroup>
                        <div>
                            <svg width="960" height="600"><g/></svg>
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default EndPointComponent;