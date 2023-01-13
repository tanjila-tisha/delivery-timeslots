
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface DropDownProps {
  handleChange:  (value: string)=>void;
  selectedValue: string;
  menuItems: string[];
  label: string;
}

const DropDown = ({handleChange, selectedValue, menuItems, label} : DropDownProps ) =>{
    return (
        <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedValue}
          onChange={(event: SelectChangeEvent) => handleChange(event.target.value)}
          label="Select Delivery Date"
        >
          <MenuItem disabled value="">
            <em>{label}</em>
          </MenuItem>
          {menuItems.map((item: string) => (
            <MenuItem value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
}
export default DropDown
