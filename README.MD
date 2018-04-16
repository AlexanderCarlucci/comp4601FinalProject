
# About
This is a project for Carleton University Comp 4601 class
Our project is a prototype for a system that recommends friends for you to delete from your social media friends lists. In order to do this we use a combination of ranking, clustering and raw heuristics analysis to implement a recommender system that determines which of a users friends they might want to remove.

# To Use
## Prerequisites
+ Node.js https://nodejs.org/en/

## Setup
+ Download the code
+ Navigate to the download directory in your terminal
+ Enter the following commands:

  + ``npm install``

## Run
+ Enter The following commands:

  + ``npm run start``

You will know that the web service is running when the terminal spits out the message:
 ``Web Service listening on port 3000!``

## Services
The Following Services are available from the base path: localhost:3000
+ ``/ ``: gives a list of all users in the network
+ ``/user/:id`` : gives a view of the users profile with a like to run suggest algorithm at the bottom.
+ ``/user/suggest/:id`` : runs the suggest algorithm on a specified user and list the recommended users to delete as well as the reasoning for the recommendation.

By Default there are 100 users (IDs 0 - 99).
