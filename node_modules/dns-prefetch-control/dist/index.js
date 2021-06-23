"use strict";
function getHeaderValueFromOptions(options) {
    if (options && options.allow) {
        return 'on';
    }
    else {
        return 'off';
    }
}
module.exports = function dnsPrefetchControl(options) {
    var headerValue = getHeaderValueFromOptions(options);
    return function dnsPrefetchControl(_req, res, next) {
        res.setHeader('X-DNS-Prefetch-Control', headerValue);
        next();
    };
};
