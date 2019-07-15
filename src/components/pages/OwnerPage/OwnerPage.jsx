import React from 'react';
import { DrizzleContext } from 'drizzle-react';

import Web3Wrapper from '../../wrappers/Web3Warapper/Web3Wrapper';
import OwnerPageMenu from '../../shared/OwnerPageMenu/OwnerPageMenu';
import OwnerPageWrapped from './OwnerPageWrapped';

class OwnerPage extends React.Component {
    render() {
        return(
            <React.Fragment>
                <OwnerPageMenu page="animals" />
                <h1 className="text-center">Your animals</h1>
                <OwnerPageWrapped owner={this.context.drizzleState.accounts[0]} />
            </React.Fragment>           
        );        
    }
}

OwnerPage.contextType = DrizzleContext.Context;

export default Web3Wrapper(OwnerPage);