# ReadIt

## Description
ReadIt is an engaging online platform inspired by Reddit, where users can post, interact, and engage in discussions on a wide range of topics. The application is built using Node.js and MySQL, offering a robust and scalable solution for an interactive social experience.

## Dependencies
- **MySQL**: For database management. Install MySQL Server for running database commands. Optionally, MySQL Workbench can be used for easier database management.
- **Node.js**: The application is built on Node.js. Ensure you have the latest version installed.

## Initial Setup
1. **MySQL Database Setup**:
   - Create a 'blog' schema (if it doesn't exist) in MySQL.
   - Run the MySQL script provided in the code submission files to set up the database structure.

2. **Project Setup**:
   - Clone the repository and navigate to the project directory.
   - Run `npm install` to install all the required dependencies.

3. **Database Configuration**:
   - In the `config` folder, locate the `db.js` file.
   - Update the database connection details (host, user, password, and database name) according to your setup. The default database name in the script is 'blog'.

## Running the Application
- Launch the application by running `node app.js` in your terminal. The application will be available on `http://localhost:3000`.
- Optionally, you can deploy and host the application and database on any cloud provider.

## Features
- Post creation and interaction similar to Reddit.
- User-friendly interface for seamless navigation and engagement.
- Robust discussion and community-building tools.

---

ReadIt: Experience the power of community and discussion on a platform inspired by Reddit.
