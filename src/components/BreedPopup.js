import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions/actions';
import KittiesGrid from './KittiesGrid';

class BreedPopup extends Component {
    constructor (props) {
        super(props);
        this.state = {
            price: 0
        };
    }

    componentWillMount () {
        this.props.actions.getMyKitties();
    }

    render () {
        const {open, onClose, kitty } = this.props;
        if (!kitty) {
            return ('');
        }

        return (
            <Dialog
                title='Breed Kitty'
                actions={[
                    <FlatButton label='Cancel' onClick={onClose} />
                ]}
                modal={false}
                open={open}
                onRequestClose={onClose}
                contentStyle={{ minWidth: '1200px' }}
                bodyStyle={{ minHeight: '800px' }}
            >
                <div>
                    <KittiesGrid
                        kitties={this.props.kitties}
                        numColumns={3}
                        actionHandler={(myKitty) => {
                            this.breed(myKitty);
                            onClose();
                        }}
                        actionLabel='Breed'
                    />
                </div>
            </Dialog>
        );
    }

    breed (myKitty) {
        this.props.actions.breed(myKitty, this.props.kitty);
    }
}

function mapStateToProps (state) {
    return {
        kitties: state.getMyKitties.kitties
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BreedPopup);
