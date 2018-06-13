import React, { Component } from 'react';
import {executionAPI, attemptsAPI, endPointsAPI} from "../../mockData";
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

    renderChart() {
        let chart;
        attemptsAPI.get(4).then((data) => {
            chart = data;
            this.setState({
                currentChart: chart
            });
        });

    }


    componentDidMount() {
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
            translate: {
                x: dimensions.width / 2,
                y: dimensions.height / 10
            }
        });
    }

    render() {
        const endPointId = this.props.match.params.endPointId;
        const endPoint = endPointsAPI.get(
            parseInt(endPointId, 10)
        );
        if (!endPoint) {
            return <div>Sorry! but the client was not found</div>
        }
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={4} mdPush={4} className="left-panel">
                        <div>
                            <div className="left-panel-heading">{endPoint.name}</div>
                            <div>
                                {
                                    executionAPI.all().map(obj => (
                                        <div key={obj.number} onClick={this.renderChart} className="no-hover-effect">
                                            <div>{obj.name}</div>
                                            <AttemptsComponent attempts={attemptsAPI.all()}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={8} mdPull={8} className="right-panel">
                        <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
                            <Tree
                                data={this.state.currentChart}
                                translate={this.state.translate}
                                orientation={'vertical'}
                                separation={separation}
                                textLayout={textLayout}
                            />
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default EndPointComponent;