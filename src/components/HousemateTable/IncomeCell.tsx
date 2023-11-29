import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";

export const IncomeCell = ({
  getValue,
  row,
  column,
  table,
}: {
  getValue: any;
  row: any;
  column: any;
  table: any;
}) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;

  const [value, setValue] = useState(initialValue);

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    tableMeta?.updateData(row.index, column.id, value, e.target.validity.valid);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const number = Number(value);
    setValue(number);
    tableMeta?.updateData(row.index, column.id, value, e.target.validity.valid);
  };

  return (
    <Input
      type={"number"}
      value={value}
      onChange={handleOnChange}
      onBlur={onBlur}
    />
  );
};
