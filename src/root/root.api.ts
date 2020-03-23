import axios, { AxiosResponse } from "axios";
import {
  GetRandomObjectResponse,
  GetObjectColorsResponse,
  GetColorPalettesListResponse,
  GetColorPaletteInfoResponse,
} from "src/root/root.api.types";

const ACCESS_TOKEN = "4a8efcf02e8c9b1d5f45f05f538b9136";

export const apiClient = axios.create({
  baseURL: "https://api.collection.cooperhewitt.org/rest/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export const Api = {
  getRandomObject: async (): Promise<AxiosResponse<GetRandomObjectResponse>> =>
    apiClient.get<GetRandomObjectResponse>(
      `?method=cooperhewitt.objects.getRandom&access_token=${ACCESS_TOKEN}`
    ),
  getObjectColors: async (
    id: string
  ): Promise<AxiosResponse<GetObjectColorsResponse>> =>
    apiClient.get<GetObjectColorsResponse>(
      `?method=cooperhewitt.objects.getColors&access_token=${ACCESS_TOKEN}&id=${id}`
    ),
  getColorPalettesList: async (): Promise<
    AxiosResponse<GetColorPalettesListResponse>
  > =>
    apiClient.get<GetColorPalettesListResponse>(
      `?method=cooperhewitt.colors.palettes.getList&access_token=${ACCESS_TOKEN}`
    ),
  getColorPaletteInfo: async (
    id: string
  ): Promise<AxiosResponse<GetColorPaletteInfoResponse>> =>
    apiClient.get<GetColorPaletteInfoResponse>(
      `?method=cooperhewitt.colors.palettes.getInfo&access_token=${ACCESS_TOKEN}&palette=${id}`
    ),
};
