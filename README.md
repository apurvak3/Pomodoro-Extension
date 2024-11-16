# Pomodoro-Extension
 Chrome extension for implementing a Pomodoro timer.


Purpose:

The code creates a Pomodoro timer that runs for 25 minutes. Users can start or reset the timer via a right-click menu in the browser.
Setup:

When the extension is installed, it creates two context menu options:
"Start Timer": Starts the countdown timer.
"Reset Timer": Stops and resets the timer back to 25 minutes.
Timer Logic:

The timer runs using Chrome's alarms API, which triggers every second to decrease the timer.
The remaining time is displayed on the browser action badge (near the extension icon), changing color depending on how much time is left.
Notifications:

When the timer finishes, a notification alerts the user that the time is up and suggests taking a break.
User Interaction:

The extension listens for clicks on the context menu items:
Clicking "Start Timer" begins the countdown.
Clicking "Reset Timer" stops the timer and resets the countdown.
