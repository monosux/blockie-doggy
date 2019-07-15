import React from 'react';

import Web3Wrapper from '../../wrappers/Web3Warapper/Web3Wrapper';
import ClaimsByVeterinaryClaims from './ClaimsByVeterinaryClaims';

class ClaimsByVeterinary extends React.Component {
    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return(
            <React.Fragment>
                <div className="mb-4 mt-4 text-center">
                    <button className="btn btn-outline-light" onClick={this.goBack}>Go Back</button>
                </div>               
                <h1 className="text-center">Claims of:</h1>
                <h4 className="text-center mb-3" style={{ overflowWrap: 'break-word' }}>
                    {this.props.match.params.vet}
                </h4>
                <ClaimsByVeterinaryClaims vet={this.props.match.params.vet} />
            </React.Fragment>            
        );        
    }
}

export default Web3Wrapper(ClaimsByVeterinary);