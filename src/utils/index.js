import _ from 'lodash';
export const isNull = (v) => v === undefined || v === null;
export const isNonNull = (v) => !isNull(v);
export const randomEnumValue = (v) => {
    const keys = Object.keys({...v});
    const randInt =	_.random(0, keys.length - 1);
    return v[keys[randInt]];
};

export const randomKey = (v) => {
    const keys = Object.keys({...v});
    const randInt =	_.random(0, keys.length - 1);
    return keys[randInt];
};
