import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "../../appwriteConfig/appwrite";
import { BookingCreateType } from "../../types/types";

export const getBookings = async (
  getFiltertVal: string,
  getSortedVal: string
) => {
  try {
    const query: string[] | undefined = [];

    if (getFiltertVal === "all" && getSortedVal === "") {
      query;
    }

    if (getFiltertVal !== "all") {
      query.push(Query.equal("status", getFiltertVal));
    }

    if (getSortedVal === "date-asc") {
      query.push(Query.orderAsc("$createdAt"));
    }

    if (getSortedVal === "date-desc") {
      query.push(Query.orderDesc("$createdAt"));
    }

    if (getSortedVal === "amount-asc") {
      query.push(Query.orderAsc("totalPrice"));
    }

    if (getSortedVal === "amount-desc") {
      query.push(Query.orderDesc("totalPrice"));
    }

    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookingsCollectionId,
      query
    );

    if (!promise.documents) throw new Error("No Data!");

    return promise.documents;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBooking = async (documentId: string) => {
  try {
    const promise = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookingsCollectionId,
      documentId
    );
    if (!promise) throw new Error("can't delete booking");
  } catch (error) {
    console.log(error);
  }
};

export const checkInAndOut = async (
  documentId: string,
  value: string,
  isPaid?: boolean,
  hasBreakfast?: boolean
) => {
  try {
    const getBooking = await getBookingById(documentId);
    if (!getBooking) return;

    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookingsCollectionId,
      documentId,
      {
        status: value === "unconfirmed" ? "checked-in" : "checked-out",
        isPain: isPaid,
        hasBreakfast: hasBreakfast,
        extrasPrice: hasBreakfast ? 20 * getBooking?.numGuests : 0,
      }
    );

    if (!promise) throw new Error("Error while changing status");
  } catch (error) {
    console.log(error);
  }
};

export const getBookingById = async (bookingId: string) => {
  try {
    const promise = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookingsCollectionId,
      bookingId
    );

    if (!promise) throw new Error("Error while getting booking info");

    return promise;
  } catch (error) {
    console.log(error);
  }
};

export const createBookingApi = async (newBooking: BookingCreateType) => {
  console.log(newBooking);
  try {
    const promise = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.bookingsCollectionId,
      ID.unique(),
      newBooking
    );
    if (!promise) throw Error("Error occured");
  } catch (error) {
    throw new Error("Error while create new booking");
  }
};

export const salesData = async () => {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookingsCollectionId,
      [Query.select(["totalPrice", "extrasPrice", "$createdAt", "numNights"])]
    );
    if (!promise) throw Error("Error occured");

    return promise.documents;
  } catch (error) {
    console.error(error);
    throw new Error("Error while getting data");
  }
};
