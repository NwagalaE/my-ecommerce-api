import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect(): Promise<void> {
  const dbUri = config.get<string>("dbUri");
  logger.info(`Database URL: ${dbUri}`);

  try {
    await mongoose.connect(dbUri, {
    });
    logger.info("Database connected to App");
  } catch (error) {
    logger.error("Error connecting to database", error);
    process.exit(1); // Exit process with failure code
  }
}

export default connect;
