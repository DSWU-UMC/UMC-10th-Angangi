import { axiosInstance } from "./axiosInstance";

export type SortType = "asc" | "desc";

export interface Tag {
  id: number;
  name: string;
}

export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface LP {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
}

export interface LPListData {
  data: LP[];
  nextCursor: number;
  hasNext: boolean;
}

interface LPListResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LPListData;
}

interface LPDetailResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LP;
}

export const getLPList = async (sort: SortType): Promise<LPListData> => {
  const { data } = await axiosInstance.get<LPListResponse>("/v1/lps", {
    params: {
      order: sort,
    },
  });

  return data.data;
};

export const getLPDetail = async (lpId: string): Promise<LP> => {
  const { data } = await axiosInstance.get<LPDetailResponse>(`/v1/lps/${lpId}`);

  return data.data;
};
