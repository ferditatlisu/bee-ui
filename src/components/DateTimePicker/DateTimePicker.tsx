import React, { useEffect, useState } from 'react';
import { DatePicker, Radio, RadioChangeEvent } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface DateTimePickerProps {
  defaultValueMs: number;
  onChange: (unixMs: number) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  defaultValueMs,
  onChange,
}) => {
  const [isLocalTimeMode, setIsLocalTimeMode] = useState(false);
  const [timestampMs, setTimestampMs] = useState<number>(defaultValueMs);

  useEffect(() => {
    onChange(dayjs(timestampMs).startOf('second').valueOf());
  }, []);

  const handleDateChange = (date: Dayjs | null) => {
    const timestamp = date?.startOf('second').valueOf() ?? -1;
    setTimestampMs(timestamp);
    onChange(timestamp);
  };

  const handleModeChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value;
    setIsLocalTimeMode(newValue === 'local');
  };

  let format = 'YYYY-MM-DD HH:mm:ss';
  let current: Dayjs = dayjs(timestampMs).utc();

  if (isLocalTimeMode) {
    current = current?.local();
    const offset = current.format('Z');
    format += ` [${offset}(Local)]`;
  } else {
    const offset = current.format('Z');
    format += ` [${offset}(UTC)]`;
  }

  return (
    <DatePicker
      style={{ marginTop: '6px', borderRadius: 0, padding: '12 0' }}
      showTime={true}
      allowClear={false}
      renderExtraFooter={TimeModeSelector}
      format={format}
      value={current}
      onChange={handleDateChange}
    />
  );

  function TimeModeSelector() {
    return (
      <Radio.Group
        style={{ marginLeft: '12px' }}
        value={isLocalTimeMode ? 'local' : 'utc'}
        onChange={handleModeChange}>
        <Radio value="local">Local</Radio>
        <Radio value="utc">UTC</Radio>
      </Radio.Group>
    );
  }
};

export default DateTimePicker;
