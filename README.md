# Spring Boot +React + TypeScript + Vite

#Spring Boot AI Application
##Overview

This application is a full-stack project integrating a React frontend with a Spring Boot backend. It allows users to interact with a ChatGPT-like AI, send messages, and view responses in a dynamic data grid.

##Features
- AI Message Interaction: Users can send messages and receive AI-generated responses.
- Search Functionality: Ability to search through the AI messages.
- Responsive UI: Built with Material-UI for a responsive and modern interface.

## Technologies Used
- Frontend: React, Material-UI, Axios
- Backend: Spring Boot, Spring AI, JPA

## Getting Started

### Prerequisites
1. Node.js and npm
2. Java JDK 11+
3. Gradle

### Installation
1. Clone the repository:
```bash
git clone https://github.com/joshuamatosdev/spring-ai.git
```

2. Navigate to the project directory and install NPM packages:
```bash
cd spring-ai/frontend
yarn install
```

3. Start the React development server:
```bash
yarn start
```

### In a separate terminal, navigate to the Spring Boot application directory and run:
```bash
gradle bootRun
```
## Usage
Sending Messages: Enter a message in the text field and click 'Chat' to receive a response.
Searching Messages: Use the search bar to filter through existing messages or to send a query to the backend.

## Viewing Responses: Responses are displayed in a data grid with options to sort and paginate.

License
MIT# spring-ai
