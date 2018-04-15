import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import { NavLink, withRouter } from 'react-router-dom';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }
    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <NavLink
                        key='mint'
                        to='/mint'
                    >
                        <RaisedButton label="Mint" primary={true} />
                    </NavLink>
                </ToolbarGroup>
                <ToolbarGroup firstChild={true}>
                    <NavLink
                        key='all'
                        to='/all'
                    >
                        <RaisedButton label="All Kitties" primary={true} />
                    </NavLink>
                </ToolbarGroup>
                <ToolbarGroup>
                    <NavLink
                        key='marketplace'
                        to='/marketplace'
                    >
                        <RaisedButton label="Marketplace" primary={true} />
                    </NavLink>
                </ToolbarGroup>
                <ToolbarGroup>
                    <NavLink
                        key='mykitties'
                        to='/mykitties'
                    >
                        <RaisedButton label="My kitties" primary={true} />
                    </NavLink>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
