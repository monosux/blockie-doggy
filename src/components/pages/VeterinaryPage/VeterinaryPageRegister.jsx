import React from 'react';
import { DrizzleContext } from 'drizzle-react';

import Message from '../../shared/Message/Message';
import Explorer from '../../shared/Explorer/Explorer';

class VeterinaryPageRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: false,
            hash: false,
            sent: false,
            error: false
        };
    }

    componentDidUpdate() {
        if (!this.state.sent && this.state.transaction !== false) {
            let transaction = this.context.drizzleState.transactions[this.context.drizzleState.transactionStack[this.state.transaction]];
            if (typeof transaction !== 'undefined') {
                this.setState({
                    sent: true,
                    error: transaction.status == 'error',
                    hash: this.context.drizzleState.transactionStack[this.state.transaction]
                });
            } 
        }
    }

    registerVet = () => {
        this.setState({
            transaction: this.context.drizzle.contracts.DoggyDoc.methods.registerAsVet.cacheSend({
                from: this.context.drizzleState.accounts[0]
            }),
            sent: false,
            error: false
        });
    }

    render() {
        let content = <div className="mt-5 text-center message">
            <button className="btn btn-outline-light" onClick={this.registerVet}>Register Now</button>
        </div>;

        if (this.state.sent) {
            if (!this.state.error) {
                content = <Message 
                    messageClasses={['mb-0', 'mt-2']}
                    message={[
                        'Your transaction sent', 
                        'Your transaction:', 
                        <Explorer hash={this.state.hash} />
                    ]} 
                    emoji="rocket" 
                    wrapperClasses={['mt-5', 'text-center', 'message']} 
                />;
            } else {
                content = <Message 
                    messageClasses={['mb-0', 'mt-2']}
                    message={[
                        'Something went wrong.',
                        'Try again',
                        <button className="btn btn-outline-warning mt-2" onClick={this.registerVet}>Register Now</button>
                    ]} 
                    emoji="thinking" 
                    wrapperClasses={['mt-5', 'text-center', 'message']}
                />;
            }
        } else {
            if (this.state.transaction !== false) {
                content = <Message 
                    messageClasses={['mt-2']}
                    message="Sending transaction..." 
                    emoji="flash" 
                    wrapperClasses={['mt-5', 'text-center', 'message']}
                />;                
            }
        }
       
        return content;        
    }
}

VeterinaryPageRegister.contextType = DrizzleContext.Context;

export default VeterinaryPageRegister;