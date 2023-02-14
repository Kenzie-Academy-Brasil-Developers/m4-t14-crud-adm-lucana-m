import client from "./config";

const connectDataBase = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected!");
};

export default connectDataBase;
