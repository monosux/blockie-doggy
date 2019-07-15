import React from 'react';
import Pagination from 'react-js-pagination';

import Claim from '../Claim/Claim';

class VeterinaryPageClaimsList extends React.Component {
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
            items: this.props.claims.slice(
                (this.state.active_page * this.state.per_page) - this.state.per_page,
                this.state.active_page * this.state.per_page            
            )
        });
    }

    render() {
        let content = this.state.items.map((item_id) => {
            return <Claim claimId={item_id} key={item_id} add="animal" />;
        });

        return(
            <React.Fragment>
                <div className="row">
                    {content}
                </div>
                <nav className="mt-5">
                    <Pagination
                        activePage={this.state.active_page}
                        itemsCountPerPage={this.state.per_page}
                        totalItemsCount={this.props.claims.length}
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

export default VeterinaryPageClaimsList;