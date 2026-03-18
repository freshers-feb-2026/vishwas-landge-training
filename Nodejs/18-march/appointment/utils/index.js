export const generateSlots = (start, end, duration = 30) => {

  const slots = [];

  let startTime = new Date(`1970-01-01T${start}:00`);
  const endTime = new Date(`1970-01-01T${end}:00`);

  while (startTime < endTime) {

    const slotStart = new Date(startTime);

    startTime.setMinutes(startTime.getMinutes() + duration);

    const slotEnd = new Date(startTime);

    slots.push({
      start: slotStart.toTimeString().slice(0,5),
      end: slotEnd.toTimeString().slice(0,5),
    //   booked: false
    });
  }

  return slots;
};