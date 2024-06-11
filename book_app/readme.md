# <h1 align="center">Book-App</h1>

## Overview

The Book App is a simple Web application build using HTML, CSS and JavaScript that allows user to see list of books based on category, can login or register and toggle to dark mode as well.

## Frameworks and Language Used

- **HTML**
- **CSS**
- **JavaScript**

## Data Flow

### HTML

I have created skeleton using HTML where I have main class("wrapper-body") inside it I have head section div, right navigation bar and a left navigation bar and at the end i have login and register form.

### Category Selection

I have buttons for each main-card section which i can used as click button in eventListner and chang the books in ui, look at the code below how i have selected button and called function to perform task according.
doit01 function will reload the data first and than remove the remaing data except the card whose detaile is required which i have accessed using the button and list of category in the left navigation bar.

### Dark Mode

For dark mode i have selected left categories and titles of all the card and added class "do-white" which will change text color to white and background color of body as black as well as whatever is required i have selected that element and changed accordingly using if else condition.

### Support Ukraine

I have added picture using display flex and added a button at the bottom to make the list items to move downward for better view, I have used if else condition and a flag based on which i will change position.

### Login and Register

When a user click on signUp button on top than a pop up will come for login and in he click on register link in login page than loginpage will transformX by -450px and if user click on login link in register page than register page will transfromX by +450px and at tha time of signup click i have made the right nav and left nav opacity to 0 so only login and register page will be shown.
again when user click on x button on login-register block opacity of right nav and left nave will become 1.
