import React from 'react';
import { Link } from 'react-router-dom';
import { DrizzleContext } from 'drizzle-react';
import moment from 'moment';

import Message from '../Message/Message';

class Claim extends React.Component {
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
            request: this.context.drizzle.contracts.DoggyDoc.methods.getClaim.cacheCall(this.props.claimId)
        });
    }

    componentDidUpdate() {
        if (
            typeof this.context.drizzleState.contracts.DoggyDoc.getClaim[this.state.request] != 'undefined' && 
            (
                this.context.drizzleState.contracts.DoggyDoc.getClaim[this.state.request].value != this.state.result ||
                this.state.loading
            )
        ) {                
            this.setState({
                result: this.context.drizzleState.contracts.DoggyDoc.getClaim[this.state.request].value,
                loading: false
            });
        }
    }

    getClaimIcon = () => {
        let icons = {
            1: {
                image: '😋',
                role: 'happy'
            },
            2: {
                image: '🥰',
                role: 'love'                
            },
            3: {
                image: '😎',
                role: 'friend'                
            }
        };
        return <span role="img" aria-label={icons[this.state.result.subject].role} className="claim-icon">
            {icons[this.state.result.subject].image}
        </span>;
    }

    getClaimTitle = () => {
        let titles = {
            1: 'Dog has high level of happiness',
            2: 'Dog can provide love',
            3: 'Dog got a shot of friendship'
        }
        return <h5 className="mt-2">{titles[this.state.result.subject]}</h5>;
    }

    getClaimDate = () => {
        return <p>Issued: {moment.unix(this.state.result.issue_time).format('LLL')} </p>;
    }

    getAdditional = () => {
        if (this.props.add == 'vet') {
            return <p>
                Issued By: <Link to={'/claimsbyvet/' + this.state.result.issuer} className="small" style={{ overflowWrap: 'break-word' }}>
                    {this.state.result.issuer}
                </Link>
            </p>;
        }

        if (this.props.add == 'animal') {
            return <p>
                Animal: <Link to={'/animal/' + this.state.result.token_id}>#{this.state.result.token_id}</Link>                
            </p>;
        }
    }

    render() {
        let content = <Message 
            message="Loading claim data..." 
            emoji="flash" 
            wrapperClasses={['mt-2', 'text-center']} 
        />;

        if (!this.state.loading) {
            content = <div className="row h-100">
                <div className="col-sm-3 text-center align-self-center">{this.getClaimIcon()}</div>
                <div className="col-sm-9 align-self-center">
                    {this.getClaimTitle()}
                    {this.getClaimDate()}
                    {this.getAdditional()}
                </div>                
            </div>;
        }

        return(
            <div className="col-md-6 p-2">
                <div className="claim ml-2 mr-2 p-2 align-self-center h-100">
                    {content}
                </div>
            </div>
        );        
    }
}

Claim.contextType = DrizzleContext.Context;

export default Claim;