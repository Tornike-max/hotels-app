import { ID, Query } from "appwrite";
import {
  appwriteConfig,
  databases,
  storage,
} from "../../appwriteConfig/appwrite";
import { CabinCreateType, CabinEditType, CabinType } from "../../types/types";

export const getCabins = async (filterVal: string, sortValue: string) => {
  const query: string[] | undefined = [];
  try {
    if (filterVal === "no-discount") {
      query.push(Query.equal("discount", 0));
    }
    if (filterVal === "with-discount") {
      query.push(Query.notEqual("discount", 0));
    }

    if (sortValue === "name-asc") {
      query.push(Query.orderAsc("name"));
    }

    if (sortValue === "name-desc") {
      query.push(Query.orderDesc("name"));
    }

    if (sortValue === "price-asc") {
      query.push(Query.orderAsc("regularPrice"));
    }

    if (sortValue === "price-desc") {
      query.push(Query.orderDesc("regularPrice"));
    }

    if (sortValue === "capacity-asc") {
      query.push(Query.orderAsc("maxCapacity"));
    }

    if (sortValue === "capacity-desc") {
      query.push(Query.orderDesc("maxCapacity"));
    }

    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cabinsCollectionId,
      query
    );

    if (!promise) return;

    return promise.documents;
  } catch (error) {
    console.log(error);
  }
};

export const getCabinsIds = async () => {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cabinsCollectionId,
      [Query.select(["$id", "name", "imageUrl", "regularPrice"])]
    );

    if (!promise) throw new Error("Error while getting cabin Ids");

    return promise.documents;
  } catch (error) {
    console.error(error);
  }
};

export const duplicateCabin = async (duplicateData: CabinType) => {
  try {
    const promise = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cabinsCollectionId,
      ID.unique(),
      duplicateData
    );

    if (!promise) return;

    return promise;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCabin = async (documentId: string) => {
  try {
    const promise = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cabinsCollectionId,
      documentId
    );

    if (!promise) throw new Error("Error while deleting");
  } catch (error) {
    console.error(error);
  }
};

export const getSelectedCabin = async (documentId: string) => {
  try {
    const promise = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cabinsCollectionId,
      documentId
    );
    if (!promise) throw new Error("Error while getting selected cabin");

    return promise;
  } catch (error) {
    console.log(error);
  }
};

export const editCabinApi = async (
  documentId: string,
  updatedData: CabinEditType
) => {
  try {
    const selectedCabin = await getSelectedCabin(documentId);
    if (!selectedCabin) throw new Error("Can't get cabin");

    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cabinsCollectionId,
      documentId,
      {
        name: updatedData.name ? updatedData.name : selectedCabin.name,
        description: updatedData.description
          ? updatedData.description
          : selectedCabin.description,
        discount: updatedData.discount
          ? updatedData.discount
          : selectedCabin.discount,
        maxCapacity: updatedData.maxCapacity
          ? updatedData.maxCapacity
          : selectedCabin.maxCapacity,
        regularPrice: updatedData.regularPrice
          ? updatedData.regularPrice
          : selectedCabin.regularPrice,
      }
    );
    if (!promise) return;

    return promise;
  } catch (error) {
    console.log(error);
  }
};

export const createNewCabin = async (newData: CabinCreateType) => {
  console.log(newData);
  try {
    const createCabinFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      newData.imageUrl
    );

    const getFile = storage.getFilePreview(
      appwriteConfig.storageId,
      createCabinFile.$id
    );

    const promise = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cabinsCollectionId,
      ID.unique(),
      {
        ...newData,
        imageUrl: getFile.href,
        hush: "LEHLk~WB2yk8pyo0adR*.7kCMdnj",
      }
    );
    if (!promise) throw new Error("Error occured");
    return promise;
  } catch (error) {
    throw Error("Error while create new Cabin");
  }
};
