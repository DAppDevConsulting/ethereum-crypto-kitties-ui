import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/actions';
import * as c from './cattributes/colors';
import CryptoKitty, {BodyType, EyeType, MouthType, PatternType} from './kitty/Cryptokitty';
import {randomEnumValue, randomKey} from "../utils";

class Mint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            body: randomEnumValue(BodyType),
            eye: randomEnumValue(EyeType),
            eyeColor: randomKey(c.EyeColor),
            mouth: randomEnumValue(MouthType),
            pattern: randomEnumValue(PatternType),
            primary: randomKey(c.Primary),
            secondary: randomKey(c.Secondary),
            tertiary: randomKey(c.Tertiary)
        }
    }

    fieldChanged (e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }
    render () {
        const { body, pattern, eye, mouth, primary, secondary, tertiary, eyeColor } = this.state;
        const onFieldChange = (e) => this.fieldChanged(e);
        return (
            <div className='ContentContainer'>
                <h3 className='pageHeadline'>Mint</h3>
                <div>
                    <CryptoKitty
                        body={body}
                        mouth={mouth}
                        eye={eye}
                        pattern={pattern}
                        colors={[ c.Primary[primary], c.Secondary[secondary], c.Tertiary[tertiary], c.EyeColor[eyeColor]]}
                    />
                    <div className='ui form'>
                        <div className='fields'>
                            <label style={{float: 'left'}}>Body</label>
                            {
                                _.map(Object.keys(BodyType), (k) => (
                                    <div className='field' key={k}>
                                        <div className='ui radio checkbox'>
                                            <input value={k} onClick={onFieldChange} type='radio' name='body' checked={this.state.body === k}/>
                                            <label>{k}</label>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='fields'>
                            <label style={{float: 'left'}}>Pattern</label>
                            {
                                _.map(Object.keys(PatternType), (k) => (
                                    <div className='field' key={k}>
                                        <div className='ui radio checkbox'>
                                            <input value={k} onClick={onFieldChange} type='radio' name='pattern' checked={this.state.pattern === k}/>
                                            <label>{k}</label>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='fields'>
                            <label style={{float: 'left'}}>Eyes</label>
                            {
                                _.map(Object.keys(EyeType), (k) => (
                                    <div className='field' key={k}>
                                        <div className='ui radio checkbox'>
                                            <input value={k} onClick={onFieldChange} type='radio' name='eye' checked={this.state.eye === k}/>
                                            <label>{k}</label>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='fields'>
                            <label style={{float: 'left'}}>Mouth</label>
                            {
                                _.map(Object.keys(MouthType), (k) => (
                                    <div className='field' key={k}>
                                        <div className='ui radio checkbox'>
                                            <input value={k} onClick={onFieldChange} type='radio' name='mouth' checked={this.state.mouth === k}/>
                                            <label>{k}</label>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='fields'>
                            <label style={{float: 'left'}}>Primary Color</label>
                            {
                                _.map(Object.keys(c.Primary), (k) => (
                                    <div className='field' key={k}>
                                        <div className='ui radio checkbox'>
                                            <input onClick={onFieldChange} value={k} type='radio' name='primary' checked={this.state.primary === k}/>
                                            <label>{k}</label>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='fields'>
                            <label style={{float: 'left'}}>Secondary</label>
                            {
                                _.map(Object.keys(c.Secondary), (k) => (
                                    <div className='field' key={k}>
                                        <div className='ui radio checkbox'>
                                            <input value={k} onClick={onFieldChange} type='radio' name='secondary' checked={this.state.secondary === k}/>
                                            <label>{k}</label>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='fields'>
                            <label style={{float: 'left'}}>Tertiary</label>
                            {
                                _.map(Object.keys(c.Tertiary), (k) => (
                                    <div className='field' key={k}>
                                        <div className='ui radio checkbox'>
                                            <input value={k} onClick={onFieldChange} type='radio' name='tertiary' checked={this.state.tertiary === k}/>
                                            <label>{k}</label>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='fields'>
                            <label style={{float: 'left'}}>Eye</label>
                            {
                                _.map(Object.keys(c.EyeColor), (k) => (
                                    <div className='field' key={k}>
                                        <div className='ui radio checkbox'>
                                            <input value={k} onClick={onFieldChange} type='radio' name='eyeColor' checked={this.state.eyeColor === k}/>
                                            <label>{k}</label>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='fields'>
                            <TextField
                                id='kName'
                                value={this.state.name || ''}
                                onChange={(e, value) => {
                                    this.setState({name: value});
                                }} />
                            <RaisedButton
                                label='Mint'
                                onClick={() => this.mint()}
                                backgroundColor='#536dfe'
                                labelColor='#fff'
                                disabled={!this.state.name}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    mint () {
        let kitty = _.clone(this.state);
        this.props.actions.mint(kitty);
        this.setState({name: ''});
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

Mint.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Mint);
