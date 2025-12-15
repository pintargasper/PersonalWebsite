type NewsArticle = {
    uuid: string;
    headline: string;
    shortDescription: string;
    content: string;
    language: string;
    published: boolean;
    newCoverImage?: File;
    existingCoverImage?: string;
    deletedCoverImage?: string;
    newImages: File[];
    existingImages: string[];
    deletedImages?: string[];
};

interface NewsArticleView {
    id: number;
    uuid: string;
    headline: string;
    description: string;
    image: string;
    published: boolean;
}

interface Translation {
    headline: string;
    description: string;
    content: string;
}

interface NewsArticleSingleView {
    id: number;
    uuid: string;
    translations: Record<string, Translation>;
    coverImage: string | null;
    images: string[];
    published: boolean;
}

const getArticles: (locale: string) => Promise<NewsArticleView[]> = async (locale: string): Promise<NewsArticleView[]> => {

    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_NEWS_ARTICLE_ALL_API_URL}?useLocale=${locale}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        const errorData: { message?: string; error?: string } = await response
            .json()
            .catch((): { message?: string; error?: string } => ({}));
        throw new Error(errorData.message || errorData.error);
    }
    return await response.json();
};

const getArticleSingle: (uuid: string) => Promise<NewsArticleSingleView> = async (uuid: string): Promise<NewsArticleSingleView> => {
    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_NEWS_ARTICLE_SINGLE_API_URL}/${uuid}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        const errorData: { message?: string; error?: string } = await response
            .json()
            .catch((): { message?: string; error?: string } => ({}));
        throw new Error(errorData.message || errorData.error);
    }
    return await response.json();
};

const saveArticle: (article: NewsArticle) => Promise<NewsArticle> = async (article: NewsArticle): Promise<NewsArticle> => {
    const formData = new FormData();
    formData.append("uuid", article.uuid);
    formData.append("headline", article.headline);
    formData.append("shortDescription", article.shortDescription);
    formData.append("content", article.content);
    formData.append("language", article.language);
    formData.append("published", String(article.published));

    if (article.newCoverImage) {
        formData.append("newCoverImage", article.newCoverImage);
    }

    if (article.existingCoverImage) {
        formData.append("existingCoverImage", article.existingCoverImage);
    }

    if (article.deletedCoverImage) {
        formData.append("deletedCoverImage", article.deletedCoverImage);
    }

    if (Array.isArray(article.newImages)) {
        article.newImages.forEach((image: File): void => {
            formData.append("newImages", image);
        });
    }

    if (Array.isArray(article.existingImages)) {
        article.existingImages.forEach((url: string): void => {
            formData.append("existingImages", url);
        });
    }

    if (Array.isArray(article.deletedImages)) {
        article.deletedImages.forEach((url: string): void => {
            formData.append("deletedImages", url);
        });
    }

    const response: Response = await fetch(process.env.NEXT_PUBLIC_NEWS_ARTICLE_SAVE_API_URL!, {
        method: "POST",
        credentials: "include",
        body: formData
    });

    if (!response.ok) {
        const errorData: { message?: string; error?: string } = await response
            .json()
            .catch((): { message?: string; error?: string } => ({}));
        throw new Error(errorData.message || errorData.error);
    }
    return await response.json();
};

const deleteArticle: (uuid: string) => Promise<boolean> = async (uuid: string): Promise<boolean> => {

    const response: Response = await fetch(`${process.env.NEXT_PUBLIC_NEWS_ARTICLE_DELETE_API_URL}/${uuid}`, {
        method: "DELETE",
        credentials: "include"
    });

    if (!response.ok) {
        const errorData: { message?: string; error?: string } = await response
            .json()
            .catch((): { message?: string; error?: string } => ({}));
        throw new Error(errorData.message || errorData.error);
    }
    return await response.json();
};

export {
    getArticles,
    getArticleSingle,
    saveArticle,
    deleteArticle
}

export type {
    NewsArticleView,
    NewsArticleSingleView,
    Translation,
    NewsArticle
};
