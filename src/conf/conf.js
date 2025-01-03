const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  collectionIdArticle: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_ARTICLES
  ),
  collectionIdUser: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS),
  collectionIdSliderArticles: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID_SLIDER_ARTICLES
  ),
  bucketIdProfile: String(import.meta.env.VITE_APPWRITE_BUCKET_ID_PROFILE),
  bucketIdArticle: String(import.meta.env.VITE_APPWRITE_BUCKET_ID_ARTICLE),
  tinyMCE: String(import.meta.env.VITE_TINY_MCE_KEY),
};

export default conf;
