import { differenceInHours } from "date-fns";

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

export const removeExpiredSlots = (parsedDate, slots) => {

  const now = new Date();
  const isToday = parsedDate.toDateString() === now.toDateString();

  if (isToday) {

    const currentMinutes =
      now.getHours() * 60 + now.getMinutes(); //to min

    slots = slots.filter((slot) => {

      const [hours, minutes] = slot.start.split(":").map(Number);

      const slotMinutes = hours * 60 + minutes;

      return slotMinutes > currentMinutes + 10; //to compare in min
      // only care about time

    });

  }
  return slots;


}


// export const checkCanCancelAppointment = (date, start) => {
//   const appointment = new Date(`${date}T${start}`);
//   return differenceInHours(appointment, new Date()) >= 2;
// };


export const checkCanCancelAppointment = (date, start, end) => {

    const now = new Date();

    const appointmentTime = new Date(`${date}T${start}`);

    const diff = appointmentTime - now;

    const diffHours = diff / (1000 * 60 * 60);

    return diffHours >= 2;
};