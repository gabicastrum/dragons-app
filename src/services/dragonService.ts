import axios from "axios";
import { type IDragon } from "../interfaces/dragon";
const API_URL = "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon";

export const listarDragoes = async (): Promise<IDragon[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const cadastrarDragao = async (dragao: Omit<IDragon, "id">): Promise<IDragon> => {
  const response = await axios.post(API_URL, dragao);
  return response.data;
};

export const buscarDragaoPorId = async (id: string): Promise<IDragon> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const atualizarDragao = async (id: string, dragao: Omit<IDragon, "id">): Promise<IDragon> => {
  const response = await axios.put(`${API_URL}/${id}`, dragao);
  return response.data;
};

export const deletarDragao = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};