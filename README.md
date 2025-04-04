# storage-web-app

The repository contains a simple storage app demonstrating use of authentication, file uploading &amp; Prisma ORM.

- Check out the [live preview](https://storage-web-app-production.up.railway.app/)

## Technologies Used

- Node
- Express
- Prisma
- PostgreSQL
- JavaScript
- EJS
- CSS

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ishmyles/storage-web-app.git
   cd storage-web-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following variables:

   ```env
    PORT=3000
    STORAGE_FOLDER="<Add destination folder for multer to save files locally>"
    COOKIE_SECRET="<Enter a password>"
    SALT="<Enter salt>"
    DATABASE_URL="postgres://<DB_USERNAME>:<PASSWORD>@localhost:5432/<DB_NAME>"
   ```

4. **Start the application**:

   ```bash
   node --watch --env-file .env app.js
   ```

   The app will be accessible at `http://localhost:3000`.

5. **Terminating the application**:

   Press Ctrl + C to terminate app.

## App Design

### Requirements

- Users MUST be authenticated to perform CRUD functionality for folders/files
- Users can create folders
- Users can add/upload files
- Users can view folders & their contents
- Users can view file details (eg. name, file size, uploadedAt)
- Users can download the uploaded file

### ERD

![](./DESIGN_FILES/StorageAppERD.jpg)

### Written Design

![](./DESIGN_FILES/FileStorageAppDesign.jpg)
