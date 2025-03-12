interface IButton {
  type?: "primary" | "danger" | "warning" | "confirm";
  label?: string;
  isFormSubmit?: boolean;
  onClick?: () => void;
}

const Button = ({
  type = "primary",
  label = "Button",
  isFormSubmit = false,
  onClick,
}: IButton) => {
  const typeStyles: Record<NonNullable<IButton["type"]>, string> = {
    primary: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-red-600 hover:bg-red-700",
    warning: "bg-yellow-400 hover:bg-yellow-500",
    confirm: "bg-green-600 hover:bg-green-700",
  };

  return (
    <button
      className={`${typeStyles[type]} text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none cursor-pointer`}
      type={isFormSubmit ? "submit" : undefined}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default Button;
