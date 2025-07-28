Automated Rollbacks for a React Book Store Web App using Git, Ansible, and Jenkins
This project demonstrates a CI/CD pipeline for a React-based Book Store web application with automated rollback functionality. It leverages Git, Jenkins, and Ansible to ensure smooth deployments and quick recovery in case of failures.

✅ Key Features
React Book Store Web App – A frontend application for browsing and purchasing books.

Continuous Integration & Deployment – Managed via Jenkins pipeline.

Configuration Management & Deployment Automation – Using Ansible for environment setup and app deployment.

Automated Rollbacks – If the latest deployment fails health checks or tests, the system automatically rolls back to the last stable version.

Version Control – Managed through Git to track changes and maintain previous releases.

🛠️ Tech Stack
Frontend: React.js

Version Control: Git & GitHub

CI/CD Tool: Jenkins

Configuration Management & Rollback: Ansible

Server: Linux-based environment

🔄 Rollback Mechanism
Jenkins pipeline monitors deployment status.

On failure, Ansible plays restore the previous stable release from the Git repository.

Notifications are sent to the team after rollback completion.
