import React from 'react';

import AnimalPageWrapped from './AnimalPageWrapped';
import Web3Wrapper from '../../wrappers/Web3Warapper/Web3Wrapper';

class AnimalPage extends React.Component {
    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return(
            <React.Fragment>
                <div className="mb-4 mt-4 text-center">
                    <button className="btn btn-outline-light" onClick={this.goBack}>Go Back</button>
                </div>
                <h1 className="text-center">Animal #{this.props.match.params.id}</h1>
                <AnimalPageWrapped animalId={this.props.match.params.id} meta={true} owner={true} />
            </React.Fragment> 
        );        
    }
}

export default Web3Wrapper(AnimalPage);