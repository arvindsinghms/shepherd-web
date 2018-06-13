import React, { Component } from 'react';
import {executionAPI} from "../../mockData";
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class AttemptsComponent extends Component {
    constructor(props) {
        super(props);
    }
    clickHandler(obj) {
        console.log("obj called");
        const { renderChart } = this.props;
        renderChart(obj);
    }
    render() {
        const attempts = this.props.attempts;
        return (
            <ul>
                {
                    attempts.map((obj, ind) => (
                        <li key={ind} className="attempt" onClick={() => this.clickHandler(obj)}>
                            Attempt {ind+1}
                        </li>
                    ))
                }
            </ul>
        )
    }
}

export default AttemptsComponent;