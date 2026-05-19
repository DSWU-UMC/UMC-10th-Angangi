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

export interface CreateLPRequest {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

export interface UpdateLPRequest {
  lpId: string;
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

export interface DeleteLPRequest {
  lpId: string;
}

interface CreateLPResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LP;
}

interface DeleteLPResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: null;
}

export interface CreateLPCommentRequest {
  lpId: string;
  content: string;
}

export interface UpdateLPCommentRequest {
  lpId: string;
  commentId: number;
  content: string;
}

export interface DeleteLPCommentRequest {
  lpId: string;
  commentId: number;
}

interface LPCommentResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LPComment;
}

interface DeleteLPCommentResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: null;
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

export const createLP = async ({
  title,
  content,
  thumbnail,
  tags,
  published,
}: CreateLPRequest): Promise<LP> => {
  const { data } = await axiosInstance.post<CreateLPResponse>("/v1/lps", {
    title,
    content,
    thumbnail,
    tags,
    published,
  });

  return data.data;
};

export const updateLP = async ({
  lpId,
  title,
  content,
  thumbnail,
  tags,
  published,
}: UpdateLPRequest): Promise<LP> => {
  const { data } = await axiosInstance.patch<LPDetailResponse>(
    `/v1/lps/${lpId}`,
    {
      title,
      content,
      thumbnail,
      tags,
      published,
    },
  );

  return data.data;
};

export const deleteLP = async ({ lpId }: DeleteLPRequest): Promise<null> => {
  const { data } = await axiosInstance.delete<DeleteLPResponse>(
    `/v1/lps/${lpId}`,
  );

  return data.data;
};

export const createLPComment = async ({
  lpId,
  content,
}: CreateLPCommentRequest): Promise<LPComment> => {
  const { data } = await axiosInstance.post<LPCommentResponse>(
    `/v1/lps/${lpId}/comments`,
    {
      content,
    },
  );

  return data.data;
};

export const updateLPComment = async ({
  lpId,
  commentId,
  content,
}: UpdateLPCommentRequest): Promise<LPComment> => {
  const { data } = await axiosInstance.patch<LPCommentResponse>(
    `/v1/lps/${lpId}/comments/${commentId}`,
    {
      content,
    },
  );

  return data.data;
};

export const deleteLPComment = async ({
  lpId,
  commentId,
}: DeleteLPCommentRequest): Promise<null> => {
  const { data } = await axiosInstance.delete<DeleteLPCommentResponse>(
    `/v1/lps/${lpId}/comments/${commentId}`,
  );

  return data.data;
};
