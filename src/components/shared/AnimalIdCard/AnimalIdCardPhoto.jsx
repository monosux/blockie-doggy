import React from 'react';

import AnimalPhotoWrapper from '../../wrappers/AnimalPhotoWrapper/AnimalPhotoWrapper';
import Message from '../Message/Message';

class AnimalIdCardPhotoReady extends React.Component {
    render() {
        let content = <Message 
            emoji="rainbow"
            message="Loading animal photo..." 
            messageClasses={['card-text']} 
            wrapperClasses={['card-body', 'text-center', 'mb-2']} 
        />;

        if (!this.props.photoData.loading) {
            if (this.props.photoData.no_photo) {
                content = <Message 
                    emoji="dog"
                    message="No photo found for this dog" 
                    messageClasses={['card-text']} 
                    wrapperClasses={['card-body', 'text-center']} 
                />;                
            } else if (this.props.photoData.error) {
                content = <Message 
                    emoji="crying"
                    message="Something went wrong. We have IPFS problem." 
                    messageClasses={['card-text']} 
                    wrapperClasses={['card-body', 'text-center']} 
                />;                
            } else {
                let ext = this.props.photoData.photo.charAt(0) == '/' ? 'jpeg' : 'png';
                content = <React.Fragment>
                    <img src={'data:image/' + ext + ';base64,' + this.props.photoData.photo} className="card-text w-100" alt="Dog Photo" />
                </React.Fragment>;
            }
        }

        return content;       
    }
}

export default AnimalPhotoWrapper(AnimalIdCardPhotoReady);