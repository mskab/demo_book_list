import { ChangeEvent } from "react";

interface IDropdown {
  items: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: string;
  className?: string;
  isSelectable?: boolean;
  name?: string;
}

const Dropdown = ({
  items,
  onChange,
  defaultValue,
  className,
  isSelectable = false,
  name,
}: IDropdown) => {
  return (
    <select
      className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 block`}
      onChange={onChange}
      required={isSelectable}
      name={name}
      defaultValue={defaultValue || ""}
    >
      {!defaultValue && (
        <option value="" disabled hidden>
          Choose...
        </option>
      )}
      {items.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
export default Dropdown;
