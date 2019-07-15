import React from 'react';
import { Link } from 'react-router-dom';

import AnimalWrapper from '../../wrappers/AnimalWrapper/AnimalWrapper';
import Message from '../../shared/Message/Message';
import Blockie from '../../shared/Blockie/Blockie';
import AnimalPageDescription from './AnimalPageDescription';
import AnimalPageAddClaim from './AnimalPageAddClaim';
import AnimalPageClaims from './AnimalPageClaims';

class AnimalPageWrapped extends React.Component {
    render() {
        let content = <Message 
            message="Loading animal data..." 
            messageClasses={['card-text']} 
            emoji="flash" 
            wrapperClasses={['mt-5', 'text-center', 'message']} 
        />;

        if (!this.props.animalData.loading) content = <React.Fragment>
            <AnimalPageDescription meta={this.props.animalData.meta} />
            <div className="mt-4 text-center styled-card">
                <h3>Owner</h3>  
                <Blockie wrapperClasses={['mb-1']} address={this.props.animalData.owner} size="50" />
                <Link to={'/animalsbyowner/' + this.props.animalData.owner} style={{ overflowWrap: 'break-word' }}>{this.props.animalData.owner}</Link>
            </div>
            <AnimalPageClaims animalId={this.props.animalId} />
            <AnimalPageAddClaim animalId={this.props.animalId} />
        </React.Fragment>;

        return content; 
    }
}

export default AnimalWrapper(AnimalPageWrapped);