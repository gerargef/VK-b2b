import { IMeetingRoomBooking } from "../types/data";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

const towerMenuItems = ["A", "B"];
const fllorMenuItems = Array.from({ length: 25 }, (_, i) => i + 3);
const numberMenuItems = Array.from({ length: 10 }, (_, i) => i + 1);
const regDate = new RegExp(
  /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (([0][8-9]|[1][0-1]):[0/3][0] [A][M])|(([0][1-9]|[1][2]):[0/3][0] [P][M])$/
);

const BookingForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IMeetingRoomBooking>();
  const onSubmit = (data: IMeetingRoomBooking) => {
    console.log(data);
    reset();
  };
  const onReset = () => {
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" component="h5">
        Бронирование переговорной
      </Typography>
      <Controller
        name="tower"
        control={control}
        defaultValue={""}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Башня</InputLabel>
            <Select
              fullWidth
              value={value}
              onChange={onChange}
              error={Boolean(errors.tower)}
            >
              {towerMenuItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="floor"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Этаж</InputLabel>
            <Select
              fullWidth
              label="Этаж"
              value={value}
              onChange={onChange}
              error={Boolean(errors.floor)}
            >
              {fllorMenuItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="number"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Номер переговорной
            </InputLabel>
            <Select
              fullWidth
              error={Boolean(errors.number)}
              label="Номер переговорной"
              value={value}
              onChange={onChange}
            >
              {numberMenuItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="date"
        control={control}
        defaultValue=""
        rules={{ required: true, pattern: regDate }}
        render={({ field: { onChange, value } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDateTimePicker
              value={dayjs(value)}
              onChange={(value) =>
                onChange(dayjs(value).format("YYYY-MM-DD hh:mm A"))
              }
              minTime={dayjs().set("hour", 8).startOf("hour")}
              maxTime={dayjs().set("hour", 21).startOf("hour")}
              shouldDisableTime={(value, view) =>
                view === "minutes" &&
                value.minute() != 0 &&
                value.minute() != 30
              }
            />
          </LocalizationProvider>
        )}
      />
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            label="Комментарий"
            variant="outlined"
            value={value}
            onChange={onChange}
          />
        )}
      />
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button variant="contained" type="submit">
          Отправить
        </Button>
        <Button variant="outlined" type="reset" onClick={() => onReset()}>
          Очистить
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default BookingForm;
