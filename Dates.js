const date = new Date();
console.log(date); // converted to local time automatically
console.log(date.toISOString()); // stays in UTC
console.log(date.toLocaleString()); // local timezone

// Timestamp (Milliseconds)
const now = Date.now();
console.log(now);
