import React from 'react';
import { DrizzleContext } from 'drizzle-react';

import AnimalIdCardBody from './AnimalIdCardBody';
import Message from '../Message/Message';
import AnimalWrapper from '../../wrappers/AnimalWrapper/AnimalWrapper';

class AnimalIdCard extends React.Component {
    render() {
        let content = <Message 
            message="Loading animal data..." 
            messageClasses={['card-text']} 
            emoji="flash" 
            wrapperClasses={['card-body', 'text-center']} 
        />;

        if (!this.props.animalData.loading) content = <AnimalIdCardBody 
            meta={this.props.animalData.meta} 
            owner={this.props.animalData.owner} 
            itemId={this.props.animalId}
        />;        

        return(
            <div className="col-md-4 mb-4">
                <div className="card mt-2 h-100">
                    {content}
                </div>
            </div>      
        );        
    }
}

AnimalIdCard.contextType = DrizzleContext.Context;

export default AnimalWrapper(AnimalIdCard);