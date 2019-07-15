import React from 'react';

import AnimalList from '../../shared/AnimalList/AnimalList';
import Message from '../../shared/Message/Message';
import AnimalsOfWrapper from '../../wrappers/AnimalsOfWrapper/AnimalsOfWrapper';

class AnimalsByOwnerWrapper extends React.Component {
    render() {
        let content = <Message 
            message="We are loading user data..." 
            messageClasses={['mt-2']} 
            emoji="wizard" 
            wrapperClasses={['mt-5', 'text-center', 'message']} 
        />;

        if (!this.props.ownerData.loading) {
            if (!this.props.ownerData.valid_address) {
                content = <Message 
                    message="Looks like given address is not valid." 
                    messageClasses={['mt-2']} 
                    emoji="thinking" 
                    wrapperClasses={['mt-5', 'text-center', 'message']} 
                />;
            } else if (this.props.ownerData.result.length == 0) {
                content = <Message 
                    message="User does not have any animals yet." 
                    messageClasses={['mt-2']} 
                    emoji="search" 
                    wrapperClasses={['mt-5', 'text-center', 'message']} 
                />;                
            } else {
                content = <AnimalList animals={this.props.ownerData.result} />;
            }
        }

        return content;      
    }
}

export default AnimalsOfWrapper(AnimalsByOwnerWrapper);