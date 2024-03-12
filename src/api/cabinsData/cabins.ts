import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "../../appwriteConfig/appwrite";
import { CabinEditType, CabinType } from "../../types/types";

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
