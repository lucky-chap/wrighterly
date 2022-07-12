import axios, { AxiosResponse } from "axios";
import { IndexableType } from "dexie";
import { nanoid } from "nanoid";
import { API_BASE_URL } from "../constants";
import { ResponseTypeMap, Wright } from "../types";
import { toBoolean } from "../utils";
import { db, WrightIDB } from "./dbService";

export const createWright = async (isGuest: boolean): Promise<Wright | WrightIDB | undefined> => {
  if (isGuest) {
    const id = nanoid();
    const baseWright: WrightIDB = {
      id,
      head: "",
      title: "Give me a title",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "-99999",
      content: "",
    };
    const newId = await db.wrights.add(baseWright);
    return db.wrights.get(newId);
  }
  const response = (await axios.post(`${API_BASE_URL}/wright`, {}, { withCredentials: true })) as AxiosResponse<Wright>;
  return response.data;
};

// export type AllWrightsResponseType = ResponseTypeMap<WrightIDB[], AxiosResponse<Wright[]>>;
// export const getAllWrights = async <T extends keyof AllWrightsResponseType>(
//   isGuest: T
// ): Promise<AllWrightsResponseType[T] | undefined> => {
//   return (toBoolean(isGuest) ? db.wrights.toArray() : axios.get(`${API_BASE_URL}/wright`, { withCredentials: true })) as Promise<
//     AllWrightsResponseType[T]
//   >;
// };

export const getAllWrights = async (isGuest: boolean): Promise<Wright[] | WrightIDB[] | undefined> => {
  if (isGuest) {
    return db.wrights.toArray();
  }
  const wrights = (await axios.get(`${API_BASE_URL}/wright`, { withCredentials: true })) as AxiosResponse<Wright[]>;
  return wrights.data;
};
