import React from 'react';

import AnimalMetaWrapper from '../../wrappers/AnimalMetaWrapper/AnimalMetaWrapper';
import Message from '../Message/Message';
import AnimalIdCardPhoto from './AnimalIdCardPhoto';

class AnimalIdCardMeta extends React.Component {
    render() {
        let content = <Message 
            message="Loading meta data..." 
            messageClasses={['card-text']} 
            wrapperClasses={['card-body', 'text-center']} 
        />;

        if (!this.props.metaData.loading) {
            if (this.props.metaData.error) {
                content = <Message 
                    emoji="crying"
                    message={['Something went wrong.', 'We can not load meta data.']} 
                    messageClasses={['card-text']} 
                    wrapperClasses={['card-body', 'text-center']}
                />;
            } else {
                content = <React.Fragment>
                    <div className="card-body text-center">
                        <h5 className="card-title mb-0">{this.props.metaData.meta.name}</h5>
                    </div>
                    <AnimalIdCardPhoto photo={this.props.metaData.meta.image} />
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Breed: {this.props.metaData.meta.breed}</li>
                        <li className="list-group-item">Date of Birth: {this.props.metaData.meta.dob}</li>
                        <li className="list-group-item">Sex: {this.props.metaData.meta.sex}</li>
                    </ul>
                </React.Fragment>;
            }    
        }

        return content;      
    }
}

export default AnimalMetaWrapper(AnimalIdCardMeta);