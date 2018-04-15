import { BodyType, EyeType, MouthType, PatternType } from './Cryptokitty';
import PromisesQueueWatcher from '../../utils/PromisesQueueWatcher';
let map = null;
let initialized = false;
const prefix = require('../../cfg').imgUrl;

const queueWatcher = new PromisesQueueWatcher();

const fillMap = async (obj, path, keyPrefix = '') => {
    for (let key in obj) {
        let svg = await fetch(`${prefix}/${path}/${keyPrefix}${key}.svg`);
        map[`${keyPrefix}${key}`] = await svg.text();
    }
};

const initialize = async () => {
    if (initialized) {
        return;
    }
    map = {};
    for (let b in BodyType) {
        await fillMap(PatternType, 'body', `${b}-`);
    }
    await fillMap(EyeType, 'eye');
    await fillMap(MouthType, 'mouth');
    let svg = await fetch(`${prefix}/nullcat.svg`);
    map[`nullcat`] = await svg.text();

    initialized = true;
};

const getPromiseFromQueue = () => {
    return new Promise((resolve, reject) => {
        queueWatcher.add(async () => {
            try {
                await initialize();
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
};

export default async () => {
    if (!initialized) {
        await getPromiseFromQueue();
    }
    return map;
};
