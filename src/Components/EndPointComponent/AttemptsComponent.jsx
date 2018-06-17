import React, { Component } from 'react';

class AttemptsComponent extends Component {

    clickHandler(obj) {
        const { renderChart } = this.props;
        renderChart(obj);
    }
    render() {
        const attempts = this.props.attemptObj.attempts || [];
        if(attempts.length <= 0) {
            return <div>No attempt has been performed yet</div>
        }

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