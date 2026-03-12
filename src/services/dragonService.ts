import axios from "axios";
import { type IDragon } from "../interfaces/dragon";
const API_URL = "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon";

export const listarDragoes = async (): Promise<IDragon[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};