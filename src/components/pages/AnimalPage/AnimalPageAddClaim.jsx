import React from 'react';
import { Link } from 'react-router-dom';
import { DrizzleContext } from 'drizzle-react';

import isVeterinaryWrapper from '../../wrappers/IsVeterinaryWrapper/IsVeterinaryWrapper';
import Message from '../../shared/Message/Message';
import Explorer from '../../shared/Explorer/Explorer';

class AnimalAddClaim extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 1,
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

    handleSelect = (event) => {
        this.setState({
            select: event.target.value
        });
    }

    addClaim = (event) => {
        event.preventDefault();
        this.setState({
            transaction: this.context.drizzle.contracts.DoggyDoc.methods.addClaim.cacheSend(
                this.state.select, this.props.animalId, 0, {
                    from: this.context.drizzleState.accounts[0]
                }),
            sent: false,
            error: false
        });
    }

    tryAgain = () => {
        this.setState({
            transaction: false,
            sent: false,
            error: false
        });
    }

    render() {
        let content = <p className="text-center">We are loading your data...</p>;
        if (!this.props.isVetData.loading) {
            if (!this.props.isVetData.isVet) {
                content = <div className="text-center">
                    <p>You can not add claims because you are not registered as a Veterinary.</p>
                    <Link to="/veterinary" className="btn btn-outline-light mt-2" replace>Register</Link>                    
                </div>;
            } else {
                if (this.state.sent) {
                    if (!this.state.error) {
                        content = <Message 
                            messageClasses={['mb-0', 'mt-2']}
                            message={[
                                'Your transaction sent', 
                                'Your transaction:', 
                                <Explorer hash={this.state.hash} />,
                                <button className="btn btn-outline-light mt-2" onClick={this.tryAgain}>Add more</button>
                            ]} 
                            emoji="rocket" 
                            wrapperClasses={['mt-2', 'text-center']} 
                        />;
                    } else {
                        content = <Message 
                            messageClasses={['mb-0', 'mt-2']}
                            message={[
                                'Something went wrong.',
                                <button className="btn btn-outline-warning mt-2" onClick={this.tryAgain}>Try again</button>
                            ]} 
                            emoji="thinking" 
                            wrapperClasses={['mt-2', 'text-center']}
                        />;
                    }
                } else {
                    if (this.state.transaction !== false) {
                        content = <Message 
                            messageClasses={['mt-2']}
                            message="Sending transaction..." 
                            emoji="flash" 
                            wrapperClasses={['mt-2', 'text-center']}
                        />;                
                    } else {
                        content = <div className="text-center mt-2">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="claim">Confirm that:</label>
                                    <select className="form-control" id="claim" value={this.state.select} onChange={this.handleSelect}>
                                        <option value="1">This dog has high level of happiness</option>
                                        <option value="2">This dog can provide love</option>
                                        <option value="3">This dog got a shot of friendship</option>
                                    </select>
                                    <button className="btn btn-outline-light mt-3" onClick={this.addClaim}>Confirm</button>
                                </div>
                            </form>
                        </div>;
                    }
                }
            }
        }        

        return(
            <div className="mt-4 styled-card pl-5 pr-5">
                <h3 className="text-center">Add Claim</h3>
                {content}
            </div>
        );        
    }
}

AnimalAddClaim.contextType = DrizzleContext.Context;

export default isVeterinaryWrapper(AnimalAddClaim);