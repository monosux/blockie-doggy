import React from 'react';
import { Link } from 'react-router-dom';

import AnimalsOfWrapper from '../../wrappers/AnimalsOfWrapper/AnimalsOfWrapper';
import AnimalList from '../../shared/AnimalList/AnimalList';
import Message from '../../shared/Message/Message';

class OwnerPageWrapped extends React.Component {
    render() {
        let content = <Message 
            message="We are loading your data..." 
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
                content = <React.Fragment>
                    <Message 
                        message="Hi! Here will be a list of your animals." 
                        messageClasses={['mt-2']} 
                        emoji="hi" 
                        wrapperClasses={['mt-5', 'text-center', 'message']} 
                    />
                    <div className="mt-5 text-center">
                        <Link to="/add-animal" className="btn btn-outline-light mr-2" replace>
                            Add your first one
                        </Link>
                    </div>
                </React.Fragment>;                
            } else {
                content = <AnimalList animals={this.props.ownerData.result} />;
            }
        }

        return content;      
    }
}

export default AnimalsOfWrapper(OwnerPageWrapped);