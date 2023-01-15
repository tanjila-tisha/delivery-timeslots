import { InputLabel, MenuItem as MuiMenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "../types";

interface DropDownProps {
  handleChange: (value: string) => void;
  selectedValue: string;
  menuItems: MenuItem[];
  label: string;
}

const DropDown = ({
  handleChange,
  selectedValue,
  menuItems,
  label,
}: DropDownProps) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedValue}
        onChange={(event: SelectChangeEvent) =>
          handleChange(event.target.value)
        }
        label="Select Delivery Date"
      >
        <MuiMenuItem disabled value="">
          <em>{label}</em>
        </MuiMenuItem>
        {menuItems.map((item: MenuItem, index) => (
          <MuiMenuItem value={item.id} key={item.id}>
            {item.value}
          </MuiMenuItem>
        ))}
      </Select>
    </>
  );
};
export default DropDown;
