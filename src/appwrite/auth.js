import { Client, Account, ID, Databases } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;
  databases;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  async registerUser({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (user) {
        console.log("user", user);
        const addUserInDB = await this.databases.createDocument(
          conf.databaseId,
          conf.collectionIdUser,
          ID.unique(),
          {
            userId: user.$id,
            userName: user.name,
          }
        );
        console.log("addUserInDB ", addUserInDB);
        return this.login({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite error :: getCurrentUser :: ", error);
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite error :: logout :: ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
