import React from 'react';

import IPFSWrapper from '../../../utils/IPFSWrapper';

export default (WrappedComponent) => {
    class AnimalMetaWrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                meta: {},
                loading: true,
                error: false
            };
            this.ipfs = new IPFSWrapper();
            this._isMounted = false;
        }
    
        componentDidMount() {
            this._isMounted = true;
            this.downloadMeta();
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
    
        downloadMeta = async () => {
            try {
                let file = await this.ipfs.download(this.props.meta);
                this.setStateIfMounted({
                    meta: JSON.parse(file[0].content.toString())
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
                metaData={{
                    loading: this.state.loading,
                    error: this.state.error,
                    meta: this.state.meta
                }}
                {...this.props} 
            />;      
        }
    }

    return AnimalMetaWrapper;
}