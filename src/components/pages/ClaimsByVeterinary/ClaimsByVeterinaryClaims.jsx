import React from 'react';

import ClaimsOfWrapper from '../../wrappers/ClaimsOfWrapper/ClaimsOfWrapper';
import ClaimsList from '../../shared/ClaimsList/ClaimsList';
import Message from '../../shared/Message/Message';

class ClaimsByVeterinaryClaims extends React.Component {
    render() {
        let content = <Message 
            message="Loading claims..." 
            emoji="flash"
            wrapperClasses={['mt-5', 'text-center', 'message']} 
        />;

        if (!this.props.claimsData.loading) {
            if (this.props.claimsData.claims.length == 0) {
                content = <Message 
                    message={['Veterinary does not have any issued claims.']}
                    emoji="doc" 
                    wrapperClasses={['mt-5', 'text-center', 'message']} 
                />;
            } else {
                content = <ClaimsList claims={this.props.claimsData.claims} />
            }
        }

        return content;
    }
}

export default ClaimsOfWrapper(ClaimsByVeterinaryClaims);