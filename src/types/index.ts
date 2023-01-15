export interface MenuItem {
  value: string;
  id: string;
}

export interface TimeSlot {
  deliveryDate: string;
  deliveryTimeId: string;
  inHomeAvailable: boolean;
  startTime: string;
  stopTime: string;
}

export interface DeliveryInfo {
  selectedDeliveryDate: string;
  selectedDeliveryTime: string;
  homeDelivery: boolean;
  selectedTimeSlot: string;
}
