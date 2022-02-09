import {config} from "dotenv";

const env_config = config({
	path: __dirname + '/../../.env'
});

if (env_config.error){
	throw env_config.error
}

interface EnvVars {
	[key: string]: string;
}

const env_vars:EnvVars = env_config.parsed as EnvVars;

export default env_vars;
