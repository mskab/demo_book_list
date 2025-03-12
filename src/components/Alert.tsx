import { IAlert } from "./Alert.type";

const Alert = ({ message, type }: IAlert) => {
  const typeClasses: { [key in IAlert["type"]]: string } = {
    danger: "text-red-800 border-red-300 bg-red-50",
    succeed: "text-green-800 border-green-300 bg-green-50",
  };

  return (
    <div
      className={`${typeClasses[type]} flex flex-row gap-4 min-w-44 items-center p-4 mb-4 text-sm border rounded-lg`}
    >
      <svg
        className="shrink-0 inline w-4 aspect-square"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div>{message}</div>
    </div>
  );
};
export default Alert;
