<img src="assets/icon.png" style="width:200px"/>

# Fitness Tracker

**Fitness Tracker** is an innovative mobile application built with React Native and Expo that helps you track your runs, hikes, walks, or any physical activity in real time. This project was developed as part of the **IIT Guwahati Alcheringa Junior Code Champs** competition, a global online coding hackathon where students compete individually. 

---

## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Competition Details](#competition-details)
- [Screenshots](#screenshots)
- [Key Features](#key-features)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Learnings & Challenges](#learnings--challenges)
- [Download Link](#download-link)
- [Youtube Showcase Video](#youtube-showcase-video)
- [Competition Website & Certificate](#competition-website--certificate)
- [Future Improvements](#future-improvements)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

## Introduction

**Fitness Tracker** is my first significant, fully functional app, built during my time in class 11 (Sep/Oct 2022). The app was designed and developed in just one month for the **Junior Code Champs** competition organized by Codingal. It reflects my passion for fitness and my enthusiasm for coding, combining real-time tracking with user-friendly features to motivate a more active lifestyle.

---

## Project Overview

The goal of **Fitness Tracker** was to create an app that not only records physical activities but also encourages users to stay active. The app logs various workout sessions by allowing users to:

- Record and view workout details (exercise type, start time, total duration, work duration, rep counts, and personal notes).
- Use a built-in stopwatch with adjustable update intervals to ensure smooth performance on all devices.
- Manage workout history by date, including options to add custom exercises, edit previous sessions, or rename workout dates.

The project leverages modern mobile development practices with React Native and Expo, ensuring a responsive and engaging user experience.

---

## Competition Details

**Event:** IIT Guwahati Alcheringa Junior Code Champs  
**Theme:** Fitness Tracker  
**Description:**  
Participants were tasked with building an innovative app capable of tracking physical activities—whether it's a run, hike, or walk—in real time. The challenge encouraged creative solutions to help users set fitness goals or receive nudges to move if they've been inactive for too long.

**Platform:**  
The project was built using React Native and Expo, allowing for rapid development and cross-platform support.

---

## Screenshots
<div style="display:flex; flex-direction:row">
  <img src="screenshots/screenshot%20(2).jpeg" style="width:200px"/>&nbsp;&nbsp;
  <img src="screenshots/screenshot%20(3).jpeg" style="width:200px"/>&nbsp;&nbsp;
  <img src="screenshots/screenshot%20(8).jpeg" style="width:200px"/>&nbsp;&nbsp;
  <img src="screenshots/screenshot%20(6).jpeg" style="width:200px"/>&nbsp;&nbsp;
  <img src="screenshots/screenshot%20(1).jpeg" style="width:200px"/>&nbsp;&nbsp;
  <img src="screenshots/screenshot%20(4).jpeg" style="width:200px"/>&nbsp;&nbsp;
  <img src="screenshots/screenshot%20(5).jpeg" style="width:200px"/>&nbsp;&nbsp;
  <img src="screenshots/screenshot%20(7).jpeg" style="width:200px"/>&nbsp;&nbsp;
</div>

---

## Key Features

- **Workout Session Logging:**  
  - Record exercise details including the exercise name, start time, total duration, work duration, rep counts, and custom notes.
  - Toggle the visibility of total and work times.

- **Real-Time Stopwatch:**  
  - Built-in stopwatch to accurately time your workouts.
  - **Adjustable Update Interval:** Users can choose the stopwatch update interval (0.1s, 0.5s, or 1.0s) to balance precision and performance—particularly beneficial for low-end devices.

- **Custom Exercises:**  
  - Option to add custom exercises, so you're not limited to pre-defined workout types.

- **History Management:**  
  - View and manage your workout history by date.
  - Edit, rename, or delete past sessions.

- **User-Friendly Interface:**  
  - Clean, interactive UI with components like dropdown selectors, prompts for editing data, and animated checkboxes.
  - Responsive design ensuring smooth performance on a variety of devices.

---

## Usage

Once the app is running:

- **Home Screen:**  
  View today's workout sessions. You can select a session to edit or delete, or add a new session.

- **Run Screen:**  
  - Start a new workout by selecting an exercise from a dropdown.
  - Control timers (Total and Work time) with a built-in stopwatch.
  - Input optional rep counts and notes.
  - **Custom Features:**  
    - **Add Custom Exercises:** If the exercise you want isn’t listed, you can add a custom one.
    - **Adjust Stopwatch Interval:** Choose between 0.1s, 0.5s, and 1.0s update intervals in the settings (or a dedicated prompt) if your device struggles with high-frequency updates.

- **History Screen:**  
  Review previous workout sessions organized by date. You can tap on any date to view the detailed sessions for that day.

---

## Project Structure

```
/src
  /components
    - TaskComp.js         // Component for rendering a single task
    - StopWatch.js        // Stopwatch component for timing workouts
    - Dropdown.js         // Custom dropdown component for exercise selection
    - Prompt.js           // Component for modal prompts (e.g., editing dates/times)
    ...
  /Utils
    - index.js            // Utility functions for date/time formatting, parsing, and task creation
  /screens
    - HomeScreen.js       // Main screen for displaying daily workout sessions
    - RunScreen.js        // Screen for starting/recording a workout session
    - HistoryScreen.js    // Screen for viewing workout history
  App.js                  // Main application entry point
```

---


## Tech Stack

- **React Native & Expo:**  
  Provides a robust framework for building cross-platform mobile applications with a focus on performance and scalability.
  
- **AsyncStorage:**  
  Used for local data persistence, allowing users to save and manage their workout history offline.
  
- **Custom UI Components:**  
  - **BouncyCheckbox:** For smooth, animated checkbox interactions.
  - **Dropdown & Prompt Components:** For user-friendly selection and input dialogs.
  - **StopWatch Component:** For accurate real-time tracking of exercise duration.
  
- **JavaScript (ES6+):**  
  Modern syntax and features to create clean, maintainable code.

---

## Learnings & Challenges

Building **Fitness Tracker** was a rewarding experience, especially as my first larger-scale functional app. Some key learnings and challenges included:

- **Real-Time Data Management:**  
  Implementing a stopwatch that updates accurately while being performant on lower-end devices pushed me to optimize my state management and use of intervals.

- **Local Data Persistence:**  
  Leveraging AsyncStorage for managing workout sessions taught me the intricacies of asynchronous operations and data serialization in React Native.

- **User Interface Design:**  
  Crafting an intuitive and visually appealing interface was crucial. I learned a lot about layout design, component reusability, and handling user interactions.

- **Time Constraints:**  
  Completing the project within one month for the competition meant balancing new feature development with learning new technologies, which was both challenging and highly educational.

---

## Download Link

You can download the **Fitness Tracker** app directly from the following link:  
[Download Fitness Tracker](https://fitness-tracker.en.uptodown.com/android)

---

## YouTube Showcase Video

Watch our detailed showcase video on YouTube to see the app in action:  
[Watch on YouTube](https://youtu.be/ldXkOVi7VZE)

---

## Competition Website & Certificate

Learn more about the **IIT Guwahati Alcheringa Junior Code Champs** competition and view my certificate:  
- [Junior Code Champs Official Website](https://www.codingal.com/competitions/iit-guwahati-junior-code-champs/)  
- [View My Certificate](https://certificate.givemycertificate.com/c/ef3e5294-c872-47c8-a7ab-385ca42c26c5)

---

## Future Improvements

- **Enhanced Customization:**  
  Expand options for custom exercises and allow users to personalize more aspects of the interface.

- **Data Analytics:**  
  Integrate charts and statistics to provide users with insights into their workout trends over time.

- **Cloud Sync:**  
  Enable cloud storage to back up workout data and sync across multiple devices.

- **Social Features:**  
  Add social sharing and leaderboards to encourage friendly competition and community engagement.

---

## Acknowledgements

- **Codingal & Junior Code Champs:**  
  For organizing the competition and providing a platform to showcase innovative projects.
- **React Native & Expo Communities:**  
  For their invaluable resources, libraries, and support that made this project possible.
- **Contributors & Mentors:**  
  Special thanks to everyone who provided feedback and guidance during the development process.  
- All contributors and users who help improve this project.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Fitness Tracker** is a testament to my growth as a developer and my passion for combining technology with fitness. I hope it inspires others to pursue their ideas and create innovative solutions.











