# codebook
A cloud-enabled social media application for coders

Have you ever written a piece of code that projects your coding skill in a true manner? Would you like to share it to the world?
Then, Codebook is for you. A social media for coders/developers.

## Features
- Login / Signup securely using jwt authentication
- Create Post, add multiple code snippets 
- Edit, delete your post 
- View other posts
- Search any post using either title, description, tags (keyword)
- Mobile downloadable (PWA)

## Technology stack
### Frontend :
 - React.js
 - axios
 - material-ui
 - react-router-dom
 - moment.js
 - Redux , React-Redux , Redux-thunk
 
 ### Backend :
 - Node.js
 - Express.js
 - json web token
 - bcrypt
 - mongoose
   
 ### Cloud / Devops:
 - Frontend hosted on AWS S3, distributed globally via AWS CloudFront
 - Backend served through AWS ALB + CloudFront
 - Backend hosted on ECS Fargate with ECR docker registry
 - AWS CloudWatch for logs and debug
 - Created IAM roles and Security Groups for secure access 
 
 ### Database:
 - mongodb cloud atlas

 ### Database:
 - mongodb cloud atlas
    

