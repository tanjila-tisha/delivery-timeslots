import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { getDeliveryDates } from "../data/deliveryDateServices";

const DeliveryOptions = () => {
  const [availableDeliveryDates, setAvailableDeliveryDates] = useState<string[]>([]);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState("");
  //const [deliveryTime, setDeliveryTime] = useState("");
  // const [homeDelivery, setHomeDelivery] = useState(false);

  useEffect(() => {
    getDeliveryDates().then(setAvailableDeliveryDates);
  }, []);

  const handleChangeDate = (value : string) => setSelectedDeliveryDate(value);
  

  console.log("dates:", availableDeliveryDates);
  console.log("selected date:", selectedDeliveryDate);
  return (
    <div>
      <DropDown
        handleChange={handleChangeDate}
        selectedValue={selectedDeliveryDate}
        menuItems={availableDeliveryDates}
        label="Select a delivery date"
      />
    </div>
  );
};

export default DeliveryOptions;
