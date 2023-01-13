export const getDeliveryDates = async () => {
  const response = await fetch(
    "https://api.mathem.io/mh-test-assignment/delivery/dates"
  );
  const data = await response.json();
  return data;
};
