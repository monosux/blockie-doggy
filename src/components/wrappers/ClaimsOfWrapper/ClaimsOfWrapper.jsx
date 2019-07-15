import React from 'react';
import { DrizzleContext } from 'drizzle-react';

export default (WrappedComponent) => {
    class ClaimsOfWrapper extends React.Component {
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
                request: this.context.drizzle.contracts.DoggyDoc.methods.getIssuerClaims.cacheCall(this.props.vet)
            });
        }
    
        componentDidUpdate() {
            if (
                typeof this.context.drizzleState.contracts.DoggyDoc.getIssuerClaims[this.state.request] != 'undefined' && 
                (
                    this.context.drizzleState.contracts.DoggyDoc.getIssuerClaims[this.state.request].value != this.state.result ||
                    this.state.loading
                )
            ) {                
                this.setState({
                    result: this.context.drizzleState.contracts.DoggyDoc.getIssuerClaims[this.state.request].value,
                    loading: false
                });
            }
        }
    
        render() {
            return <WrappedComponent 
                claimsData={{
                    loading: this.state.loading,
                    claims: this.state.result
                }}
                {...this.props} 
            />;      
        }
    }

    ClaimsOfWrapper.contextType = DrizzleContext.Context;

    return ClaimsOfWrapper;
}