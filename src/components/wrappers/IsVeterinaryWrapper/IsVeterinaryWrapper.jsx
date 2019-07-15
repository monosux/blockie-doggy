import React from 'react';
import { DrizzleContext } from 'drizzle-react';

export default (WrappedComponent) => {
    class isVeteriniarWrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                request: false,
                result: false
            };
        }
    
        componentDidMount() {
            this.setState({
                request: this.context.drizzle.contracts.DoggyDoc.methods.isVet.cacheCall(this.context.drizzleState.accounts[0])
            });
        }
    
        componentDidUpdate() {
            if (
                typeof this.context.drizzleState.contracts.DoggyDoc.isVet[this.state.request] != 'undefined' && 
                (
                    this.context.drizzleState.contracts.DoggyDoc.isVet[this.state.request].value != this.state.result ||
                    this.state.loading
                )
            ) {                
                this.setState({
                    result: this.context.drizzleState.contracts.DoggyDoc.isVet[this.state.request].value,
                    loading: false
                });
            }
        }
    
        render() {
            return <WrappedComponent 
                isVetData={{
                    loading: this.state.loading,
                    isVet: this.state.result
                }}
                {...this.props} 
            />;      
        }
    }

    isVeteriniarWrapper.contextType = DrizzleContext.Context;

    return isVeteriniarWrapper;
}