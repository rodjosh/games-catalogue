"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const env_config = (0, dotenv_1.config)({
    path: __dirname + '/../../.env'
});
if (env_config.error) {
    throw env_config.error;
}
const env_vars = env_config.parsed;
exports.default = env_vars;
