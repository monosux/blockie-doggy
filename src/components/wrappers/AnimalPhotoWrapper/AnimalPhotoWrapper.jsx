import React from 'react';

import IPFSWrapper from '../../../utils/IPFSWrapper';

export default (WrappedComponent) => {
    class AnimalMetaWrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                no_photo: false,
                photo: false,
                error: false
            };
            this.ipfs = new IPFSWrapper();
            this._isMounted = false;
        }
    
        componentDidMount() {
            this._isMounted = true;
            if (typeof this.props.photo !== 'undefined') {
                this.downloadPhoto();
            } else {
                this.setState({
                    loading: false,
                    no_photo: true
                });
            }
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        setStateIfMounted = (state) => {
            if (this._isMounted) {
                this.setState({
                    ...state
                });
            }
        }
    
        downloadPhoto = async () => {
            try {
                let file = await this.ipfs.download(this.props.photo);
                this.setStateIfMounted({
                    photo: file[0].content.toString('base64')
                });
            } catch(e) {
                this.setStateIfMounted({
                    error: true
                });
            } finally {
                this.setStateIfMounted({
                    loading: false
                });
            }
        }
    
        render() {
            return <WrappedComponent 
                photoData={{
                    loading: this.state.loading,
                    error: this.state.error,
                    no_photo: this.state.no_photo,
                    photo: this.state.photo
                }}
                {...this.props} 
            />;      
        }
    }

    return AnimalMetaWrapper;
}