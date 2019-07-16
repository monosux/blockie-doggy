import React from 'react';
import { DrizzleContext } from 'drizzle-react';

import Message from '../../shared/Message/Message';

export default (WrappedComponent) => {
    class Web3Wrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                network_set: false,
                network_status: 0
            };
        }

        componentDidMount() {
            this.checkConnection();
        }

        componentDidUpdate() {
            this.checkConnection();
        }

        checkConnection = () => {
            if (!this.state.network_set && this.context.initialized) {
                if (Object.keys(this.context.drizzleState.contracts).length > 0) {
                    let initialized = true; 
                    for (let contract in this.context.drizzleState.contracts) {
                        if (!this.context.drizzleState.contracts[contract].initialized) initialized = false;
                    }
                    if (initialized) {
                        this.setState({
                            network_status: 1,
                            network_set: true
                        });
                    }             
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
            let content = <Message 
                message="Loading Web3..." 
                messageClasses={[]} 
                emoji="flash" 
                wrapperClasses={['mt-5', 'text-center', 'message']} 
            />;

            if (this.state.network_status == 2) {
                content = <Message 
                    message={[
                        'We can not connect to the Ethereum network.',
                        <React.Fragment>Please be sure that your browser connected to the Ethereum and you selected <b>Rinkeby Network</b>.</React.Fragment>
                    ]} 
                    messageClasses={['mt-2']} 
                    emoji="plug" 
                    wrapperClasses={['mt-5', 'text-center', 'message']} 
                />;                
            } else if (this.state.network_status == 1) {
                content = <WrappedComponent {...this.props} />;
            }

            return content;       
        }
    }

    Web3Wrapper.contextType = DrizzleContext.Context;

    return Web3Wrapper;
}