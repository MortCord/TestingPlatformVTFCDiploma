Hi there!
Welcome to my diploma project for Vinnitsia Techincal College. Project's name is Testikify -- a platform for creating and taking tests.

--Features--

The platform includes:
-Three different roles: Admin, Teacher and Student
-Authentication and authorization
-Test creation and test-taking functionality
-Basic analitics on dashboard page
-Private tests that can be accessed using a code
-Support for images in questions
-Separate permissions and limitations for each role (e.g., Admin Panel and Teacher Panel)

--Technologies--

Project uses client-server architecture, with Spring Boot for the backend, React for the frontend and MySQL as the database.

Backend:
-Java
-Spring Boot
-Spring Security
-JWT
-Lombok

Frontend:
-JavaScript
-React
-React Router DOM
-Axios

Development Tools:
-IntelliJ IDEA
-VS Code

--Documentation--

Documentation is available within this repository. Please note that it is written in Ukrainian.

--How To Run The App--
(Note: these instructions are optimizied for Windows users)

1. Download and install the following tools:
   https://www.jetbrains.com/idea/download/?section=windows
   https://code.visualstudio.com/download
2. Install JDK 21: https://www.oracle.com/java/technologies/downloads/#jdk21-windows
3. Install MySQL server and workbench:
   https://dev.mysql.com/downloads/windows/installer/8.0.html
   https://dev.mysql.com/downloads/workbench/
3.1 Install all required components and configure your username and password (for example: username root, password root)
3.2 Make sure your server appears in workbench
3.3 Log in to your server, create a new schema and name it: "testingplatform"
4. Install Git: https://git-scm.com/install/windows (You can keep all installation settings at their default values)
5. Open a terminal, navigate to the directory where you want to store the project and run: 
  "git clone https://github.com/MortCord/TestingPlatformVTFCDiploma.git"
6. Open IntelliJ IDEA and load the "testingPlatform" folder. Allow IntelliJ to trust and configure the project.
7. Wait for Maven to download all dependecies and plugins
8. Select JDK 21 as the project SDK. Enable Lombok annotation processing.
9. Open application.yaml located in the resources folder
9.1 Enter your MySQL username and password. Also provide a JWT secret, for example: supersecretkeysupersecretkey1234567 (Or you can use envs for that and store it there)
10. Start the Spring Boot application
11. If everything started successfully, you want to navigate to MySQL workbench
11.1 Verify that new tables have been created
11.2 Double-click the testingplatform schema so that becomes bold
11.3 Navigate to users table
11.4 In IntelliJ IDEA, open TestingPlatformApplication (the main app class). Around line 13, you should find code related to password encoding. Replace the sample with your desired password or leave it as it is and restart the application. In the console ypu should see an encoded password similar to this one: "$2a$10$Id6z8cptZehq9s5GVDyws.4sCb4vzzHAf3CKb.qPkcy2XLl3hpfNe". Copy the generated password.
11.5 Execute the following sql statement in workbench
      INSERT INTO users (id, email, password, role)
      VALUES (1, 'admin@example.com', 'paste the encoded password here', 'ADMIN');
12. Install Node.js: https://nodejs.org/en/download
13. Open VS Code and load the "testing-platform-front" folder
14. Open a new terminal in VS Code and run npm i
14.1 If you see something like "File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system." Run: "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser". This enables powershell script execution for the current user
15. Run: "npm start"
16. Log in using the admin account you created earlier
17. If you can access the admin panel, congrats! The project has been successfully set up. You can now explore all features of the platform, create teacher and student accounts, and compare the permissions and functionality available for each role.
