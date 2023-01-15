import { NavLink } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getDeliverInfo } from "../utils";
import { Box } from "@mui/system";

const Confirmation = () => {
  const { selectedDeliveryDate, selectedTimeSlot, homeDelivery } =
    getDeliverInfo();
  if (!selectedTimeSlot) return null;
  return (
    <>
      <Typography variant="h2" marginBottom={10}>
        Delivery summary
      </Typography>
      <Card variant="outlined">
        <CardContent sx={{ m: 2 }}>
          <Typography>Selected Date: {selectedDeliveryDate}</Typography>
          <Typography>Selected Time: {selectedTimeSlot}</Typography>
          <Typography>
            Delivery place:
            {homeDelivery === true
              ? " Home Delivery"
              : " Pickup from service point"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItem: "center",
              marginTop: 2,
              justifyContent: "flex-end",
            }}
          >
            <ArrowBackIcon />
            <NavLink to="/">Go back to edit</NavLink>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
export default Confirmation;
