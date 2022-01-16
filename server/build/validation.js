"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrongType = exports.specialChars = exports.hasSpaces = exports.empty = void 0;
//Empty values validator
function empty(...values) {
    values.forEach(value => {
        //If value.length is falsy throw error
        if (!value.length)
            throw new Error('Empty or invalid field');
    });
}
exports.empty = empty;
//Value with spaces validator
function hasSpaces(...values) {
    const whitespacesRegex = /\s/;
    values.forEach(value => {
        //If the regex match some spaces throws an error
        if (whitespacesRegex.test(value))
            throw new Error('Field has spaces');
    });
}
exports.hasSpaces = hasSpaces;
//Special Chars validator
function specialChars(...values) {
    const specialcharsRegex = /[^a-z0-9 \-_@\.]/i;
    values.forEach(value => {
        //If the regex match some spaces throws an error
        if (specialcharsRegex.test(value))
            throw new Error('Field has special chars');
    });
}
exports.specialChars = specialChars;
//Wrong type values validator
function wrongType(data, types) {
    //Retrieving properties
    const dataKeys = Object.keys(data);
    const typeKeys = Object.keys(types);
    //Checking if data has all types items
    if (typeKeys.length > dataKeys.length) {
        return false;
    }
    //Checking if they have equal values
    const result = dataKeys.every(key => typeof data[key] == types[key]);
    if (!result)
        throw new Error('Wrong input types');
}
exports.wrongType = wrongType;
