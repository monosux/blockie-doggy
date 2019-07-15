import React from 'react';
import SimpleReactValidator from 'simple-react-validator';

class AddAnimalForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            breed: '',
            sex: 'male',
            dob: '',
            photo: null,
            photo_label: 'Choose a file'
        };
        
        this.validator = new SimpleReactValidator({
            locale: 'en',
            autoForceUpdate: this,
            element: (message) => <div className="alert alert-danger mt-1">{message}</div>,
            validators: {
                dob: {
                    rule: (val, params, validator) => {
                        return validator.helpers.testRegex(val, /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/i) && params.indexOf(val) === -1;
                    },
                    message: 'The :attribute not valid.'
                },
                file_size: {
                    rule: (val) => {
                        return !(val.size > (1024 * 1024));
                    },
                    message: 'File is too big.'
                },
                file_format: {
                    rule: (val) => {
                        return (val.type == 'image/jpeg' || val.type == 'image/png');
                    },
                    message: 'Wrong Image format.'                    
                }
            }
        });
    }

    handleInputChange = (event) => {  
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleFile = (event) => {
        this.setState({
            photo: event.target.files[0],
            photo_label: event.target.files[0].name
        });
    }
    
    handleForm = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            this.props.returnForm(this.state);
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return(
            <form method="post" action="#">
                <div className="form-group">
                    <label htmlFor="name">Dog Name</label>
                    {this.validator.message('name', this.state.name, 'required|alpha_num_space')}
                    <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInputChange} />                    
                </div>
                <div className="form-group">
                    <label htmlFor="breed">Dog Breed</label>
                    {this.validator.message('breed', this.state.breed, 'required|alpha_num_space')}
                    <input type="text" className="form-control" id="breed" name="breed" value={this.state.breed} onChange={this.handleInputChange} />                    
                </div>
                <div className="form-group">
                    <label>Dog Sex</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="sex" id="sex-male" value="male" checked={this.state.sex === 'male'} onChange={this.handleInputChange} />
                        <label className="form-check-label" htmlFor="sex-male">Male</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="sex" id="sex-female" value="female" checked={this.state.sex === 'female'} onChange={this.handleInputChange} />
                        <label className="form-check-label" htmlFor="sex-female">Female</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Dog date of birth</label>
                    {this.validator.message('Date of birth', this.state.dob, 'required|dob')}
                    <input type="date" className="form-control" id="dob" name="dob" value={this.state.dob} onChange={this.handleInputChange} />                    
                </div>
                <div className="form-group">
                    <p>Dog photo:</p>
                    {this.validator.message('Photo', this.state.photo, 'file_size|file_format')}
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="photo" name="photo" onChange={this.handleFile} />
                        <label className="custom-file-label" htmlFor="photo">{this.state.photo_label}</label>
                    </div>
                    <small className="form-text text-right">Image format: jpg, png. Max file size 1mb.</small>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleForm}>Add dog</button>
            </form>          
        );        
    }
}

export default AddAnimalForm;