import React, { Component } from 'react';

class AttemptsComponent extends Component {

    clickHandler(obj, executionId) {
        const { renderChart } = this.props;
        renderChart(obj, executionId);
    }
    render() {
        const attempts = this.props.attemptObj || [];
        if(attempts.length <= 0) {
            return <div>No attempt has been performed yet</div>
        }

        return (
            <ul>
                {
                    attempts.map((obj, ind) => (
                        <li key={ind} className="attempt" onClick={() => this.clickHandler(obj.attempts[0], obj.executionId)}>
                            Attempt {ind+1}
                        </li>
                    ))
                }
            </ul>
        )
    }
}

export default AttemptsComponent;