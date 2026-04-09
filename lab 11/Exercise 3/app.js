/**
 * Exercise 3: Node.js Event-Driven Programming
 * 
 * This application demonstrates the EventEmitter class, multi-subscription, 
 * data passing, and asynchronous behavior.
 */

// 1. Import the events module using the require() function
const EventEmitter = require('events');

// 2. Create an event emitter object using EventEmitter instance
const myEmitter = new EventEmitter();

// 3. Register event listeners using the on() method
// Handling multiple listeners for a single event (Requirement 7)
myEmitter.on('statusUpdate', () => {
    console.log('[Listener 1] Status event received: System is stable.');
});

myEmitter.on('statusUpdate', () => {
    console.log('[Listener 2] Status event received: Log updated.');
});

// 4. Handle an event that passes data using arguments (Requirement 6)
myEmitter.on('userLoggedIn', (user) => {
    console.log(`[Login Handler] User Login detected: ID ${user.id}, Name: ${user.name}`);
});

// 5. Demonstrate asynchronous behavior using event-driven architecture (Requirement 9)
myEmitter.on('asyncEvent', () => {
    console.log('[Async Listener] The delayed event has finally been handled!');
});

// --- Triggering Events ---

console.log('--- Starting Event Demonstration ---');

// 6. Define custom events and trigger them using the emit() method
console.log('\nTriggering "statusUpdate" (Multiple Listeners):');
myEmitter.emit('statusUpdate');

// 7. Pass data through events using arguments in emit()
console.log('\nTriggering "userLoggedIn" with data:');
myEmitter.emit('userLoggedIn', { id: 101, name: 'Ram' });

// 8. Demonstrate asynchronous behavior using event-driven architecture
console.log('\nScheduling an asynchronous event trigger...');
setTimeout(() => {
    console.log('\n--- Asynchronous Trigger (Inside setTimeout) ---');
    myEmitter.emit('asyncEvent');
}, 1500);

console.log('\n--- Main execution thread finished (Synchronous code end) ---');
console.log('Wait for the async event to trigger...\n');
