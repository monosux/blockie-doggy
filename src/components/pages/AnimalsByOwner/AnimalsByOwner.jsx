import React from 'react';
import { DrizzleContext } from 'drizzle-react';

import Web3Wrapper from '../../wrappers/Web3Warapper/Web3Wrapper';
import AnimalsByOwnerWrapped from './AnimalsByOwnerWrapped';

class AnimalsByOwner extends React.Component {
    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return(
            <React.Fragment>
                <div className="mb-4 mt-4 text-center">
                    <button className="btn btn-outline-light" onClick={this.goBack}>Go Back</button>
                </div>
                <h1 className="text-center">Animals of:</h1>
                <h4 className="text-center" style={{ overflowWrap: 'break-word' }}>
                    {this.props.match.params.owner}
                </h4>
                <AnimalsByOwnerWrapped owner={this.props.match.params.owner} />
            </React.Fragment>           
        );        
    }
}

AnimalsByOwner.contextType = DrizzleContext.Context;

export default Web3Wrapper(AnimalsByOwner);