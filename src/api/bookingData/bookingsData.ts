import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "../../appwriteConfig/appwrite";
import { BookingCreateType } from "../../types/types";
import { MAX_ITEMS_PER_PAGE } from "../../constants/constant";

export const getBookings = async (
  getFiltertVal: string,
  getSortedVal: string,
  page: string
) => {
  try {
    const query: string[] | undefined = [];

    if (page) {
      const offset =
        Number(page) === 1
          ? 0
          : MAX_ITEMS_PER_PAGE * Number(page) - MAX_ITEMS_PER_PAGE;
      query.push(Query.limit(MAX_ITEMS_PER_PAGE), Query.offset(offset));

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

export const salesData = async (reqReason: string) => {
  try {
    if (reqReason === "sales") {
      const promise = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.bookingsCollectionId,
        [Query.select(["totalPrice", "extrasPrice", "$createdAt"])]
      );
      if (!promise) throw Error("Error occured");

      return promise.documents;
    }
    if (reqReason === "stays") {
      const promise = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.bookingsCollectionId,
        [Query.limit(10)]
      );

      return promise.documents;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error while getting data");
  }
};

export const todayActivityData = async () => {
  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookingsCollectionId
    );
    if (!promise) throw Error("Error occured");

    const todayData = promise.documents.filter((item) => {
      const createdAtDate = new Date(item.$createdAt);

      return createdAtDate >= startOfDay && createdAtDate < today;
    });

    const checkedData = todayData?.filter(
      (item) => item.status !== "checked-out"
    );

    return checkedData;
  } catch (error) {
    throw new Error("Error while getting today activity");
  }
};

export const getBookingsForStat = async (last: string) => {
  try {
    const query: string[] = [];

    if (last === "7") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      query.push(Query.greaterThan("$createdAt", sevenDaysAgo.toISOString()));
    }

    if (last === "30") {
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);

      query.push(Query.greaterThan("$createdAt", monthAgo.toISOString()));
    }

    if (last === "90") {
      const almostHalfYear = new Date();
      almostHalfYear.setDate(almostHalfYear.getDate() - 90);

      query.push(Query.greaterThan("$createdAt", almostHalfYear.toISOString()));
    }

    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.bookingsCollectionId,
      query
    );

    return promise.documents;
  } catch (error) {
    throw Error("Error while getting data");
  }
};
