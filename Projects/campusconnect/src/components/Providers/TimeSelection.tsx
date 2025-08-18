import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function TimeSelection ({checked, start, end, onStart, onEnd}){
    const startVal = start? dayjs(start, "h:mm A"):null; 
    const endVal = end? dayjs(end, "h:mm A"): null; 

return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <div className="flex items-center gap-3 flex-wrap">
        <TimePicker
          label="Start"
          ampm
          value={startVal}
          disabled={!checked}
          onChange={(v) => onStart(v ? v.format("h:mm A") : "")}
          slotProps={{ textField: { size: "small" } }}
        />
        <TimePicker
          label="End"
          ampm
          value={endVal}
          disabled={!checked}
          onChange={(v) => onEnd(v ? v.format("h:mm A") : "")}
          slotProps={{ textField: { size: "small" } }}
        />
      </div>
    </LocalizationProvider>
)

}
