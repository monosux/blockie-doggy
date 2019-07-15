import React from 'react';
import Pagination from 'react-js-pagination';

import AnimalIdCard from '../AnimalIdCard/AnimalIdCard';

class OwnerPageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active_page: 1,
            per_page: 6,
            items: []
        };
    }

    componentDidMount() {
        this.getCurrentList();
    }

    handlePageChange = (page) => {
        this.setState({
            active_page: page
        }, () => {
            this.getCurrentList();
        });        
    }

    getCurrentList = () => {
        this.setState({
            items: this.props.animals.slice(
                (this.state.active_page * this.state.per_page) - this.state.per_page,
                this.state.active_page * this.state.per_page            
            )
        });
    }

    render() {
        let content = this.state.items.map((item_id) => {
            return <AnimalIdCard animalId={item_id} key={item_id} />;
        });

        return(
            <React.Fragment>
                <div className="row mt-3">
                    {content}
                </div>
                <nav className="mt-5">
                    <Pagination
                        activePage={this.state.active_page}
                        itemsCountPerPage={this.state.per_page}
                        totalItemsCount={this.props.animals.length}
                        innerClass="pagination justify-content-center"
                        linkClass="page-link"
                        itemClass="page-item"
                        hideNavigation
                        onChange={this.handlePageChange}
                    />
                </nav>
            </React.Fragment>
        );        
    }
}

export default OwnerPageList;