# Hangman Game

Hangman is a word guessing game where the player tries to guess a secret word by suggesting letters, by clicking a letter button one at a time. The player has a limited number of attempts to guess the word correctly (5 per round). For each incorrect guess, a part of a "hangman" figure is drawn. The game ends when the player either guesses the secret word correctly or the hangman figure is fully drawn and 5 guesses are used.

## Rules

1. The game begins with a secret word that is hidden from the player.
2. The player suggests a letter they think is in the secret word by clicking a letter button.
3. If the suggested letter is in the secret word, all occurrences of that letter are revealed.
4. If the suggested letter is not in the secret word, a part of the hangman figure is drawn.
5. The player can continue suggesting letters until they either guess the secret word correctly or the hangman figure is fully drawn.
6. After 10 rounds the users score determines whether they have won or not. If the score is 250 or above then the users wins, but if it is below 250 then the user loses.

## Installation and Running the App

To install and run the HangMan game on your computer, follow these steps:

1. Make sure you have Node.js and npm installed on your computer. If you don't have them installed, visit [Node.js official website](https://nodejs.org/) to download and install the appropriate version for your operating system.

2. Clone the Hangman repository to your local machine: git clone https://github.com/Distractor7/HangMan.git

3. Navigate to the project directory: cd HangMan/my-app

4. Install the required dependencies: rpm install 

5. 5. Start the development server: npm start

6. 6. Open your web browser and go to `http://localhost:3000`. The Hangman game should now be running on your local machine.

Enjoy HangMan!
