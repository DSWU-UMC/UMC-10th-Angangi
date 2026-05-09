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
  nextCursor: number | null;
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

export interface LPComment {
  id: number;
  content: string;
  authorId: number;
  lpId: number;
  createdAt: string;
  updatedAt: string;
}

export interface LPCommentListData {
  data: LPComment[];
  nextCursor: number | null;
  hasNext: boolean;
}

interface LPCommentListResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LPCommentListData;
}

export const getLPList = async ({
  cursor,
  sort,
  limit = 10,
}: {
  cursor?: number;
  sort: SortType;
  limit?: number;
}): Promise<LPListData> => {
  const { data } = await axiosInstance.get<LPListResponse>("/v1/lps", {
    params: {
      cursor,
      limit,
      order: sort,
    },
  });

  return data.data;
};

export const getLPDetail = async (lpId: string): Promise<LP> => {
  const { data } = await axiosInstance.get<LPDetailResponse>(`/v1/lps/${lpId}`);

  return data.data;
};

export const getLPComments = async ({
  lpId,
  cursor,
  sort,
  limit = 10,
}: {
  lpId: string;
  cursor?: number;
  sort: SortType;
  limit?: number;
}): Promise<LPCommentListData> => {
  const { data } = await axiosInstance.get<LPCommentListResponse>(
    `/v1/lps/${lpId}/comments`,
    {
      params: {
        cursor,
        limit,
        order: sort,
      },
    },
  );

  return data.data;
};
