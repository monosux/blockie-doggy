import React from 'react';

import AnimalMetaWrapper from '../../wrappers/AnimalMetaWrapper/AnimalMetaWrapper';
import Message from '../../shared/Message/Message';
import AnimalPagePhoto from './AnimalPagePhoto';

class AnimalPageDescription extends React.Component {
    render() {
        let content = <Message 
            message="Loading meta data..."
            emoji="flash" 
            wrapperClasses={['text-center']} 
        />;

        if (!this.props.metaData.loading) {
            if (this.props.metaData.error) {
                content = <Message 
                    emoji="crying"
                    message="Something went wrong. We can not load meta data." 
                    wrapperClasses={['text-center']}
                />;
            } else {
                content = <React.Fragment>
                    <div className="row mt-4 styled-card styled-card-line">
                        <div className="col-md-4 align-self-center">
                            <AnimalPagePhoto photo={this.props.metaData.meta.image} />
                        </div>
                        <div className="col-md-8 align-self-center pt-4 pb-4">
                            <p>Dog name: {this.props.metaData.meta.name}</p>
                            <p>Dog breed: {this.props.metaData.meta.breed}</p>
                            <p>Dog sex: {this.props.metaData.meta.sex}</p>
                            <p className="mb-0">Dog date of birth: {this.props.metaData.meta.dob}</p>
                        </div>
                    </div>
                </React.Fragment>;
            }    
        }

        return content;
    }
}

export default AnimalMetaWrapper(AnimalPageDescription);