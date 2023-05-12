# Resume Builder Application with ChatGPT

This project is a Resume Builder application that uses React.js on the client-side and Node.js on the server-side. This application leverages OpenAI's GPT-3 model to generate professional summaries, key strengths, and job descriptions for your resume.

## Tech Stack

To build the application I used **React.JS**, **Node.JS**, **Express**, and the **OpenAI GPT-3 API**.

## Lessons Learned

- Mastery of Best Practices: This project honed my skills in designing and creating production-grade applications following best practices in the industry.
- Integration of Technologies: The seamless integration of technologies like React, Node.js, Express.js, and the OpenAI GPT-3 API was a major focus of this project.
- Reusable React Components: Creating highly reusable React components for efficiency was a key part of this project, allowing for better code organization and reusability.
- Third-party Libraries: Leveraging robust third-party libraries such as react-router-dom and react-to-print enhanced the functionality of the application and saved development time.
- State Management with Redux: Although this project didn't use Redux, the state management principles learned in class were still applicable. The useState React hook was used to manage the state of the application effectively.
- Error Handling: The experience of managing potential errors during API calls and user interactions, displaying appropriate error messages to the user in the process, was a valuable part of the project.
- User Input Management: Securely managing user input was crucial in this application, especially when collecting personal data for the resume.
- Building RESTful API: Even though this project did not involve creating a back-end server, understanding how to interact with RESTful APIs, specifically the OpenAI GPT-3 API, was crucial to the success of the application.
- UI/UX Design: A key part of this project was designing a user-friendly interface and providing a positive user experience, akin to industry standards for front-end development.

## How It Works

The user navigates to the home page and inputs their data. This includes their full name, current position, length of time in that position, current technologies they're skilled in, and their work history.

After inputting all required data, the user submits the form. This triggers a POST request to the server, sending the user's data.

On the server side, the data is received and processed. For each part of the resume (professional summary, key strengths, job descriptions), a prompt is created and sent to the OpenAI API to generate a text.

The generated texts are received and combined with the user's data into a single resume object.

The resume object is sent back to the client side, where it is set as the state of the Home component.

After receiving the data, the user is redirected to the /resume page.

On the /resume page, the resume object is received as a prop and displayed in a professional resume layout.

The user can then choose to print the generated resume.

## Usage

Before running the application, make sure to install all necessary dependencies in both the client and server directories by running npm install.

To start the server, navigate to the server directory and run node index.js.

To start the client, navigate to the client directory and run npm start.

After starting both the server and client, you can access the application by navigating to http://localhost:3000 in your web browser.

### Authors

- [Brian Marin Silva](https://www.github.com/bamarin7)
