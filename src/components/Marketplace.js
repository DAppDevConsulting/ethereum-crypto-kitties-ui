import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import KittiesGrid from './KittiesGrid';

class Marketplace extends Component {
    componentWillMount () {
        this.props.actions.getKittiesFromMarketplace();
    }
    render () {
        return (
            <div className='ContentContainer'>
                <h3 className='pageHeadline'>Marketplace</h3>
                <KittiesGrid
                    kitties={this.props.kitties}
                    numColumns={3}
                    actionHandler={(kitty) => {this.props.actions.buyKitty(kitty)}}
                    actionLabel='Buy'
                />
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        kitties: state.getKittiesFromMarketplace.kitties
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

Marketplace.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);
