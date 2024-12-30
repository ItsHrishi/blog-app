import { Client, Databases, Storage, Query, ID } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, featuredImage, status, userId }) {
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
        }
      );
    } catch (error) {
      console.error("Appwrite service :: createPost :: ", error);
    }
  }
  async updatePost(postId, { title, content, featuredImage, status }) {
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
  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      await this.databases.listDocuments(
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
      return ture;
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
}

const service = new Service();

export default service;
