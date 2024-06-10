# Blogging Website (Module #6, MERN Stack)
![](thumbnail.png)

## Objectives
Developed a RESTful API for a blog application, featuring user authentication with PassportJS and JWT. Utilized MongoDB for seamless CRUD operations on both posts and comments.

## .ENV file
```
JWT_SECRET_KEY=any random alphanumeric key of yours choice
MONGODB_CONNECTION_STRING= get it from Yours MongoDB Atlas account (https://cloud.mongodb.com/)
USER_SESSION_EXPIRES_AFTER="2 days"
```

## Postman API Endpoints file
[Postman API Endpoints.json](blogging-website-m6node.postman_collection.json)


## How to install and run in yours local machine
```bash
npm install
npm run start
```

## 1. User Authentication Endpoints

## 1.1 POST /user/sign-up

### Purpose:
Create a new user.

### Request Body:

```javascript
JSON BODY
{
    "firstName": "admin",
    "lastName": "",
    "email": "admin@alex21c.com",
    "password": "admin123" 
}

```

### Response:
```javascript
JSON
{
    "success": true,
    "message": "Account created successfully !",
    "Authorization": "Bearer JWT_TOKEN"
}

```

## 1.2 POST /user/login

### Purpose:

Authenticate a user and provide a JWT token.

### Request Body:

```javascript
{
    "email":"admin@alex21c.com",
    "password":"admin123"
}
```

### Response:

JWT token on successful authentication.
```javascript
{
    "success": true,
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY2YWIyZTMxNzUwOGQxMjBjZDU3NjkiLCJpYXQiOjE3MTgwMDQ2NTYsImV4cCI6MTcxODE3NzQ1Nn0.pq3_WiIUMM9NeN6C43YcBG33k86FeMOD3C0i2K38pCE"
}
```

## 1.3 POST /user/logout
Just delete the token from local storage or cookies from the client side!

## 2 Post Endpoints

## 2.1 GET /post/get-all-the-posts

### Purpose:

Retrieve all posts.

### Response:

Array of posts with author details.
```javascript
{
    "success": true,
    "data": [
        {
            "_id": "666596d7dda77196802251c7",
            "author": "66618a6bfad3bf7871c6e3d6",
            "title": "how to achieve financial freedom before age 40 !",
            "body": "I'm having a vision of achieving financial freedom and here is my plan:\n I will upskill myself by learning MERN stack & DSA, and then get job as Full Stack MERN Developer getting around ₹12LPA, then for the next 10 Years i will keep that money invested in Stock Market, Gold & Silver, and after 10 years i should have around ₹1 Crore, which shall be enough to get 1% return/month (₹1 Lakh/month) from stock market, and i will be financially free, and now can focus on my vision board of acquiring more income generating assets and having Private Limited companies, World Tour!",
            "keywords": [
                "financial freedom",
                "blog",
                "article by alex21c"
            ],
            "comments": [],
            "createdAt": "2024-06-09T11:49:43.942Z",
            "updatedAt": "2024-06-09T11:49:43.942Z",
            "__v": 0
        },
      ...
      {
        POST #N
      }
```


## 2.2 POST /post/create-a-new-post

### Purpose:

Create a new post.

### Headers:

Requires JWT token.
```
Authorization: Bearer JWT_TOKEN
```

### Request Body:

```javascript
JSON
{
   "title": "how to achieve financial freedom before age 40 ! (post N)",
   "body": "I'm having a vision of achieving financial freedom and here is my plan:\n I will upskill myself by learning MERN stack & DSA, and then get job as Full Stack MERN Developer getting around ₹12LPA, then for the next 10 Years i will keep that money invested in Stock Market, Gold & Silver, and after 10 years i should have around ₹1 Crore, which shall be enough to get 1% return/month (₹1 Lakh/month) from stock market, and i will be financially free, and now can focus on my vision board of acquiring more income generating assets and having Private Limited companies, World Tour!",
   "keywords": [
        "financial freedom",
        "blog",
        "article by alex21c"
   ]
}
```

### Response:

Details of the created post.
```javascript
{
    "success": true,
    "message": "post created Successfully !",
    "postID": "6666adbd43fc4171b2f1235d"
}
```

## 2.3 GET /post/get-single-post/:postID

