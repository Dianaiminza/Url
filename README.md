# Overview

This project is a URL shortener service built using Node.js and Firestore. The service provides a simple API to shorten long URLs and redirect short URLs to their original destinations. Firestore is used as the database to store URL mappings.

# Features

- Shorten URL: Generate a short URL for a given long URL.
- Redirect: Redirect a short URL to its original long URL.
- Analytics (optional): Track the number of times a short URL is accessed.

# Technologies Used

- Node.js: JavaScript runtime for building the server-side application.
- Express: Web framework for Node.js.
- Firestore: NoSQL database for storing URL mappings.

# Getting Started
## Prerequisites

- Node.js (version 14 or higher)
npm (Node Package Manager)
- Google Cloud Firestore (set up a Firestore database in your Google Cloud project)

# Installation
## Clone the repository:

git clone https://github.com/Dianaiminza/Url.git
cd Url

## Install the dependencies:

npm install

## Set up Firestore:

## Create a Firestore database in your Google Cloud project.

Download the service account key file from your Google Cloud project and save it in the project directory as serviceAccountKey.json.

## Create a .env file in the project root with the following content:

PORT=3000
FIRESTORE_PROJECT_ID=your-firestore-project-id

# Running the Application

- Start the server:
  npm start
The server will start on http://localhost:3000.

# Firestore Setup

- Initialize Firestore in your project by setting up a Firestore database in the Firebase Console.
- Create a collection named urls to store the URL mappings.
