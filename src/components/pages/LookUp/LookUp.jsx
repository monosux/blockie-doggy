import React from 'react';
import { DrizzleContext } from 'drizzle-react';
import SimpleReactValidator from 'simple-react-validator';
import { Redirect } from 'react-router-dom';

import Web3Wrapper from '../../wrappers/Web3Warapper/Web3Wrapper';
import Message from '../../shared/Message/Message';

class LookUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            request: false,
            result: false,
            id: false,
            redirect: false      
        };

        this.validator = new SimpleReactValidator({
            locale: 'en',
            autoForceUpdate: this,
            element: (message) => <div className="alert alert-danger mt-1">{message}</div>
        });
    }

    componentDidMount() {
        this.setState({
            request: this.context.drizzle.contracts.DoggyDoc.methods.totalSupply.cacheCall()
        });        
    }

    componentDidUpdate() {
        if (
            typeof this.context.drizzleState.contracts.DoggyDoc.totalSupply[this.state.request] != 'undefined' && 
            (
                this.context.drizzleState.contracts.DoggyDoc.totalSupply[this.state.request].value != this.state.result ||
                this.state.loading
            )
        ) {                
            this.setState({
                result: this.context.drizzleState.contracts.DoggyDoc.totalSupply[this.state.request].value,
                loading: false
            });
        }        
    }

    handleInputChange = (event) => {
        this.setState({
            id: event.target.value
        });
    }

    handleForm = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            this.setState({
                redirect: true
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        let content = <Message 
            message="We are loading data..." 
            messageClasses={['mt-2']}  
            wrapperClasses={['mt-5', 'text-center', 'message']} 
        />;

        if (!this.state.loading) {
            if (this.state.redirect) {
                content = <Redirect to={'/animal/' + this.state.id} push />;
            } else {
                content = <form className="mt-5" method="post" action="#">
                    <div className="form-group">
                        <label htmlFor="dog-id">Enter a dog ID</label>
                        {this.validator.message('id', this.state.id, 'required|numeric|between:1,' + this.state.result + ',num')}
                        <input type="number" className="form-control" name="id" id="dog-id" value={this.state.id} onChange={this.handleInputChange} />
                        <small className="form-text text-muted">Availible IDs: from 1 till {this.state.result}</small>
                    </div>
                    <button type="submit" className="btn btn-outline-light mt-3" onClick={this.handleForm}>Lookup</button>
                </form>;
            }
        }

        return(
            <div className="text-center">
                <h1 className="mt-2">Lookup a dog</h1>
                {content}
            </div>            
        );        
    }
}

LookUp.contextType = DrizzleContext.Context;

export default Web3Wrapper(LookUp);