import React, { Component } from 'react';
import _ from 'lodash';
import * as c from '../cattributes/colors';
import { isNonNull } from '../../utils';
import Genes from './Genes';
const prefix = require('../../cfg').imgUrl;;

export const BodyType  = {
    mainecoon: 'mainecoon',
    cymric: 'cymric',
    laperm: 'laperm',
    munchkin: 'munchkin',
    sphynx: 'sphynx',
    ragamuffin: 'ragamuffin',
    himalayan: 'himalayan',
    chartreux: 'chartreux',
};

export const PatternType = {
    spock: 'spock',
    tigerpunk: 'tigerpunk',
    calicool: 'calicool',
    luckystripe: 'luckystripe',
    jaguar: 'jaguar',
    totesbasic: 'totesbasic',
};

export const MouthType = {
    whixtensions: 'whixtensions',
    dali: 'dali',
    saycheese: 'saycheese',
    beard: 'beard',
    tongue: 'tongue',
    happygokitty: 'happygokitty',
    pouty: 'pouty',
    soserious: 'soserious',
    gerbil: 'gerbil'
};

export const EyeType = {
    wingtips: 'wingtips',
    fabulous: 'fabulous',
    otaku: 'otaku',
    raisedbrow: 'raisedbrow',
    simple: 'simple',
    crazy: 'crazy',
    thicccbrowz: 'thicccbrowz',
    googly: 'googly',
};
let counter = 0;

class Cryptokitty extends Component {
    constructor(props) {
        super(props);
        this.counter = counter++;
        this.state = {isReady: true};
        this.detectKittyColors = this.detectKittyColors.bind(this);
        this.render = this.render.bind(this);
    }

    async componentWillMount() {
        const genes = await Genes();
        this.setState({ genes });
    }

    detectKittyColors(svgText) {
        const colors = [null, null, null, null];
        for (const color in c.Primary) {
            if (svgText.indexOf(c.Primary[color]) > -1) {
                colors[0] = color;
            }
        }
        for (const color in c.Secondary) {
            if (svgText.indexOf(c.Secondary[color]) > -1) {
                colors[1] = color;
            }
        }
        for (const color in c.Tertiary) {
            if (svgText.indexOf(c.Tertiary[color]) > -1) {
                colors[2] = color;
            }
        }

        for (const color in c.EyeColor) {
            if (svgText.indexOf(c.EyeColor[color]) > -1) {
                colors[3] = color;
            }
        }

        return colors;
    }

    replaceSvgIdsAndUrls(svg) {
        return svg.replace(
          /id="((fur|tailFur|tailShadow|highlight|shadow|eye)ClipPath(2?))"/gim,
          (fullMatch, match) => `id="${this.props.id}_${match}"`
        ).replace(
          /clip-path="url\(#((fur|tailFur|tailShadow|highlight|shadow|eye)ClipPath(2?))\)"/gim,
          (fullMatch, match) => `clip-path="url(#${this.props.id}_${match})"`
        );
    }

    render() {
        const genes = this.state.genes;
        if (genes === undefined) {
            return <img src={`${prefix}/nullcat.svg`}/>;
        }
        const { colors } = this.props;

        let kittyImage = this.replaceSvgIdsAndUrls(genes[`${this.props.body}-${this.props.pattern}`]);
        let kittyMouth = this.replaceSvgIdsAndUrls(genes[this.props.mouth]);
        let kittyEye = this.replaceSvgIdsAndUrls(genes[this.props.eye]);

        const bodyColors = this.detectKittyColors(kittyImage);
        const eyeColors = this.detectKittyColors(kittyEye);
        const mouthColors = this.detectKittyColors(kittyMouth);

        if (isNonNull(bodyColors[0])) {
            kittyImage = kittyImage.replace(new RegExp(c.Primary[bodyColors[0]], "g"), colors[0]);
        }

        if (isNonNull(bodyColors[1])) {
            kittyImage = kittyImage.replace(new RegExp(c.Secondary[bodyColors[1]], "g"), colors[1]);
        }

        if (isNonNull(eyeColors[3])) {
            kittyEye = kittyEye.replace(new RegExp(c.EyeColor[eyeColors[3]], "g"), colors[3]);
        }

        if (isNonNull(bodyColors[2])) {
            kittyImage = kittyImage.replace(new RegExp(c.Tertiary[bodyColors[2]], "g"), colors[2]);
        }

        if (isNonNull(mouthColors[0])) {
            kittyMouth = kittyMouth.replace(new RegExp(c.Primary[mouthColors[0]], "g"), colors[0]);
        }

        const style = this.props.kittyStyle || {
            position: 'absolute',
            top: 0,
            left: 0,
            height: 300,
            width: 300
        };

        return (
            <div id={`kitty_${this.counter}`} style={{ position: 'relative' }}>
                {
                    ((kittyImage === null || kittyMouth === null || kittyEye === null || !this.state.isReady) ?
                        <div style={{ position: 'absolute'}} onClick={() => {
                            console.log('click');
                            this.setState({isReady: true});
                        }}>
                            <div style={style} dangerouslySetInnerHTML={{ __html: genes['nullcat'] }}/>
                        </div> :
                        <div style={{ position: 'absolute'}}>
                            <div style={style} dangerouslySetInnerHTML={{ __html: kittyImage }}/>
                            <div style={style} dangerouslySetInnerHTML={{ __html: kittyMouth }}/>
                            <div style={style} dangerouslySetInnerHTML={{ __html: kittyEye }}/>
                        </div> )
                }
            </div>
        );
    }
}

export default Cryptokitty;
