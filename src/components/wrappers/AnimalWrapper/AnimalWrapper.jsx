import React from 'react';
import { DrizzleContext } from 'drizzle-react';

export default (WrappedComponent) => {
    class AnimalWrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                request_owner: false,
                request_uri: false,
                result_owner: false,
                result_uri: false
            };
        }
    
        componentDidMount() {
            this.setState({
                request_owner: this.context.drizzle.contracts.DoggyDoc.methods.ownerOf.cacheCall(this.props.animalId),
                request_uri: this.context.drizzle.contracts.DoggyDoc.methods.tokenURI.cacheCall(this.props.animalId)
            });
        }
    
        componentDidUpdate() {
            if (
                typeof this.context.drizzleState.contracts.DoggyDoc.ownerOf[this.state.request_owner] != 'undefined' && 
                typeof this.context.drizzleState.contracts.DoggyDoc.tokenURI[this.state.request_uri] != 'undefined' &&
                this.state.loading
            ) {
                this.setState({
                    result_owner: this.context.drizzleState.contracts.DoggyDoc.ownerOf[this.state.request_owner].value,
                    result_uri: this.context.drizzleState.contracts.DoggyDoc.tokenURI[this.state.request_uri].value,
                    loading: false
                });
            }
        }
    
        render() {
            return <WrappedComponent 
                animalData={{
                    loading: this.state.loading,
                    owner: this.state.result_owner,
                    meta: this.state.result_uri
                }}
                {...this.props} 
            />;      
        }
    }

    AnimalWrapper.contextType = DrizzleContext.Context;

    return AnimalWrapper;
}