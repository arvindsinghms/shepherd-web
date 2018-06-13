import React, { Component } from 'react';
import {executionAPI} from "../../mockData";
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class AttemptsComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const attempts = this.props.attempts;
        return (
            <ul>
                {
                    attempts.map(obj => (
                        <li key={obj.number}>
                            {obj.name}
                        </li>
                    ))
                }
            </ul>
        )
    }
}

export default AttemptsComponent;