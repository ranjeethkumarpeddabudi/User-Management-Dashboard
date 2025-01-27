### Set Up Instructions

<details>
<summary>Click to view</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm run dev`
</details>

### Explanation of Directory Structure and components

### Root Directory

The root directory is the top-level folder that contains all the project files and subdirectories.

### Common Files in the Root Directory:

- **`.gitignore`**: Lists files and directories that Git should ignore.
- **`eslint.config.js`**: This will help to identify and report the errors that are found in javascript.
- **`index.html`**: The main HTML file where the app is mounted.
- **`package-lock.json`**: this will Locks the specific versions of dependencies that are installed.
- **`package.json`**: It Contains metadata including dependencies, scripts, devdependencies.
- **`README.md`**: A markdown file with a project overview, setup instructions, and other relevant information.
- **`vite.config.js`**: It allows to configure settings such as plugins,build optimizations and more.

## `src` Directory

The `src` (source) directory contains all the application source code.

### Subdirectories in `src`:

1. **`components/`**:

   - Contains reusable UI components.
   - Contains **`index.css`** to style the UI globally.
   - Contains **`main.jsx`** It is the entry point of the app that wraps around Browser Router to faciliate Routing.

2. **`components/App`**:

   - It holds all the child components.
   - It fetches the data from API and update the state.
   - Includes all the functions that are required for the entire app and passes to child components using ContextApi Provider component

3. **`components/ContextApi`**:

   - It holds the global state for the entire app.

4. **`components/ErrorBoundary`**:

   - catches errors around the app and display user-friendly messages.

5. **`components/Header`**:

   - Contains `Add User` button

6. **`components/UserForm`**:

   - Contains user form to add and update the user data

7. **`components/UserList`**:

   - It renders the users-List that are present in the global state

---

## `public` Directory

The `public` directory contains image **`User_icon.png`**

## Challenges faced

-

## Further Improvements
