import { appwriteConfig, databases } from "../../appwriteConfig/appwrite";
import { SettingsType } from "../../types/types";

export const getSettings = async () => {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.settingsCollectionId
    );

    if (!promise) throw new Error("Something went wrong");
    return promise.documents[0];
  } catch (error) {
    throw new Error("Error while getting settings");
  }
};

export const updateSettings = async (
  documentId: string,
  settingData: SettingsType
) => {
  try {
    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.settingsCollectionId,
      documentId,
      settingData
    );

    if (!promise) throw Error("Error Occured");

    return promise;
  } catch (error) {
    throw new Error("Error while update settings");
  }
};
