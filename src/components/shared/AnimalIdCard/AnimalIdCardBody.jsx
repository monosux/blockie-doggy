import React from 'react';
import { Link } from 'react-router-dom';

import AnimalIdCardMeta from './AnimalIdCardMeta';
import Blockie from '../Blockie/Blockie';

class AnimalIdCardBody extends React.Component {
    render() {
        return(
            <React.Fragment>
                <div className="card-header text-center">
                    Animal ID: #{this.props.itemId}
                </div>
                <AnimalIdCardMeta meta={this.props.meta} />
                <div className="card-body text-center align-items-center d-flex justify-content-center">
                    <Link to={'/animal/' + this.props.itemId} className="btn btn-outline-dark">Veiw Dog's Page</Link>
                </div>
                <div className="card-footer text-center">
                    <p className="mb-0">Animal Owner</p>  
                    <Link to={'/animalsbyowner/' + this.props.owner} className="small">{this.props.owner}</Link>
                    <Blockie wrapperClasses={['mb-1', 'mt-2']} address={this.props.owner} size="30" />                    
                </div>
            </React.Fragment>
        );        
    }
}

export default AnimalIdCardBody;