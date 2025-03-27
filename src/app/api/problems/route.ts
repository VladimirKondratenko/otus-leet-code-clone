import { NextResponse } from 'next/server';

interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  solvedCount: number;
}

const problems: Problem[] = [
  {
    id: 1,
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    solvedCount: 1234
  },
  {
    id: 2,
    title: 'Add Two Numbers',
    description: 'You are given two non-empty linked lists representing two non-negative integers.',
    difficulty: 'Medium',
    solvedCount: 890
  }
];

export async function GET() {
  return NextResponse.json(problems);
} 