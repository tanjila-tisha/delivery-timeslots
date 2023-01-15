import { DeliveryInfo, MenuItem, TimeSlot } from "../types";

// Reading delivery information from local storage
export const getDeliverInfo = (): DeliveryInfo => {
  let delivery = {
    selectedDeliveryDate: "",
    selectedDeliveryTime: "",
    homeDelivery: false,
    selectedTimeSlot: "",
  };

  let deliveryInfo = localStorage.getItem("deliveryInfo");

  if (deliveryInfo === null) return delivery;
  delivery = JSON.parse(deliveryInfo);

  return { ...delivery };
};

// Saving delivery information in local storage
export const setDeliveryInfo = ({
  selectedDeliveryDate,
  selectedDeliveryTime,
  selectedTimeSlot,
  homeDelivery,
}: DeliveryInfo) => {
  localStorage.setItem(
    "deliveryInfo",
    JSON.stringify({
      selectedDeliveryDate,
      selectedDeliveryTime,
      selectedTimeSlot,
      homeDelivery,
    })
  );
};

// Delete delivery info from local storage
export const removeDeliveryInfo = () => localStorage.removeItem("deliveryInfo");

// Formating dates for select field
export const getDates = (availableDeliveryDates: string[]): MenuItem[] =>
  availableDeliveryDates?.map((availableDeliveryDate) => {
    return { value: availableDeliveryDate, id: availableDeliveryDate };
  });

// Formating time slots for select field
export const getTimeSlots = (
  availableTimeSlots: TimeSlot[],
  homeDelivery: boolean
): MenuItem[] => {
  const timeSlots = availableTimeSlots?.reduce(
    (initialSlot: MenuItem[], availableTimeSlot: TimeSlot) => {
      if (homeDelivery && availableTimeSlot.inHomeAvailable === false)
        return initialSlot;

      initialSlot.push({
        value: `${availableTimeSlot.startTime}-${availableTimeSlot.stopTime}`,
        id: availableTimeSlot.deliveryTimeId,
      });
      return initialSlot;
    },
    []
  );
  return timeSlots;
};

// Checking for time slot exist
export const isTimeSlotsExists = (
  availableTimeSlots: TimeSlot[],
  homeDelivery: boolean
): boolean => !!getTimeSlots(availableTimeSlots, homeDelivery).length;
