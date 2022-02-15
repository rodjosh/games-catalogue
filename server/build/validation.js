"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncError = exports.wrongType = exports.specialChars = exports.hasSpaces = exports.empty = void 0;
function empty(...values) {
    values.forEach(value => {
        if (!value.length)
            throw new Error('Empty or invalid field');
    });
}
exports.empty = empty;
function hasSpaces(...values) {
    const whitespacesRegex = /\s/;
    values.forEach(value => {
        if (whitespacesRegex.test(value))
            throw new Error('Field has spaces');
    });
}
exports.hasSpaces = hasSpaces;
function specialChars(...values) {
    const specialcharsRegex = /[^a-z0-9 \-_@\.]/i;
    values.forEach(value => {
        if (specialcharsRegex.test(value))
            throw new Error('Field has special chars');
    });
}
exports.specialChars = specialChars;
function wrongType(data, types) {
    // To compare by properties
    const dataKeys = Object.keys(data);
    const typeKeys = Object.keys(types);
    if (typeKeys.length > dataKeys.length) {
        throw new Error('Missing fields');
    }
    // To check if they have equal types
    const result = typeKeys.every(key => typeof data[key] == types[key]);
    if (!result)
        throw new Error('Wrong input types');
}
exports.wrongType = wrongType;
// To catch async errors and send them within the next function of the middlewares chain
function asyncError(inputChecker, rrn) {
    try {
        inputChecker(rrn);
        return false;
    }
    catch (e) {
        rrn.next(e);
        return true;
    }
}
exports.asyncError = asyncError;
