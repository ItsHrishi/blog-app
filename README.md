# BlogVerse - Modern Blogging Platform

A full-stack blogging platform built with React + Vite and Appwrite backend. Create, share, and manage blog posts with a rich text editor, user authentication, and image management.

## 🚀 Features

- User authentication and authorization
- Rich text editing with TinyMCE
- Image upload for articles and profile pictures
- Responsive design
- User profiles
- Article search and filtering
- Real-time updates

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Redux Toolkit
- **Backend**: Appwrite
- **Editor**: TinyMCE
- **Styling**: Tailwind CSS, Radix UI
- **Form Handling**: React Hook Form
- **Routing**: React Router v6

## 📋 Prerequisites

Before you begin, ensure you have the following:

- Node.js (v16 or higher)
- npm or yarn
- An Appwrite account
- TinyMCE API key

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd blogverse
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:

   ```env
   VITE_APPWRITE_URL = "https://cloud.appwrite.io/v1"
   VITE_APPWRITE_PROJECT_ID = "your-project-id"
   VITE_APPWRITE_DATABASE_ID = "your-database-id"
   VITE_APPWRITE_COLLECTION_ID_ARTICLES = "your-articles-collection-id"
   VITE_APPWRITE_COLLECTION_ID_USERS = "your-users-collection-id"
   VITE_APPWRITE_BUCKET_ID_PROFILE = "your-profile-bucket-id"
   VITE_APPWRITE_BUCKET_ID_ARTICLE = "your-article-bucket-id"
   VITE_TINY_MCE_KEY = "your-tinymce-api-key"
   ```

4. **Appwrite Setup**

   - Create a new project in Appwrite Console
   - Set up the following:
     - Database with two collections (Articles and Users)
     - Storage buckets for profile pictures and article images
     - Authentication methods (email/password, OAuth providers if needed)

5. **Run the development server**
   ```bash
   npm run dev
   ```

## 📚 Appwrite Collections Structure

### Users Collection

- userId (string)
- bio (string)
- profileImage (string) - (StorageId)

### Articles Collection

- articleId (string)
- title (string)
- content (string)
- userId (string)
- featuredImage (string) - (StorageId)
- status (boolean)
- category (array)
- readTime (integer)

## 🔐 Security

- Protected routes using React Router
- Secure file uploads with Appwrite Storage
- Input sanitization
- Environment variables for sensitive data

## 🚀 Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Test the production build locally:

   ```bash
   npm run preview
   ```

3. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) for the backend services
- [TinyMCE](https://www.tiny.cloud/) for the rich text editor
- [Radix UI](https://www.radix-ui.com/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📧 Contact

Your Name - [ghrishikesh77@gmail.com](mailto:ghrishikesh77@gmail.com)
