import React from 'react';
import { Link } from 'react-router-dom';

import OwnerPageMenu from '../../shared/OwnerPageMenu/OwnerPageMenu';
import AddAnimalForm from './AddAnimalForm';
import AddAnimalUploader from './AddAnimalUploader';
import Message from '../../shared/Message/Message';
import Web3Wrapper from '../../wrappers/Web3Warapper/Web3Wrapper';
import Explorer from '../../shared/Explorer/Explorer';

class AddAnimal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form_data: {},
            uploading: false,
            done: false,
            result: false
        };
    }

    handleForm = (data) => {
        this.setState({
            uploading: true,
            form_data: data
        });
    }

    handleUpload = (tx) => {
        this.setState({
            uploading: false,
            done: true,
            result: tx
        });        
    }

    tryAgain = () => {
        this.setState({
            uploading: false,
            done: false,
            result: false
        });
    }

    render() {
        let content = <AddAnimalForm returnForm={this.handleForm} />;
        if (this.state.uploading) content = <AddAnimalUploader formData={this.state.form_data} returnUploader={this.handleUpload} />;
        
        if (!this.state.uploading && this.state.done && !this.state.result) {
            content = <Message 
                message={[
                    'Something went wrong.',
                    <button className="btn btn-outline-warning mt-2" onClick={this.tryAgain}>Try again</button>
                ]} 
                messageClasses={['mt-2']} 
                emoji="thinking" 
                wrapperClasses={['mt-5', 'text-center', 'message']}
            />;
        }

        if (!this.state.uploading && this.state.done && this.state.result) {
            content = <React.Fragment>
                <Message 
                    message={[
                        'Done. Your dog is successfully registered!',
                        'Your transaction:',
                        <Explorer hash={this.state.result} />
                    ]} 
                    messageClasses={['mt-2', 'mb-0']} 
                    emoji="rocket" 
                    wrapperClasses={['mt-5', 'text-center', 'message']}
                />
                <div className="mt-5 text-center">
                    <Link to="/owner" className="btn btn-outline-light mr-2" replace>
                        View your animals
                    </Link>
                </div>
            </React.Fragment>;
        }

        return(
            <React.Fragment>
                <OwnerPageMenu page="add" />
                <h1 className="text-center">Add a new dog</h1>
                <div className="mt-2">
                    {content}
                </div>
            </React.Fragment>           
        );        
    }
}

export default Web3Wrapper(AddAnimal);