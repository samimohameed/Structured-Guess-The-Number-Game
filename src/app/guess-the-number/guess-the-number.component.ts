import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guess-the-number',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './guess-the-number.component.html',
  styleUrl: './guess-the-number.component.scss'
})
export class GuessTheNumberComponent {
 secretNumber = this.randomNumber();
 userGuess?: number;
 message = '';
 attempts = 10;
 gameOverr = false;

//  checkGuess() {
//   if (this.userGuess === this.secretNumber){
//     this.message = 'Congratulations! You guessed the number.';
//     this.gameOver = true;
//   } else if (this.userGuess! < this.secretNumber){
//     this.message = 'Too low! Try again.';
//   } else {
//     this.message = 'Too high! Try again.';
//   }
// }
 
 private static readonly MAX_ATTEMPTS = 10;
 private static readonly MAX_NUMBER = 100;

  private randomNumber(): number {
    return Math.floor(Math.random() * GuessTheNumberComponent.MAX_NUMBER) + 1;
  }

  isValidGuess(guess: number): boolean {
    return guess !== undefined && guess >= 1 && guess <= GuessTheNumberComponent.MAX_NUMBER;
  }

  public submitGuess(): void {
    if (!this.isValidGuess(this.userGuess!)) {
      this.message = 'Please enter a valid number between 1 and ' + GuessTheNumberComponent.MAX_NUMBER;
      return;
    }
    this.attempts--;
    this.evaluateGuess();
  }

  private evaluateGuess(): void {
    if (this.userGuess === this.secretNumber) {
      this.gameOver(true);
    } else if (this.attempts === 0) {
      this.gameOver(false);
    } else {
      this.message = this.userGuess! < this.secretNumber ? 'Too low! Try again.' : 'Too high! Try again.';
    }
  }

  private gameOver(won: boolean): void {
    this.gameOverr = true;
    this.message = won ? 'Congratulations! You guessed the number.' : 'Game over! You ran out of attempts.';
  }

  resetGame(): void {
    this.secretNumber = this.randomNumber();
    this.userGuess = undefined;
    this.message = '';
    this.attempts = GuessTheNumberComponent.MAX_ATTEMPTS;
    this.gameOverr = false;
  }
}
