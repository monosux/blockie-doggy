import React from 'react';
import { DrizzleContext } from 'drizzle-react';

export default (WrappedComponent) => {
    class AnimalsOfWrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                request: false,
                result: [],
                loading: true,
                valid_address: true
            };
        }
    
        componentDidMount() {
            if (this.context.drizzle.web3.utils.isAddress(this.props.owner)) {
                this.setState({
                    request: this.context.drizzle.contracts.DoggyDoc.methods.tokensOf.cacheCall(this.props.owner)
                });
            } else {
                this.setState({
                    valid_address: false,
                    loading: false,
                });
            }
        }
    
        componentDidUpdate() {
            if (
                this.state.valid_address &&
                this.state.loading &&
                typeof this.context.drizzleState.contracts.DoggyDoc.tokensOf[this.state.request] != 'undefined'
            ) {
                this.setState({
                    result: this.context.drizzleState.contracts.DoggyDoc.tokensOf[this.state.request].value,
                    loading: false
                });
            }
        }
    
        render() {
            return <WrappedComponent 
                ownerData={{
                    loading: this.state.loading,
                    valid_address: this.state.valid_address,
                    result: this.state.result
                }}
                {...this.props} 
            />;      
        }
    }

    AnimalsOfWrapper.contextType = DrizzleContext.Context;

    return AnimalsOfWrapper;
}