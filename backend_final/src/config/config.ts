import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.string()
    .description("The port on which the server will listen.")
    .default("8080"),
  MONGODB_URI: Joi.string().description(
    "The URI for the mongo database connection."
  ),
  JWT_AUTH_SECRET: Joi.string()
    .description("Secret key for JWT authentication.")
    .default("12345678"),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  port: envVars.PORT,
  mongoose: {
    uri: envVars.MONGODB_URI + (envVars.ENV === "test" ? "-test" : ""),
    options: {},
  },
  jwt: {
    secret: envVars.JWT_AUTH_SECRET,
  },
};

export default config;
