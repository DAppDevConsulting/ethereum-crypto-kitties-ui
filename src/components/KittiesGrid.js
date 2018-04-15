import React, { Component } from 'react';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';
import * as c from './cattributes/colors';
import CryptoKitty from './kitty/Cryptokitty';

const HPADDING = 100;
const VPADDING = 50;

class KittiesGrid extends Component {
    renderCell (kitty, rowIndex, columnIndex) {
        kitty.key = `${rowIndex}${columnIndex}`;
        const style = {
            position: 'absolute',
            top: (300 + VPADDING) * rowIndex,
            left: (300 + HPADDING) * columnIndex,
            height: 300,
            width: 300
        };
        const needAction = (typeof this.props.actionHandler === 'function');
        let label = kitty.name;
        if (kitty.isForSale) {
            label += ` (${kitty.price})`;
        }
        
        return (
            <div key={rowIndex + '_' + columnIndex}>
            <CryptoKitty
                id={kitty.key}
                body={kitty.body}
                mouth={kitty.mouth}
                eye={kitty.eye}
                pattern={kitty.pattern}
                colors={[ c.Primary[kitty.primary], c.Secondary[kitty.secondary], c.Tertiary[kitty.tertiary], c.EyeColor[kitty.eyeColor]]}
                kittyStyle={style} />
                <div style={{position: 'absolute', top: style.top + 370, left: style.left + 130}}>
                    {label}
                </div>
            {needAction &&
                <div style={{position: 'absolute', top: style.top + 400, left: style.left + 130}}>
                    <RaisedButton
                        label={this.props.actionLabel}
                        onClick={() => {this.props.actionHandler(kitty)}} />
                </div>
            }
            </div>
        );
    }

    renderRow (row, rowIndex) {
        return (
            <div key={rowIndex}>
                {row.map((kitty, index) => this.renderCell(kitty, rowIndex, index))}
            </div>
        );
    }

    render () {
        const {kitties, numColumns} = this.props;
        const rows = _.chunk(kitties, numColumns);
        return (
            <div>
                {rows.map((v, index) => this.renderRow(v, index))}
            </div>
        );
    }
}

KittiesGrid.propTypes = {
};

export default KittiesGrid;
