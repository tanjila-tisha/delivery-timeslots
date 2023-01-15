import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Checkbox,
  Typography,
  FormControlLabel,
  Button,
  FormControl,
} from "@mui/material";
import DropDown from "./DropDown";
import {
  getDeliveryDates,
  getAvailableTimeSlots,
} from "../data/deliveryDateServices";
import { TimeSlot } from "../types";
import {
  getDates,
  getDeliverInfo,
  getTimeSlots,
  isTimeSlotsExists,
  removeDeliveryInfo,
  setDeliveryInfo,
} from "../utils";

const formControlSX = { m: 2, minWidth: "100%" };

const DeliveryOptions = () => {
  let navigate = useNavigate();
  const [availableDeliveryDates, setAvailableDeliveryDates] = useState<
    string[]
  >([]);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState("");
  const [homeDelivery, setHomeDelivery] = useState(false);

  useEffect(() => {
    getDeliveryDates().then(setAvailableDeliveryDates);
    const { selectedDeliveryDate, selectedDeliveryTime, homeDelivery } =
      getDeliverInfo();
    setSelectedDeliveryDate(selectedDeliveryDate);
    setSelectedDeliveryTime(selectedDeliveryTime);
    setHomeDelivery(homeDelivery);
  }, []);

  useEffect(() => {
    if (selectedDeliveryDate)
      getAvailableTimeSlots(selectedDeliveryDate).then(setAvailableTimeSlots);
  }, [selectedDeliveryDate, homeDelivery]);

  const handleChangeDate = (value: string) => {
    setSelectedDeliveryTime("");
    setSelectedDeliveryDate(value);
  };
  const handleHomeDelivery = () => {
    setSelectedDeliveryTime("");
    setHomeDelivery(!homeDelivery);
  };

  // Handler for saving delivery infor and proceed to confirmation page
  const handleProceed = () => {
    const timeSlot = availableTimeSlots.find(
      (availableTimeSlot) =>
        availableTimeSlot.deliveryTimeId === selectedDeliveryTime
    );
    const selectedTimeSlot = `${timeSlot?.startTime}-${timeSlot?.stopTime} `;
    setDeliveryInfo({
      selectedDeliveryDate,
      selectedDeliveryTime,
      selectedTimeSlot,
      homeDelivery,
    });
    return navigate("/confirmation");
  };

  // Handler for reseting form and delete local storage
  const handleReset = () => {
    reset();
    removeDeliveryInfo();
  };

  // Reset form elements
  const reset = () => {
    setSelectedDeliveryDate("");
    setSelectedDeliveryTime("");
    setAvailableTimeSlots([]);
    setHomeDelivery(false);
  };
  return (
    <>
      <Typography variant="h2" marginBottom={10}>
        Delivery date and time picker
      </Typography>
      <Card variant="outlined">
        <CardContent sx={{ m: 2 }}>
          <FormControl variant="standard" sx={formControlSX}>
            <DropDown
              handleChange={handleChangeDate}
              selectedValue={selectedDeliveryDate}
              menuItems={getDates(availableDeliveryDates)}
              label="Select a delivery date"
            />
          </FormControl>
          {selectedDeliveryDate &&
            (isTimeSlotsExists(availableTimeSlots, homeDelivery) ? (
              <FormControl variant="standard" sx={formControlSX}>
                <DropDown
                  handleChange={(value: string) =>
                    setSelectedDeliveryTime(value)
                  }
                  selectedValue={selectedDeliveryTime}
                  menuItems={getTimeSlots(availableTimeSlots, homeDelivery)}
                  label="Select a delivery time"
                />
              </FormControl>
            ) : (
              <div> No home delivery available for this date </div>
            ))}
          <FormControl variant="standard" sx={formControlSX}>
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="I want home delivery"
              checked={homeDelivery}
              onChange={handleHomeDelivery}
            />
          </FormControl>
          <FormControl variant="standard" sx={formControlSX}>
            <Button
              variant="contained"
              disabled={!selectedDeliveryTime}
              onClick={handleProceed}
            >
              Proceed
            </Button>
            <Button
              variant="text"
              disabled={!selectedDeliveryTime}
              onClick={handleReset}
            >
              Reset
            </Button>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default DeliveryOptions;
