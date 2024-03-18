import { appwriteConfig, databases } from "../../appwriteConfig/appwrite";

export const getUserProfileById = async (userId: string) => {
  try {
    const promise = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!promise) throw new Error("Error while getting user by id");

    return promise;
  } catch (error) {
    console.log(error);
  }
};
