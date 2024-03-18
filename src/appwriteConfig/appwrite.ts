import { Account, Avatars, Client, Databases, Storage } from "appwrite";

const client = new Client();

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID as string,
  endPoint: import.meta.env.VITE_APPWRITE_ENDPOINT as string,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID as string,
  userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID as string,
  bookingsCollectionId: import.meta.env
    .VITE_APPWRITE_BOOKINGS_COLLECTION_ID as string,
  cabinsCollectionId: import.meta.env
    .VITE_APPWRITE_CABINS_COLLECTION_ID as string,
  guestsCollectionId: import.meta.env.VITE_APPWRITE_GUESTS_COLLECTION_ID,
  settingsCollectionId: import.meta.env.VITE_APPWRITE_SETTINGS_COLLECTION_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
};

client
  .setEndpoint(appwriteConfig.endPoint)
  .setProject(appwriteConfig.projectId);

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
