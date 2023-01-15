// Fetch dates
export const getDeliveryDates = async () => {
  const response = await fetch(
    "https://api.mathem.io/mh-test-assignment/delivery/dates"
  );
  const data = await response.json();
  return data;
};

// Fetch time slots for given dates
export const getAvailableTimeSlots = async (selectedDate: string) => {
  const response = await fetch(
    `https://api.mathem.io/mh-test-assignment/delivery/times/${selectedDate}`
  );
  const data = await response.json();
  return data;
};
