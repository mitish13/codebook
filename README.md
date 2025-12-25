# Codebook — Coder's Social Media 

A **full-stack social media platform** for developers to **share, view, and search code snippets**, now deployed on **AWS with CI/CD**.  
Have you ever written a piece of code that showcases your coding skills? Codebook is built for developers to share their projects and interact with the coding community.

---

## Features 

- **Secure authentication:** Login / Signup using JWT  
- **Posts & Code Snippets:** Create, edit, delete, and view posts with multiple code snippets  
- **Search:** Search posts by title, description, or tags  
- **Responsive & PWA:** Mobile-ready with progressive web app support  

---

## Technology Stack 

**Frontend:** React.js, Redux, Axios, Material-UI, react-router-dom, moment.js  
**Backend:** Node.js, Express.js, MongoDB, JWT, bcrypt  
**Database:** MongoDB Atlas  
**Containerization & Cloud:** Docker, AWS ECS Fargate, ECR, ALB, CloudFront, SSM Parameter Store  
**CI/CD:** GitHub Actions (build & deploy on push to `main`)  

---

## Deployment 
> **Note:** The backend has been moved from AWS ECS Fargate to **Render's free tier** to reduce hosting costs while keeping the project accessible. All frontend/backend functionality remains the same.

- **Frontend:** Hosted on **S3 static website**, distributed via **CloudFront**  
- **Backend:** Dockerized, stored in **ECR**, deployed on **ECS Fargate** behind **ALB**, and served via **CloudFront**  
- **CI/CD Pipeline:** On every push to `main`, GitHub Actions:
  1. Build Docker image  
  2. Push to ECR  
  3. Update ECS service  
  4. Invalidate CloudFront cache  
  5. **Secrets Management:** Securely inject **MONGO_URI** and **JWT_SECRET** using **AWS Systems Manager Parameter Store**  

---

## Architecture Design 

### Frontend & Backend Distribution: CloudFront + S3 + ALB

- Frontend is hosted on **S3 static website**.  
- Backend runs on **ECS Fargate**, containerized via Docker, stored in **ECR**, and exposed through an **Application Load Balancer (ALB)**.  
- Both frontend and backend are served through the **same CloudFront distribution** with different origin behaviors:  
  - `/api/*` → routes to **ALB / ECS backend**  
  - `/` and static assets → routes to **S3 frontend**  
- **Purpose:**  
  - Global caching and fast content delivery  
  - Reduce latency for users worldwide  
  - Consolidate traffic under a single CDN domain  

### ECS Fargate + ALB

- **ECS Fargate** provides serverless container orchestration — no EC2 instances needed.  
- **Task Definition** defines backend container configuration (image, ports, environment variables).  
- **ALB (Application Load Balancer):**  
  - Handles incoming traffic from CloudFront  
  - Routes requests to healthy ECS tasks based on path patterns (`/api/*`)  
  - Provides fault-tolerant load distribution  
- **Security:** ECS tasks run in a **VPC** with **security groups**, allowing only the ALB to access backend ports.  

---

### Secrets Management 

- Environment variables like `MONGO_URI` and `JWT_SECRET` are securely stored in **AWS Systems Manager Parameter Store**.  
- Other secrets like AWS credintials and other environment related keys are stored in GitHub Secrets
- **GitHub Actions CI/CD pipeline** injects these secrets into ECS tasks at runtime.  
- **Benefit:** No hardcoded credentials; secure, auditable, and production-ready.

---

### Monitoring & Logging 

- **CloudWatch Logs** capture ECS task logs to monitor backend performance, errors, and API activity.

---

**Key Takeaways**

- Full-stack, cloud-native deployment with **AWS ECS Fargate, ALB, CloudFront, and S3**  
- Automated **CI/CD with GitHub Actions**  
- Secure **secrets management** via **SSM Parameter Store**  
- Global content delivery and low-latency access using a **single CloudFront distribution**
