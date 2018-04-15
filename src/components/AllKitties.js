import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import KittiesGrid from './KittiesGrid';
import BreedPopup from './BreedPopup';

class AllKitties extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedKitty: null,
            popupOpened: false
        };
    }

    componentWillMount () {
        this.props.actions.getAllKitties();
    }

    render () {
        return (
            <div className='ContentContainer'>
                <BreedPopup
                    kitty={this.state.selectedKitty}
                    open={this.state.popupOpened}
                    onClose={() => this.setState({popupOpened: false})}
                />
                <h3 className='pageHeadline'>All Kitties</h3>
                <KittiesGrid
                    kitties={this.props.kitties}
                    numColumns={3}
                    actionHandler={(kitty) => {
                        this.setState({selectedKitty: kitty, popupOpened:true});
                    }}
                    actionLabel='Breed'
                />
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        kitties: state.getAllKitties.kitties
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

AllKitties.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AllKitties);
