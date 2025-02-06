
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
  Permission,
  Role,
  Functions,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "6781ffea00354ecae5ca",
  databaseId: "678225de0029c6d82768",
  coordCollectionId: "67a51c4100107383fe9d", 
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId); // Removed .setPlatform(config.platform)

const account = new Account(client);
const databases = new Databases(client);

// Create document record in database
export async function getCoord(latitude, longitude) {
  try {
    const newCoord = await databases.createDocument(
      config.databaseId,
      config.coordCollectionId, // Ensure this exists
      ID.unique(),
      {
        latitude,
        longitude
      }
    );
      console.log("Data successfully saved:", newCoord);
    return newCoord;
  } catch (error) {
      console.error("Appwrite Error:", error.message);
    throw new Error(error);
  }
}

// Fetch the latest saved coordinates from Appwrite
export async function fetchLatestCoord() {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.coordCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(1)] // Get the most recent document
    );
    
    if (response.documents.length > 0) {
      return response.documents[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw new Error(error);
  }
}