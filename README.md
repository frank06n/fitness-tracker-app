<img src="assets/icon.png" style="width:200px"/>

# Fitness Tracker

**Fitness Tracker** is an innovative mobile application built with React Native and Expo that helps you track your runs, hikes, walks, or any physical activity in real time. This project was developed as part of the **IIT Guwahati Alcheringa Junior Code Champs** competition, a global online coding hackathon where students compete individually. 

---

## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Competition Details](#competition-details)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Learnings & Challenges](#learnings--challenges)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Acknowledgements](#acknowledgements)

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

## Key Features

- **Real-Time Workout Logging:**  
  - Start and stop timers to track your overall workout duration and active work time.
  - Record detailed workout data including exercise names, rep counts, and custom notes.
  
- **Adjustable Stopwatch Interval:**  
  - Users can choose the stopwatch update frequency (0.1s, 0.5s, or 1.0s) to accommodate performance on lower-end devices.
  
- **Custom Exercise Options:**  
  - Add and manage custom exercises beyond the pre-defined list, tailoring the app to your personal fitness routine.
  
- **Comprehensive History Management:**  
  - View past workout sessions organized by date.
  - Edit, rename, or delete session data to keep your workout history up-to-date.
  
- **Intuitive & Responsive UI:**  
  - Clean interface with animated checkboxes, interactive dropdown menus, and prompts for editing.
  - Designed to provide a seamless user experience on both high-end and low-end devices.

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

## Screenshots

![Home Screen](./screenshots/home-screen.png)
*Home Screen – View today's workouts and navigate to individual sessions.*

![Run Screen](./screenshots/run-screen.png)
*Run Screen – Start a workout, select an exercise, and control timers.*

![History Screen](./screenshots/history-screen.png)
*History Screen – Review past workout sessions by date.*

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

---

**Fitness Tracker** is a testament to my growth as a developer and my passion for combining technology with fitness. I hope it inspires others to pursue their ideas and create innovative solutions.
