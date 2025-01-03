import { Client, Databases, Storage, Query, ID, Account } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.account = new Account(this.client);
  }

  async getAuthorData(id) {
    try {
      const user = await this.account.get(id);
      return user;
    } catch (error) {
      console.error("Appwrite service :: getAuthorData :: ", error);
    }
  }

  async getAuthorMetaData(id) {
    try {
      const queries = [Query.equal("userId", id)];
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.collectionIdUser,
        queries
      );
    } catch (error) {
      console.error("Appwrite service :: getAuthorMetaData :: ", error);
    }
  }

  async createPost({
    title,
    content,
    featuredImage,
    status,
    userId,
    readTime,
    category,
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.collectionIdArticle,
        ID.unique(),
        {
          userId,
          title,
          content,
          featuredImage,
          status,
          readTime,
          category,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: createPost :: ", error);
    }
  }
  async updatePost(
    postId,
    { title, content, featuredImage, status, readTime, category }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.collectionIdArticle,
        postId,
        {
          title,
          content,
          featuredImage,
          status,
          readTime,
          category,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: updatePost :: ", error);
    }
  }
  async getPost(postID) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.collectionIdArticle,
        postID
      );
    } catch (error) {
      console.error("Appwrite service :: getPost :: ", error);
      return false;
    }
  }
  async deletePost(postId) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.collectionIdArticle,
        postId
      );
    } catch (error) {
      console.error("Appwrite service :: deletePost :: ", error);
      return false;
    }
  }
  async getAllPosts(queries = [Query.equal("status", true)]) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.collectionIdArticle,
        queries
      );
    } catch (error) {
      console.error("Appwrite service :: getAllPosts :: ", error);
      return false;
    }
  }

  async uploadFeatureImage(file) {
    try {
      return await this.bucket.createFile(
        conf.bucketIdArticle,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite service :: uploadFeatureImage :: ", error);
      return false;
    }
  }

  async deleteFeatureImage(fileId) {
    try {
      await this.bucket.deleteFile(conf.bucketIdArticle, fileId);
      return ture;
    } catch (error) {
      console.error("Appwrite service :: deleteFeatureImage :: ", error);
      return false;
    }
  }

  async updateFeatureImage(oldFileId, newFile) {
    try {
      const deleteResult = await this.deleteFeatureImage(oldFileId);
      if (!deleteResult) throw new Error("Failed to delete old file");

      return await this.uploadFeatureImage(newFile);
    } catch (error) {
      console.error("Appwrite service :: updateFeatureImage :: ", error);
      return false;
    }
  }

  async uploadProfilePhoto(file) {
    try {
      return await this.bucket.createFile(
        conf.bucketIdProfile,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite service :: uploadProfilePhoto :: ", error);
      return false;
    }
  }

  async deleteProfilePhoto(fileId) {
    try {
      await this.bucket.deleteFile(conf.bucketIdProfile, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteProfilePhoto :: ", error);
      return false;
    }
  }

  async updateProfilePhoto(oldFileId, newFile) {
    try {
      const deleteResult = await this.deleteProfilePhoto(oldFileId);
      if (!deleteResult) throw new Error("Failed to delete old file");

      return await this.uploadProfilePhoto(newFile);
    } catch (error) {
      console.error("Appwrite service :: updateProfilePhoto :: ", error);
      return false;
    }
  }

  async updateUserMetaData({ userId, bio, profileImage, userName }) {
    const findAuthor = await this.getAuthorMetaData(userId);

    console.log("find author : ", findAuthor);
    try {
      if (!findAuthor.documents[0]) {
        console.log("inside else !!");
        return await this.databases.createDocument(
          conf.databaseId,
          conf.collectionIdUser,
          ID.unique(),
          {
            userId,
            profileImage,
            bio,
            userName,
          }
        );
      } else {
        console.log("inside if XD  del file here:: ", findAuthor);
        return await this.databases.updateDocument(
          conf.databaseId,
          conf.collectionIdUser,
          findAuthor.documents[0].$id,
          {
            bio,
            profileImage,
            userName,
          }
        );
      }
    } catch (error) {
      console.log(
        "error while updating the user meat data :: updateUserMetaData",
        error
      );
    }
  }

  async updateUserName(name) {
    try {
      return this.account.updateName(name);
    } catch (error) {
      console.log(
        "Appwrite service :: updateProfilePhoto ::  updateUserName",
        error
      );
    }
  }

  getProfileImagePreview(fileId) {
    return this.bucket.getFilePreview(conf.bucketIdProfile, fileId);
  }

  getArticleImagePreview(fileId) {
    return this.bucket.getFilePreview(conf.bucketIdArticle, fileId);
  }

  async getSlidePosts() {
    return this.databases.listDocuments(
      conf.databaseId,
      conf.collectionIdSliderArticles
    );
  }
}

const service = new Service();

export default service;
