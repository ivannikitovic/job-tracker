# Job Application Tracker 1.0.0 Requirements

## 1. Introduction

The purpose of this document is to outline the requirements for the development of a web application designed to assist software engineering professionals and new graduates in tracking their job applications. This application will provide users with tools to manage and monitor their job search process efficiently.

## 2. Scope

### Inclusions

The scope of this project currently includes the following key features and functionalities:

1. **User Registration and Authentication:**

    - Users must be able to create accounts and log in securely.

2. **Dashboard:**
    - A personalized dashboard displaying an overview of the user's job application status.
    - Ability to add, edit, and delete job applications.
3. **Job Application Entry:**
    - Users can input details for each job application, including the company name and relevant details, position, application date, and application status.
4. **Application Tracking:**
    - Users can update the status of each application (e.g., applied, interviewed, offer received, rejected).
5. **Filter and Search:**
    - Users can filter and search for job applications based on various criteria (e.g., application date, company name, status).

### Exclusions

The following features are not within the scope of the initial release but are planned for future iterations:

-   Integration with external job boards and APIs.
-   Analytics and reporting features.
-   Mobile application versions.

## 3. Functional Requirements

### 3.1 User Registration and Authentication

-   Users must provide a valid email address and password during registration.
-   Passwords should be securely hashed and stored.
-   Users must receive a confirmation email for account activation.
-   Users can reset their passwords if forgotten.

### 3.2 Dashboard

-   The dashboard should display a summary of job applications, including the total number and status breakdown.
-   Users can click on each application to view and edit details.

### 3.3 Job Application Entry

-   Users can add a new job application with the following details:
    -   Job title
    -   Company name
    -   Location
    -   Salary (or expected)
    -   Description
    -   Application date
    -   Application status
    -   Status deadline
    -   External URL

### 3.4 Application Tracking

-   Users can update the status of each application as it progresses through the hiring process.
-   Status options include considering, applied, phone screen, OA, interview, offer, rejection, and custom status.

### 3.5 Filter and Search

-   Users can filter job applications based on criteria such as application date, company name, and status.
-   Users can search for specific job applications using keywords.

## 4. Non-Functional Requirements

### 4.1 Security

-   User data and passwords must be stored securely.

### 4.2 Performance

-   The application should load quickly and respond promptly to user actions.

### 4.3 Usability

-   The user interface should be intuitive and user-friendly.

### 4.4 Compatibility

-   The application should be compatible with modern web browsers (e.g., Chrome, Firefox, Safari).

## 5. Business Rules

-   Users must be able to update application statuses in real-time.
-   Each user can only access and modify their own job applications.

## 6. Use Cases (User Stories)

1. **User Registration**

    - As a new user, I want to create an account so that I can start tracking my job applications.

2. **Dashboard Overview**

    - As a user, I want to see a summary of my job applications on my dashboard so that I can quickly assess my progress.

3. **Adding a Job Application**

    - As a user, I want to add a new job application with all relevant details.

4. **Updating Application Status**

    - As a user, I want to update the status of my job applications as I progress through the hiring process.

5. **Filtering and Searching**
    - As a user, I want to filter and search for specific job applications based on various criteria.

## 7. Data Requirements

-   User account data: email, password (hashed)
-   Job application data: job title, company name, location, salary (or expected), description, application date, status, status deadline, external URL

## 8. Constraints and Assumptions

-   The application will be built using the MERN stack.
-   The application will be hosted on a secure web server.
-   Users must have access to an internet connection and a modern web browser to use the application.

## 9. Dependencies

-   Development will depend on external libraries and frameworks for authentication, database management, and user interface design.

---
