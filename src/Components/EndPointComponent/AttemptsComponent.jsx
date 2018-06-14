import React, { Component } from 'react';

class AttemptsComponent extends Component {
    constructor(props) {
        super(props);
    }
    clickHandler(obj) {
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