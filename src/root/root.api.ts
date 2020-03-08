import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Object,
  GetRandomObjectResponse,
  GetObjectColorsResponse,
  GetColorPalettesListResponse,
  GetColorPaletteInfoResponse,
  Error,
} from "src/root/root.api.types";
import { RemoteData, success, failure } from "@devexperts/remote-data-ts";

const ACCESS_TOKEN = "786356ec968c593e990f5d5eb14cd4ff";

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
