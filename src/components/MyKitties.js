import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import KittiesGrid from './KittiesGrid';
import SellPopup from './SellPopup';

class MyKitties extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedKitty: null,
            popupOpened: false
        };
    }

    componentWillMount () {
        this.props.actions.getMyKitties();
    }

    render () {
        return (
            <div className='ContentContainer'>
                <SellPopup
                    kitty={this.state.selectedKitty}
                    open={this.state.popupOpened}
                    onClose={() => this.setState({popupOpened: false})}
                />
                <h3 className='pageHeadline'>My Kitties!</h3>
                <KittiesGrid
                    kitties={this.props.kitties}
                    numColumns={3}
                    actionHandler={(kitty) => {
                        this.setState({selectedKitty: kitty, popupOpened:true})
                    }}
                    actionLabel='Sell'
                />
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        kitties: state.getMyKitties.kitties
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

MyKitties.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MyKitties);
