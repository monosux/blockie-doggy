import React from 'react';
import { DrizzleContext } from 'drizzle-react';

import IPFSWrapper from '../../../utils/IPFSWrapper';

class AddAnimalUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_stage: 1,
            max_stage: 30,
            transaction: false,
            sent: false,
            error: false
        };
        this.ipfs = new IPFSWrapper();
    }

    componentDidMount() {
        this.registerAnimal();
    }

    componentDidUpdate() {
        if (!this.state.sent && this.state.transaction !== false) {
            let transaction = this.context.drizzleState.transactions[this.context.drizzleState.transactionStack[this.state.transaction]];
            if (typeof transaction !== 'undefined') {
                this.setState({
                    sent: true,
                    error: transaction.status == 'error',
                    hash: this.context.drizzleState.transactionStack[this.state.transaction]
                }, () => {
                    clearInterval(this.stageUpdater);
                    this.props.returnUploader(this.state.error ? false : this.state.hash);
                });
            } 
        }
    }

    componentWillUnmount() {
        clearInterval(this.stageUpdater);
    }

    registerAnimal = async () => {
        this.stageUpdater;

        let meta = {
            name: this.props.formData.name,
            breed: this.props.formData.breed,
            dob: this.props.formData.dob,
            sex: this.props.formData.sex,
            description: 'An animal ID'
        }

        try {
            if (this.props.formData.photo) meta['image'] = await this.ipfs.upload(this.props.formData.photo);

            this.nextStage(0);

            let meta_uri = await this.ipfs.upload(Buffer.from(JSON.stringify(meta)));

            this.setState({
                transaction: this.context.drizzle.contracts.DoggyDoc.methods.registerDog.cacheSend(meta_uri, {
                    from: this.context.drizzleState.accounts[0]
                })
            });

            this.nextStage(1);
        } catch(e) {
            this.props.returnUploader(false);
        }
    }

    stageUpdater = setInterval(() => {
        if (this.state.current_stage < this.state.max_stage) {
            this.setState({
                current_stage: this.state.current_stage + 1
            });
        }
    }, 500);

    nextStage = (stage) => {
        let stages = [[30, 60], [60, 90]];
        this.setState({
            current_stage: stages[stage][0],
            max_stage: stages[stage][1]
        });
    }

    render() {
        return(
            <div className="text-center mt-3">
                <div className="message mt-3">
                    <span role="img" aria-label="airplane">🛫</span>
                    <p>One moment, we are uploading your data...</p>
                </div>
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow={this.state.current_stage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{width: this.state.current_stage + '%'}}
                    >{this.state.current_stage}%</div>
                </div>
            </div>         
        );        
    }
}

AddAnimalUploader.contextType = DrizzleContext.Context;

export default AddAnimalUploader;