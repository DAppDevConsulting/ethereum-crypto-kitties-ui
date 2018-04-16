import _ from 'lodash';
import {BodyType, EyeType, MouthType, PatternType} from "../components/kitty/Cryptokitty";
import * as c from "../components/cattributes/colors";
import {randomEnumValue, randomKey} from "../utils";
import Kitties from '../Kitties';
import service from './KittiesService';

const handlers = [];

const bodyMap = {
    '1': BodyType.mainecoon,
    '2': BodyType.cymric,
    '3': BodyType.laperm,
    '4': BodyType.munchkin,
    '5': BodyType.sphynx,
    '6': BodyType.ragamuffin,
    '7': BodyType.himalayan,
    '8': BodyType.chartreux
};

const eyeMap = {
    '1': EyeType.wingtips,
    '2': EyeType.fabulous,
    '3': EyeType.otaku,
    '4': EyeType.raisedbrow,
    '5': EyeType.simple,
    '6': EyeType.crazy,
    '7': EyeType.thicccbrowz,
    '8': EyeType.googly,
};

const mouthMap = {
    '1': MouthType.whixtensions,
    '2': MouthType.dali,
    '3': MouthType.saycheese,
    '4': MouthType.beard,
    '5': MouthType.tongue,
    '6': MouthType.happygokitty,
    '7': MouthType.pouty,
    '8': MouthType.soserious,
    '9': MouthType.gerbil,
};

const patternMap = {
    '1': PatternType.spock,
    '2': PatternType.tigerpunk,
    '3': PatternType.calicool,
    '4': PatternType.luckystripe,
    '5': PatternType.jaguar,
    '6': PatternType.totesbasic,
};

const eyeColorMap = {
    '1': 'gold',
    '2': 'bubblegum',
    '3': 'limegreen',
    '4': 'chestnut',
    '5': 'topaz',
    '6': 'mintgreen',
    '7': 'strawberry',
    '8': 'sizzurp',
};

const primaryMap = {
    '1': 'mauveover',
    '2': 'cloudwhite',
    '3': 'salmon',
    '4': 'shadowgrey',
    '5': 'orangesoda',
    '6': 'aquamarine',
    '7': 'greymatter',
    '8': 'oldlace',
    '9': 'cottoncandy',
};

const secondaryMap = {
    '1': 'peach',
    '2': 'bloodred',
    '3': 'emeraldgreen',
    '4': 'granitegrey',
    '5': 'kittencream',
};

const tertiaryMap = {
    '1': 'barkbrown',
    '2': 'cerulian',
    '3': 'scarlet',
    '4': 'skyblue',
    '5': 'coffee',
    '6': 'royalpurple',
    '7': 'lemonade',
    '8': 'swampgreen',
    '9': 'chocolate',
};

const createRandomKitty = () => {
    return {
        id: 0,
        name: 'kitty ' + randomEnumValue(BodyType),
        body: randomEnumValue(BodyType),
        eye: randomEnumValue(EyeType),
        eyeColor: randomKey(c.EyeColor),
        mouth: randomEnumValue(MouthType),
        pattern: randomEnumValue(PatternType),
        primary: randomKey(c.Primary),
        secondary: randomKey(c.Secondary),
        tertiary: randomKey(c.Tertiary)
    }

};

const mapKitty = async (id) => {
    let raw = await Kitties.getKitty(id);
    console.log(raw);
    const result = {id, name: raw.name, generation: raw.generation};
    const genes = raw.genes.toString();
    result.body = bodyMap[genes.substr(0, 1)];
    result.eye = eyeMap[genes.substr(1, 1)];
    result.eyeColor = eyeColorMap[genes.substr(2, 1)];
    result.mouth = mouthMap[genes.substr(3, 1)];
    result.pattern = patternMap[genes.substr(4, 1)];
    result.primary = primaryMap[genes.substr(5, 1)];
    result.secondary = secondaryMap[genes.substr(6, 1)];
    result.tertiary = tertiaryMap[genes.substr(7, 1)];
    console.log(result);
    return result;
};

const mapKittyFromMarket = async (id) => {
    const kitty = await mapKitty(id);
    const lot = await Kitties.getLot(id);
    kitty.isForSale = true;
    kitty.price = parseInt(lot.price, 10);
    return kitty;
};

const getAllKitties = async () => {
    let result = await service.getCats(Kitties.contractAddr());
    console.log(result);
    return Promise.all(result.map(async (item) => {
        return mapKitty(item.id);
    }));
};

const getKittiesByOwner = async (ownerAddress) => {
    let result = await service.getCats(Kitties.contractAddr());
    return Promise.all(result.filter((item) => item.owner === ownerAddress).map(async (item) => {
        return mapKitty(item.id);
    }));
};

const getKittiesFromMarketplace = async () => {
    let result = await service.getCatsFromMarket(Kitties.contractAddr());
    return Promise.all(result.map(async (item) => {
        return mapKittyFromMarket(item.id);
    }));
};

const mint = async (kitty) => {
    let genes = '';
    genes += _.findKey(bodyMap, (k) => k === kitty.body);
    genes += _.findKey(eyeMap, (k) => k === kitty.eye);
    genes += _.findKey(eyeColorMap, (k) => k === kitty.eyeColor);
    genes += _.findKey(mouthMap, (k) => k === kitty.mouth);
    genes += _.findKey(patternMap, (k) => k === kitty.pattern);
    genes += _.findKey(primaryMap, (k) => k === kitty.primary);
    genes += _.findKey(secondaryMap, (k) => k === kitty.secondary);
    genes += _.findKey(tertiaryMap, (k) => k === kitty.tertiary);
    genes += '0';
    await Kitties.mint(parseInt(genes, 10), kitty.name);
};

const init = () => {
    service.setNotificationHandler(notificationListener);
    service.onNewBlock(newBlockListener);
};

const notificationListener = async (type, id) => {
    const idsSet = new Set();
    idsSet.add(id);
    callChangeListeners(idsSet);
};

const callChangeListeners = (idsSet) => {
    for (let cb of handlers) {
        if (typeof cb === 'function') {
            cb(idsSet);
        }
    }
};

const newBlockListener = async (block) => {
};

const onChange = (listener) => handlers.push(listener);

export default {
    init,
    onChange,
    getAllKitties,
    getKittiesByOwner,
    getKittiesFromMarketplace,
    mint,
}
