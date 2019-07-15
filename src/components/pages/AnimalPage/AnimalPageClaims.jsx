import React from 'react';
import { DrizzleContext } from 'drizzle-react';

import Message from '../../shared/Message/Message';
import Claim from '../../shared/Claim/Claim';

class AnimalPageClaims extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            request: false,
            result: false
        };
    }

    componentDidMount() {
        this.setState({
            request: this.context.drizzle.contracts.DoggyDoc.methods.getTokenClaims.cacheCall(this.props.animalId)
        });
    }

    componentDidUpdate() {
        if (
            typeof this.context.drizzleState.contracts.DoggyDoc.getTokenClaims[this.state.request] != 'undefined' && 
            (
                this.context.drizzleState.contracts.DoggyDoc.getTokenClaims[this.state.request].value != this.state.result ||
                this.state.loading
            )
        ) {                
            this.setState({
                result: this.context.drizzleState.contracts.DoggyDoc.getTokenClaims[this.state.request].value,
                loading: false
            });
        }
    }


    render() {
        let content = <Message 
            message="Loading claims..." 
            emoji="flash" 
            wrapperClasses={['mt-1', 'text-center']} 
        />;

        if (!this.state.loading) {
            if (this.state.result.length == 0) {
                content = <Message 
                    message={['This dog does not have any claims yet.', 'Ask you veterinary to get one.']}
                    emoji="doc" 
                    messageClasses={['mt-2', 'mb-0']}
                    wrapperClasses={['mt-1', 'text-center']} 
                />;                
            } else {
                let claims = this.state.result.map((value, key) => {
                    return <Claim claimId={value} key={key} add="vet" />
                });
                content = <div className="row mt-2 pl-3 pr-3">{claims}</div>;
            }
        } 

        return(
            <div className="mt-4 styled-card">
                <h3 className="text-center">Vaccinations & Abilities</h3>
                {content}
            </div>
        );
    }
}

AnimalPageClaims.contextType = DrizzleContext.Context;

export default AnimalPageClaims;