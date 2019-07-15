import React from 'react';
import { Link } from 'react-router-dom';

import ClaimsOfWrapper from '../../wrappers/ClaimsOfWrapper/ClaimsOfWrapper';
import Message from '../../shared/Message/Message';
import ClaimsList from '../../shared/ClaimsList/ClaimsList';

class VeteriniaryPageClaims extends React.Component {
    render() {
        let content = <Message 
            message="Loading claims..." 
            emoji="flash"
            wrapperClasses={['mt-5', 'text-center', 'message']} 
        />;

        if (!this.props.claimsData.loading) {
            if (this.props.claimsData.claims.length == 0) {
                content = <Message 
                    message={['You do not have any issued claims.']}
                    emoji="doc" 
                    wrapperClasses={['mt-5', 'text-center', 'message']} 
                />;
            } else {
                content = <ClaimsList claims={this.props.claimsData.claims} />
            }
        }

        return(
            <React.Fragment>
                <div className="text-center mb-4 mt-4">
                    <Link to="/lookup" className="btn btn-outline-light" replace>Add new claim</Link>
                </div>                
                <h1 className="text-center">Your issued claims</h1>
                {content}
            </React.Fragment> 
        );
    }
}

export default ClaimsOfWrapper(VeteriniaryPageClaims);