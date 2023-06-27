import { forwardRef } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import { CalendarIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

const CustomDateTimeInput = forwardRef((props: any, ref) => (
  <InputGroup>
    <InputLeftElement pointerEvents="none">
      <CalendarIcon color="gray.300" />
    </InputLeftElement>
    <Input type="text" {...props} ref={ref as any} />
  </InputGroup>
));

interface CustomDatePickerProps extends Partial<ReactDatePickerProps> {
  setDate: (date: Date) => void;
}

export const CustomDateTimePicker = ({
  setDate,
  ...props
}: CustomDatePickerProps) => {
  const handleChangeRaw = (date: any) => {
    const newRaw = new Date(date.currentTarget.value);
    if (
      newRaw instanceof Date &&
      newRaw.getTime() > 0 &&
      !isNaN(newRaw as any)
    ) {
      setDate(newRaw);
    }
  };

  return (
    <DatePicker
      maxDate={new Date()}
      showTimeSelect
      timeFormat="HH:mm:ss"
      timeIntervals={15}
      onChangeRaw={(e) => handleChangeRaw(e)}
      timeCaption="time"
      dateFormat="MM/dd/yyyy HH:mm:ss"
      onChange={(newDate: Date) => {
        setDate(newDate);
      }}
      customInput={<CustomDateTimeInput></CustomDateTimeInput>}
      {...props}
    />
  );
};

export default CustomDateTimePicker;
