import { Component } from '@angular/core';
import { SeatModule } from 'src/app/models/Seat/seat/seat.module';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent {

  // Seat data
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  cols: number[] = [1, 2, 3, 4, 5, 6];

  // Selected seat
  selectedSeat: string | null = null;

  // Function to handle seat selection
  selectSeat(row: string, col: number) {
    this.selectedSeat = row + col.toString();
  }

  // Function to check if a seat is selected
  isSeatSelected(row: string, col: number) {
    return this.selectedSeat === (row + col.toString());
  }

  selectedSeats: SeatModule[] = [];

}
