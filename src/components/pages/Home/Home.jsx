import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return(
            <React.Fragment>
                <div className="text-center">
                    <h1 className="display-4">Welcome to Blockie Doggy</h1>
                    <h4>Blockchain based animal registry</h4>
                </div>
                <div className="mt-4">
                    <p>The Blockie Doggy is a demo project created during Truffle Univerity. The project shows how ERC721 token can be used to create a simple decentralized animal registry.</p>
                    <p>ERC721 token used as a base for animal identity. I created additional extension 'ERC721Claims' that makes it possible to add 'claims' to the animal identity. 'Claims' are proved by veterinary information about a dog. For example dog's special ability. Take a look at 'ERC721ClaimsInterface' contract to see the basic structure of this extension.</p>
                    <p>The source code of the project are available on <a href="https://github.com/monosux/blockie-doggy" title="GitHub Page" target="_blank">GitHub</a>.</p>
                </div>
                <div className="mt-4">
                    <h4 className="text-center">Using demo:</h4>
                    <ul>
                        <li>The animal owner can register the dog and get ERC721 token as a dog ID.</li>
                        <li>Veterinary can add 'claims' to a dog ID. Such as information about vaccination or special dog's abilities.</li>
                        <li>Anyone can check information about a dog. See the ID and issued 'claims'.</li>
                    </ul>
                </div>
                <div className="mt-5 text-center">
                    <Link to="/owner" className="btn btn-outline-light btn-lg mr-2 ml-2 mb-3" replace>
                        Use site as an animal owner
                    </Link>
                    <Link to="/veterinary" className="btn btn-outline-warning btn-lg ml-2 mr-2 mb-3" replace>
                        Use site as a veterinary
                    </Link>
                </div>
                <div className="mt-3 text-center">
                    <Link to="/lookup" className="btn btn-outline-primary btn-lg" replace>
                        Lookup a dog
                    </Link>
                </div>
            </React.Fragment>
        );        
    }
}

export default Home;