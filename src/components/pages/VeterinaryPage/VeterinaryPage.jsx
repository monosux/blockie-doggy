import React from 'react';
import { DrizzleContext } from 'drizzle-react';

import Web3Wrapper from '../../wrappers/Web3Warapper/Web3Wrapper';
import isVeterinaryWrapper from '../../wrappers/IsVeterinaryWrapper/IsVeterinaryWrapper';
import Message from '../../shared/Message/Message';
import VeterinaryPageRegister from './VeterinaryPageRegister';
import VeterinaryPageClaims from './VeterinaryPageClaims';

class VeteriniarPage extends React.Component {
    render() {
        let content = <Message 
            message="We are loading your data..." 
            messageClasses={['mt-2']} 
            emoji="wizard" 
            wrapperClasses={['mt-5', 'text-center', 'message']} 
        />;

        if (!this.props.isVetData.loading) {
            if (!this.props.isVetData.isVet) {
                content = <React.Fragment>
                    <Message 
                        message="You are not registered as a Veterinary." 
                        messageClasses={['mt-2']} 
                        emoji="doc" 
                        wrapperClasses={['mt-5', 'text-center', 'message']} 
                    />
                    <VeterinaryPageRegister />
                </React.Fragment>;
            } else {
                content = <VeterinaryPageClaims vet={this.context.drizzleState.accounts[0]} />;              
            }
        }

        return content;        
    }
}

VeteriniarPage.contextType = DrizzleContext.Context;

export default Web3Wrapper(isVeterinaryWrapper(VeteriniarPage));