import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as c from './cattributes/colors';
import CryptoKitty from './kitty/Cryptokitty';
import * as actions from '../actions/actions';

class SellPopup extends Component {
    constructor (props) {
        super(props);
        this.state = {
            price: 0
        };
    }

    render () {
        const {open, onClose, kitty } = this.props;
        if (!kitty) {
            return (<div></div>);
        }

        return (
            <Dialog
                title='Sell Kitty'
                actions={[
                    <FlatButton label='Cancel' onClick={onClose} />
                ]}
                modal={false}
                open={open}
                onRequestClose={onClose}
                contentStyle={{ width: '400px' }}
                bodyStyle={{ minHeight: '300px' }}
            >
                <div>
                    <CryptoKitty
                        body={kitty.body}
                        mouth={kitty.mouth}
                        eye={kitty.eye}
                        pattern={kitty.pattern}
                        colors={[ c.Primary[kitty.primary], c.Secondary[kitty.secondary], c.Tertiary[kitty.tertiary], c.EyeColor[kitty.eyeColor]]}
                    />
                    <TextField
                        id='price'
                        hintText='price'
                        value={this.state.price || ''}
                        onChange={(e, value) => {
                            this.setState({price: value});
                        }} />
                    <RaisedButton label='Sell' onClick={() => {
                        this.sellKitty();
                        onClose();
                    } }/>
                </div>
            </Dialog>
        );
    }

    sellKitty () {
        this.props.actions.sellKitty(this.props.kitty, this.state.price);
    }
}

function mapStateToProps (state) {
    return {
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SellPopup);
