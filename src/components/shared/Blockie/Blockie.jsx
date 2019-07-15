import React from 'react';
import classNames from 'classnames';
import makeBlockie from 'ethereum-blockies-base64';

class Blockie extends React.Component {
    createWrapper = () => {
        if (Array.isArray(this.props.wrapperClasses)) {
            return <div className={classNames(...this.props.wrapperClasses)}>{this.createImage()}</div>;            
        }
        return <React.Fragment>{this.createImage()}</React.Fragment>;
    }

    createImage = () => {
        let classes = this.props.imageClasses || [];
        return <img 
            src={makeBlockie(this.props.address)} 
            alt={this.props.address} 
            style={{width: this.props.size + 'px', height: this.props.size + 'px', borderRadius: '50%'}}
            className={classNames(...classes)}
        />;
    }

    render() {
        return this.createWrapper();       
    }
}

export default Blockie;