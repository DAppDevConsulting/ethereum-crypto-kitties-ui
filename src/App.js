import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions/actions';
import { deepOrange500, indigoA200 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InfoIcon from 'material-ui/svg-icons/action/info';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import './App.css';
const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metamaskAvailable: true
        };

    }
    componentWillMount () {
        if (!window.web3) {
            this.setState({ metamaskAvailable: false });
            return;
        }
        // check if Metamask is unlocked
        window.web3.eth.getAccounts((error, result) => {
            if (result.length === 0) {
                return this.setState({ metamaskAvailable: false });
            }
        });

        // check if Metamask is in Rinkeby network
        window.web3.version.getNetwork((error, network) => {
            if (network !== '4' && false) {
                return this.setState({ networkError: 'Please, switch to Rinkeby network' });
            } else {
                this.props.actions.init();
            }
        });
    }

    renderNotInitialized () {
        return (
            <h1 style={{ color: indigoA200, textAlign: 'center' }}>Initialization...</h1>
        );
    }

    renderWarning (networkError) {
        return (
            <Router>
                <MuiThemeProvider muiTheme={muiTheme}>
                    { networkError
                        ? <div className='noMetamaskWarning'>
                            <InfoIcon color='#fff' style={{ marginRight: '10px' }} />
                            { networkError }
                        </div>
                        : <div className='noMetamaskWarning'>
                            <InfoIcon color='#fff' style={{ marginRight: '10px' }} />
                            Please download or unlock <span>&nbsp;<a href='https://metamask.io/' target='_blank' rel='noopener noreferrer'>MetaMask</a>&nbsp;</span> extension to load application and Ethereum wallet
                        </div>
                    }
                </MuiThemeProvider>
            </Router>
        );
    }

  render() {
      if (typeof window.web3 === 'undefined') {
          return this.renderWarning();
      }

      if (this.state.networkError || !this.state.metamaskAvailable) {
          return this.renderWarning(this.state.networkError);
      }

      if (!this.props.isInitialized) {
          return this.renderNotInitialized();
      }

      return (
          <Router>
              <MuiThemeProvider muiTheme={muiTheme}>
                  <div className='App'>
                      <Header />
                      <MainContainer />
                  </div>
              </MuiThemeProvider>
          </Router>
      );
  }
}

function mapStateToProps (state) {
    return {
        isInitialized: state.init.isInitialized
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
