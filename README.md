# Blog Post Application

A simple and secure blog application built with Node.js, Express, EJS, and MySQL. It allows users to create, edit, view, and delete blog posts while following security best practices and maintaining a lightweight, server-rendered architecture.

## Features

📝 Create, edit, delete, and view blog posts
🎨 Responsive interface built with pure CSS
⚡ Server-side rendering using EJS
🗄️ MySQL database for persistent storage
🛡️ Security headers with Helmet
🚦 Rate limiting to help prevent brute-force attacks
🗜️ Gzip compression for improved performance
📱 Responsive design

## Tech Stack

Node.js
Express.js
EJS
MySQL
Helmet
Express Rate Limit
Compression
CSS

## Security

- **Helmet** sets secure HTTP headers to help protect against common web vulnerabilities, including XSS and clickjacking.
- **Express Rate Limit** limits repeated requests to reduce the risk of brute-force and abuse attacks.

## Performance

- **Compression** compresses HTTP responses to reduce bandwidth usage and improve page load times.

## Installation

Clone the repository:

```bash
git clone [https://github.com/rasoulnasserifreelancer/Blog-Post.git]
```

Navigate to the project directory:

```bash
cd Blog-Post
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root and configure your database connection:

```env
DB_HOST=your_database_host
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_DATABASE=your_database_name
```
> [!IMPORTANT]
> Before running the application, make sure you have created a MySQL database. You can create one by connecting to your local MySQL server and running:
>
> ```sql
> CREATE DATABASE blog_post;
> ```
>
> Then update your `.env` file to use the database name:
 ```env
  DB_HOST=localhost
  DB_DATABASE=blog_post
  DB_PORT=3306
  DB_USER=your_database_user
  DB_PASSWORD=your_database_password
```

>
> [!NOTE]
> If you're using an external database with SSL (such as TiDB Cloud), configure the SSL certificate as required by your database provider.---

## Running the Application

### Development

```bash
npm run startserver
```

### Production

```bash
npm start
```

---

## Project Structure

```text

├── middleware/
├── public/
│   ├── css/
│   └── images/
|   └── scripts/
├── routes/
├── views/
├── utils/
├── app.js
├── package.json
└── README.md
```

---

## Screenshots


---

## Future Improvements

- User authentication and authorization
- Categories and tags
- Search functionality
- Rich text editor
- Comments system
- Pagination
- Image uploads

---

## License

This project is licensed under the **MIT License**.

Built with ❤️ using Node.js, Express, EJS, and MySQL.
