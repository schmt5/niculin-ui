/**
 * Example usage of sleep utility functions
 * This file demonstrates how to use the various sleep functions
 */

import {
  sleep,
  sleepSeconds,
  sleepMinutes,
  createCancellableSleep,
  sleepWithJitter,
  sleepBackoff,
} from './sleep';

// Basic sleep usage examples
export async function basicSleepExamples() {
  console.log('Starting basic sleep examples...');

  // Sleep for 1 second (1000ms)
  await sleep(1000);
  console.log('1 second has passed');

  // Sleep for 2.5 seconds
  await sleepSeconds(2.5);
  console.log('2.5 seconds have passed');

  // Sleep for 0.1 minutes (6 seconds)
  await sleepMinutes(0.1);
  console.log('6 seconds (0.1 minutes) have passed');
}

// Cancellable sleep example
export async function cancellableSleepExample() {
  console.log('Starting cancellable sleep...');

  const { promise, cancel } = createCancellableSleep(5000);

  // Cancel after 2 seconds
  setTimeout(() => {
    console.log('Cancelling sleep...');
    cancel();
  }, 2000);

  try {
    await promise;
    console.log('Sleep completed normally');
  } catch (error) {
    console.log('Sleep was cancelled');
  }
}

// Sleep with jitter example (useful for API rate limiting)
export async function jitterSleepExample() {
  console.log('Starting jitter sleep examples...');

  for (let i = 0; i < 3; i++) {
    const startTime = Date.now();
    
    // Sleep for ~1000ms with up to 20% jitter (800-1200ms range)
    await sleepWithJitter(1000, 0.2);
    
    const actualDelay = Date.now() - startTime;
    console.log(`Attempt ${i + 1}: Slept for ${actualDelay}ms`);
  }
}

// Exponential backoff example (useful for retry logic)
export async function backoffSleepExample() {
  console.log('Starting exponential backoff example...');

  for (let attempt = 0; attempt < 5; attempt++) {
    const startTime = Date.now();
    
    await sleepBackoff(attempt, 500, 10000); // 500ms base, max 10s, 2x backoff
    
    const actualDelay = Date.now() - startTime;
    console.log(`Attempt ${attempt}: Waited ${actualDelay}ms`);
  }
}

// Real-world usage: API with retry and backoff
export async function apiWithRetryExample() {
  const maxRetries = 3;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`API attempt ${attempt + 1}...`);
      
      // Simulate API call that might fail
      const success = Math.random() > 0