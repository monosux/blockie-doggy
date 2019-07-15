import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

class OwnerPageMenu extends React.Component {
    render() {
        let active = {
            'animals': ['btn', 'btn-outline-light', 'ml-2', 'mr-2'],
            'add': ['btn', 'btn-outline-light', 'ml-2', 'mr-2']
        };
        active[this.props.page].push('active');
        return(
            <div className="mb-4 mt-4 text-center">
                <Link to="/owner" className={classNames(...active.animals)} replace>Your animals</Link>
                <Link to="/add-animal" className={classNames(...active.add)} replace>Add animal</Link>
            </div>           
        );        
    }
}

export default OwnerPageMenu;