import React from 'react';
import classNames from 'classnames';

class Explorer extends React.Component {
    constructor(props) {
        super(props);
        this.explorer = 'https://blockscout.com/eth/rinkeby/';
    }

    render() {
        let link = this.explorer + (this.props.type == 'address' ? 'address/' : 'tx/') + this.props.hash;
        let title = this.props.type == 'address' ? 'View address' : 'View transaction';
        let classes = this.props.linkClasses || [];
        return(
            <a 
                href={link} 
                title={title} 
                target="_blank"
                style={{ overflowWrap: 'break-word' }}
                className={classNames(...classes)}
            >{this.props.hash}</a>
        );       
    }
}

export default Explorer;