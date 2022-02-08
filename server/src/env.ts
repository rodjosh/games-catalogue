import {config} from "dotenv";

const env_config = config({
	path: __dirname + '/../../.env'
});

if (env_config.error){
	throw env_config.error
}

export default env_config.parsed;
