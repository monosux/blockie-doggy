import React from 'react';
import { Link } from 'react-router-dom';
import { DrizzleContext } from 'drizzle-react';
import classNames from 'classnames';

class Header extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            network_set: false,
            network_status: 0
		};
	}

    componentDidUpdate() {        
        if (!this.state.network_set && this.context.initialized) {
            if (Object.keys(this.context.drizzleState.contracts).length > 0) {
                this.setState({
                    network_status: 1,
                    network_set: true
                });                
            } else {
                if (this.state.network_status != 2) {
                    this.setState({
                        network_status: 2
                    });
                }                 
            }
        }
    }

    render() {
        let network_status = [
            'Connecting...',
            'Connected',
            'Network error'
        ];

        let badge_class = ['badge', 'mt-2', 'mb-2'];

        if (this.state.network_status == 0) badge_class.push('badge-warning');
        if (this.state.network_status == 1) badge_class.push('badge-success');
        if (this.state.network_status == 2) badge_class.push('badge-danger');

        return(
            <div className="header">
                <div className="line"></div>
                <div className="container">
                    <Link to="/" className="nav-link" replace>
                        <span role="img" aria-label="dog">🐶</span>
                    </Link>
                    <span 
                        className={classNames(...badge_class)}>
                        {network_status[this.state.network_status]}
                    </span>
                </div>
            </div>           
        );        
    }
}

Header.contextType = DrizzleContext.Context;

export default Header;