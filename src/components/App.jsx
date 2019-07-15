import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { DrizzleContext } from 'drizzle-react';

import Header from './shared/Header/Header';
import Footer from './shared/Footer/Footer';
import Home from './pages/Home/Home';
import OwnerPage from './pages/OwnerPage/OwnerPage';
import AddAnimal from './pages/AddAnimal/AddAnimal';
import AnimalPage from './pages/AnimalPage/AnimalPage';
import AnimalsByOwner from './pages/AnimalsByOwner/AnimalsByOwner';
import VeterinaryPage from './pages/VeterinaryPage/VeterinaryPage';
import ClaimsByVeterinary from './pages/ClaimsByVeterinary/ClaimsByVeterinary';
import LookUp from './pages/LookUp/LookUp';

import 'bootstrap/scss/bootstrap.scss';
import './App.scss';

import DoggyDocContract from '../../build/contracts/DoggyDoc.json';

class App extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
            loaded_contracts: false
        };
    }

    componentDidUpdate() {
        /* Add contracts here because Drizzle doesn't handle wrong network 🤔 */
        if (!this.state.loaded_contracts && this.context.initialized) {
            for (let network_id in DoggyDocContract.networks) {
                if (network_id == this.context.drizzleState.web3.networkId) {
                    this.setState({
                        loaded_contracts: true
                    }, () => {
                        this.context.drizzle.addContract({
                            contractName: 'DoggyDoc',
                            web3Contract: new this.context.drizzle.web3.eth.Contract(
                                DoggyDocContract.abi, 
                                DoggyDocContract.networks[network_id].address
                            )
                        }, []);
                    });
                }
            }
        }
    }

    render() {
        return(
            <HashRouter>
                <Header />
                <div className="container page-content">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/owner" component={OwnerPage} />
                        <Route path="/veterinary" component={VeterinaryPage} />
                        <Route path="/add-animal" component={AddAnimal} />
                        <Route path="/animal/:id" component={AnimalPage} />
                        <Route path="/animalsbyowner/:owner" component={AnimalsByOwner} />
                        <Route path="/claimsbyvet/:vet" component={ClaimsByVeterinary} />
                        <Route path="/lookup/" component={LookUp} />
                    </Switch>
                </div>
                <Footer />
            </HashRouter>      
        );        
    }
}

App.contextType = DrizzleContext.Context;

export default App;