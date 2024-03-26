import { ID, Query } from "appwrite";
import {
  account,
  appwriteConfig,
  avatars,
  databases,
} from "../appwriteConfig/appwrite";

export const userLogin = async (email: string, password: string) => {
  try {
    const promise = await account.createEmailSession(email, password);
    if (!promise) throw new Error("error while resolving promise");

    return promise;
  } catch (error) {
    throw new Error("Error while login");
    console.error(error);
  }
};

export const googleAuth = async () => {
  try {
    const promise = account.createOAuth2Session(
      "google",
      "http://localhost:5173",
      "http://localhost:5173/auth"
    );

    if (!promise) throw new Error("No user ");
    const getUser = await account.getSession("current");
    const user = await account.get();

    if (getUser.providerAccessToken) {
      const imageUrl = avatars.getInitials(user.name);
      await saveUserToDB({
        email: user.email,
        name: user.name,
        phone: user?.phone,
        authUserId: getUser.$id,
        imageUrl: imageUrl,
        username: user.email.slice(0, user.email.lastIndexOf("@")),
        location: "",
      });
    }

    return promise;
  } catch (error) {
    console.log(error);
  }
};

export const userSingup = async (
  fullname: string,
  email: string,
  password: string
) => {
  try {
    const promise = await account.create(
      ID.unique(),
      email,
      password,
      fullname
    );
    if (!promise) throw new Error("Error while signup");

    const imageUrl = avatars.getInitials(fullname);

    const saveUser = await saveUserToDB({
      email: promise.email,
      name: fullname,
      phone: promise?.phone,
      authUserId: promise.$id,
      imageUrl: imageUrl,
      username: promise.email.slice(0, promise.email.lastIndexOf("@")),
      location: "",
    });

    if (!saveUser) throw new Error("Error while saving user");

    return promise;
  } catch (error) {
    console.error(error);
  }
};

export const saveUserToDB = async ({
  email,
  name,
  phone,
  authUserId,
  imageUrl,
  username,
  location,
}: {
  email: string;
  name: string;
  phone: string;
  authUserId: string;
  imageUrl: URL;
  username: string;
  location: string;
}) => {
  try {
    const promise = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        email,
        name,
        phone,
        authUserId,
        imageUrl,
        username,
        location,
      }
    );
    if (!promise) throw new Error("error while saving user to db");
    return promise;
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async () => {
  try {
    const promise = await account.deleteSession("current");
    if (!promise) return;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const promise = await account.get();

    if (!promise) throw new Error("Error while getting current account");

    const getUserFromdb = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("authUserId", promise.$id)]
    );
    if (!getUser) throw new Error("Error");

    return {
      authUser: promise,
      userFromDB: getUserFromdb.documents,
    };
  } catch (error) {
    console.error(error);
  }
};

export const changeUserInfo = async ({
  email,
  password,
  phone,
  location,
  documentId,
}: {
  email?: string;
  password?: string;
  phone?: string;
  location?: string;
  documentId?: string;
}) => {
  try {
    if (email && password) {
      const getData = await account.get();
      if (!getData) return;
      const promise = await account?.updateEmail(email, password);
      if (!promise) throw new Error("error");
    }

    if (phone && password) {
      const promise = await account?.updatePhone(phone, password);
      if (!promise) throw new Error("error");
    }

    const getCurrentUser = await databases?.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      documentId || ""
    );

    if (!getCurrentUser) throw new Error("Error while getting user");

    const newData = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      documentId || "",
      {
        email: email ? email : getCurrentUser?.email,
        phone: phone ? phone : getCurrentUser?.phone,
        location: location ? location : getCurrentUser?.location,
      }
    );
    return newData;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const promise = await account.createRecovery(
      email,
      "http://localhost:5173/auth/updatePass"
    );
    if (!promise) throw new Error("Error while update account");

    console.log(promise);
    return promise;
  } catch (error) {
    console.log(error);
  }
};

export const updatePass = async (password: string, repeatPass: string) => {
  const promise = await new Promise(() => {
    setTimeout(() => {}, 0);
  });
  if (!promise) throw new Error("Error while update account");

  return { password, repeatPass };
};
