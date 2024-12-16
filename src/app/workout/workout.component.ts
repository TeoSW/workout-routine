import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  band: string;
  completed: boolean;
}

interface Day {
  name: string;
  exercises: Exercise[];
}

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class WorkoutComponent implements OnInit {
  days: Day[] = [
    {
      name: 'Day 1',
      exercises: [
        { name: 'Straddle planche hold', sets: 4, reps: '6-8"', band: '15+5kg', completed: false },
        { name: 'Straddle planche push up', sets: 4, reps: '6-8', band: '25+15kg', completed: false },
        { name: 'HSPU Wall Assist', sets: 4, reps: '8-12', band: '', completed: false },
      ],
    },
    {
      name: 'Day 2',
      exercises: [
        { name: 'Touch front lever', sets: 5, reps: '8-10"', band: '15kg x2 loop', completed: false },
        { name: 'Full FL pull ups', sets: 4, reps: '6-8', band: '15kg x2 loop', completed: false },
        { name: 'Front lever hold', sets: 4, reps: '12-15"', band: '15kg x1 loop', completed: false },
      ],
    },
    {
      name: 'Day 3',
      exercises: [
        { name: 'Straddle planche hold', sets: 4, reps: '6-8"', band: '15kg', completed: false },
        { name: 'Straddle planche push up', sets: 4, reps: '6-8', band: '25+5kg', completed: false },
        { name: 'HSPU Wall Assist', sets: 4, reps: '8-12', band: '', completed: false },
      ],
    },
    {
      name: 'Day 4',
      exercises: [
        { name: 'Touch front lever', sets: 5, reps: '8-10"', band: '15kg x2 loop', completed: false },
        { name: 'Full FL pull ups', sets: 4, reps: '3-6', band: '15kg x1 loop', completed: false },
        { name: 'Front lever hold', sets: 4, reps: '12-15"', band: '15kg x1 loop', completed: false },
      ],
    },
    {
      name: 'Day 5',
      exercises: [
        { name: 'Straddle planche hold', sets: 4, reps: '6-8"', band: '15+5kg', completed: false },
        { name: 'Straddle planche push up', sets: 4, reps: '6-8', band: '25+15kg', completed: false },
        { name: 'HSPU Wall Assist', sets: 3, reps: '8-12', band: '', completed: false },
      ],
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Safe to use localStorage
      const savedDays = localStorage.getItem('days');
      if (savedDays) {
        this.days = JSON.parse(savedDays);
      }
    }
  }

  toggleCompletion(dayIndex: number, exerciseIndex: number) {
    this.days[dayIndex].exercises[exerciseIndex].completed =
      !this.days[dayIndex].exercises[exerciseIndex].completed;

    // Save to localStorage
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('days', JSON.stringify(this.days));
    }
  }
}
