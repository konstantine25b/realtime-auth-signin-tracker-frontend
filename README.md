# ReactJS Frontend for Full-Stack Web Application with Django, GraphQL, and ReactJS

## Overview

This project includes a ReactJS frontend for a full-stack web application built with GraphQL. The application focuses on user authentication, registration, and real-time updates of sign-in counts using WebSocket functionality. It also features real-time notifications for users when a global sign-in count threshold is reached.

## Technologies Used

- **ReactJS**: JavaScript library for building user interfaces.
- **@apollo/client**: Fully-featured GraphQL client to interact with the GraphQL server.
- **React Router DOM**: Declarative routing for React.
- **@emotion/styled**: Library for writing CSS styles with JavaScript.

### User Interfaces

- **Authentication**: User interfaces for login and registration with forms styled using @emotion/styled.
- **Dashboard**: Displays the user's personal sign-in count, global sign-in count, and provides options for password change.
- **Real-Time Updates**: Updates the dashboard in real-time to reflect changes in personal and global sign-in counts.

### Password Change

- **Password Change**: Allows users to change their passwords securely from within their account settings. This feature ensures that users can update their credentials as needed, enhancing security and usability.

### Real-Time Functionality

- **WebSocket Integration**: Implemented using @apollo/client to enable live updates on the frontend.
- **Personal Sign-in Count**: Updates in real-time upon successful authentication.
- **Global Sign-in Count**: Real-time updates for the global sign-in count, reflecting the sum of sign-ins by all users.
- **Notifications**: Visual indicators (notifications) triggered when the global sign-in count reaches a certain threshold (e.g., 5 sign-ins).

## Getting Started

### Installation

1. Clone the repository and navigate to the frontend directory:

   ```sh
   git clone https://github.com/konstantine25b/realtime-auth-signin-tracker-frontend
   cd realtime-auth-signin-tracker-frontend

2. Install dependencies:

   ```sh
   npm install

3. Running the Application

   ```sh
   npm start

## To test the real-time functionality and notifications, follow these steps:

 1. **Start the React Development Servers**:
    
    ```sh
    npm start

 2. Open two (or more) separate terminal windows and run npm start in each to start two (or more) instances of the React development server.

 ### Registration and Login:

   In both instances of the application, proceed to register new users and log in.
   Perform actions such as logging in and out to observe the personal sign-in count updates.
   Monitor the global sign-in count in both instances to observe real-time updates.
   When the global sign-in count reaches a certain threshold (e.g., 5 sign-ins), both instances should display visual notifications.

 ### Interaction:

   Ensure that actions in one instance (e.g., login/logout) reflect real-time updates in the other instance (global sign-in count).
   Verify that notifications are triggered accurately based on the global sign-in count threshold.

 These steps help validate the functionality of real-time updates, notifications, and overall user interaction within the application.

   