### Purpose:

Retrieve a single post by ID.
### Headers
Requires JWT token.
```
Authorization: Bearer JWT_TOKEN
```

### Response:
Post details with author information.
```javascript
{
    "success": true,
    "data": {
        "_id": "6666ad975d1144bb63480522",
        "author": "6666ab2e317508d120cd5769",
        "title": "how to achieve financial freedom before age 40 ! (post N)",
        "body": "I'm having a vision of achieving financial freedom and here is my plan:\n I will upskill myself by learning MERN stack & DSA, and then get job as Full Stack MERN Developer getting around ₹12LPA, then for the next 10 Years i will keep that money invested in Stock Market, Gold & Silver, and after 10 years i should have around ₹1 Crore, which shall be enough to get 1% return/month (₹1 Lakh/month) from stock market, and i will be financially free, and now can focus on my vision board of acquiring more income generating assets and having Private Limited companies, World Tour!",
        "keywords": [
            "financial freedom",
            "blog",
            "article by alex21c"
        ],
        "comments": [],
        "createdAt": "2024-06-10T07:39:03.467Z",
        "updatedAt": "2024-06-10T07:39:03.467Z",
        "__v": 0
    }
}
```

## 2.4 PUT /post/update-single-post/:postID

### Purpose:
Update a post by ID.

### Headers
Requires JWT token.
```
Authorization: Bearer JWT_TOKEN
```

### Request Body:

```javascript
JSON
{
   "title": "UPDATED-TITLE : how to achieve financial freedom before age 40 ! (post 3)",
   "body": "UPDATED-BODY: I'm having a vision of achieving financial freedom and here is my plan:\n I will upskill myself by learning MERN stack & DSA, and then get job as Full Stack MERN Developer getting around ₹12LPA, then for the next 10 Years i will keep that money invested in Stock Market, Gold & Silver, and after 10 years i should have around ₹1 Crore, which shall be enough to get 1% return/month (₹1 Lakh/month) from stock market, and i will be financially free, and now can focus on my vision board of acquiring more income generating assets and having Private Limited companies, World Tour!",
   "keywords": [
        "UPDATED-KEYWORD",
        "financial freedom",
        "blog",
        "article by alex21c"
   ]
}
```

### Response #1 (if postID is invalid):
```javascript
{
    "success": false,
    "message": "postID invalid!"
}
```

### Response #2 
```javascript
{
    "success": true,
    "data": "Updated Successfully !"
}
```




## 2.5 DELETE /post/delete-single-post/:postID

### Purpose:

Delete a post by ID.

### Headers
Requires JWT token.
```
Authorization: Bearer JWT_TOKEN
```

### Response:
```javascript
{
    "success": true,
    "message": "post deleted Successfully !"
}
```

## POST /post/create-a-new-comment/:postID

### Purpose:

Create a new comment for a specific post.

### Headers
Requires JWT token.
```
Authorization: Bearer JWT_TOKEN
```

### Request Body:

```javascript
JSON
{
    "body": "hmm, good luck !"
}
```

### Response:
```javascript
{
    "success": true,
    "message": "Comment saved Successfully !"
}
```

## PUT /post/update-a-comment/:commentID

### Purpose:

Update a comment by ID.

### Headers
Requires JWT token.
```
Authorization: Bearer JWT_TOKEN
```

### Request Body:

```javascript
{
    "body": "UPDATED-hmm, good luck !"
}
```

### Response:

```javascript
{
    "success": true,
    "message": "Comment Updated Successfully !"
}
```

## DELETE /post/delete-a-comment/:postID/:commentID

### Purpose:

Delete a comment by ID.

### Headers
Requires JWT token.
```
Authorization: Bearer JWT_TOKEN
```

### Response:
```javascript
{
    "success": true,
    "message": "Comment Deleted Successfully !"
}
```

## Tech. Stack Used:

- [MongoDB](https://www.mongodb.com/)
- [ExpressJS](https://expressjs.com/)
- [ReactJS](https://react.dev/)
- [NodeJS](https://nodejs.org/en/)
- [PassportJS](https://www.passportjs.org/)

## Author

[Abhishek kumar](https://www.linkedin.com/in/alex21c/), ([Geekster](https://geekster.in/) MERN Stack FS-14 Batch)
