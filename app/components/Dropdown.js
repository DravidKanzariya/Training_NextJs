
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Dropdown({ options, sendSelectedCategory }) {
  const theme = useTheme();
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setCategory(value);
    sendSelectedCategory(value);
  };

  return (
    <Box>
      <FormControl sx={{ m: 1, width: "50vw", mt: 3 }}>
        <Select
          displayEmpty
          value={category}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => (selected ? selected : <em>Category</em>)}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {options.map((name) => (
            <MenuItem key={name} value={name} className='capitalize'>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

