import { InitialArticleState } from 'types/articleType';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { articleClient } from 'api/client';
import { Article } from 'types/articleType';
import { decodeToken, getToken } from 'utilities/token';

export const getArticles = createAsyncThunk(
    'article/getArticles',
    async (
        {
            tag = '',
            token = '',
            isGlobal = false,
            isFavourite = false,
            userId = '',
            limit = 3,
            offset = 3,
        }: {
            tag?: string;
            token?: string;
            isGlobal?: boolean;
            isFavourite?: boolean;
            userId?: string;
            limit?: number;
            offset?: number;
        },
        { rejectWithValue }
    ) => {
        try {
            const res = await articleClient.getArticles({
                token,
                isGlobal,
                isFavourite,
                userId,
                limit,
                offset,
                tag,
            });
            return res!.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const getMoreArticles = createAsyncThunk(
    'article/getMoreArticles',
    async (
        {
            token = '',
            isGlobal = false,
            limit,
            offset,
        }: {
            token?: string;
            isGlobal?: boolean;
            limit?: number;
            offset?: number;
        },
        { rejectWithValue }
    ) => {
        try {
            const res = await articleClient.getMoreArticles({
                token,
                isGlobal,
                limit,
                offset,
            });
            return res!.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const likeArticle = createAsyncThunk(
    'article/likeArticle',
    async (
        { id, token }: { id: string; token: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await articleClient.likeArticle(id, token);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

export const unlikeArticle = createAsyncThunk(
    'article/unlikeArticle',
    async (
        { id, token }: { id: string; token: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await articleClient.unlikeArticle(id, token);
            return res.data.data;
        } catch (err: any) {
            const error = err.response.data.message;
            return rejectWithValue(error);
        }
    }
);

const initialState: InitialArticleState = {
    isLoadingMore: false,
    isLoading: false,
    isLiking: false,
    articles: [],
    error: null,
};

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        reset(state) {
            return (state = initialState);
        },
    },
    extraReducers: builder => {
        // Get Global articles
        builder.addCase(getArticles.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getArticles.fulfilled, (state, action) => {
            const token = getToken();

            // If not logged in
            if (!token) {
                const formattedPayload = action.payload.map(
                    (article: Article) => {
                        return { ...article, isLiked: false };
                    }
                );
                state.articles = formattedPayload;
            } else {
                const user = decodeToken(token);
                const id = user.id;

                const formattedPayload = action.payload.map(
                    (article: Article) => {
                        if (article.likes.find(a => a == id)) {
                            return { ...article, isLiked: true };
                        }

                        return { ...article, isLiked: false };
                    }
                );

                state.articles = formattedPayload;
            }

            state.isLoading = false;
        });
        builder.addCase(getArticles.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        // Get more articles
        builder.addCase(getMoreArticles.pending, (state, action) => {
            state.isLoadingMore = true;
            state.error = null;
        });
        builder.addCase(getMoreArticles.fulfilled, (state, action) => {
            const token = getToken();

            // If not logged in
            if (!token) {
                const formattedPayload = action.payload.map(
                    (article: Article) => {
                        return { ...article, isLiked: false };
                    }
                );
                state.articles = [...state.articles, ...formattedPayload];
            } else {
                const user = decodeToken(token);
                const id = user.id;

                const formattedPayload = action.payload.map(
                    (article: Article) => {
                        if (article.likes.find(a => a == id)) {
                            return { ...article, isLiked: true };
                        }

                        return { ...article, isLiked: false };
                    }
                );

                state.articles = [...state.articles, ...formattedPayload];
            }

            state.isLoadingMore = false;
        });
        builder.addCase(getMoreArticles.rejected, (state, action) => {
            state.isLoadingMore = false;
            state.articles = state.articles;
        });

        // Like artile
        builder.addCase(likeArticle.pending, (state, action) => {
            state.isLiking = true;
        });
        builder.addCase(likeArticle.fulfilled, (state, action) => {
            const likedArticleId = action.payload.id;

            // Update like on states
            state.articles = UpdateLikeOnState(state.articles, likedArticleId);

            state.isLiking = false;
        });
        // Unlike article
        builder.addCase(unlikeArticle.pending, (state, action) => {
            state.isLiking = true;
        });
        builder.addCase(unlikeArticle.fulfilled, (state, action) => {
            const unlikedArticleId = action.payload.id;

            state.articles = UpdateUnlikeOnState(
                state.articles,
                unlikedArticleId
            );

            state.isLiking = false;
        });
    },
});

function UpdateLikeOnState(articles: Article[], likedArticleId: string) {
    return articles.map(article => {
        if (article.id == likedArticleId) {
            return {
                ...article,
                likesCount: article.likesCount + 1,
                isLiked: true,
            };
        }
        return article;
    });
}

function UpdateUnlikeOnState(articles: Article[], unlikedArticleId: string) {
    return articles.map(article => {
        if (article.id == unlikedArticleId) {
            return {
                ...article,
                likesCount: article.likesCount - 1,
                isLiked: false,
            };
        }
        return article;
    });
}

export const { reset } = articleSlice.actions;

export default articleSlice.reducer;
