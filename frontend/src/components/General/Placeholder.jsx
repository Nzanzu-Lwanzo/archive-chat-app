import { InfoIcon } from "../../assets/svg";

export default function Placeholder({ children }) {
  return <div className="placeholder center">{children}</div>;
}

export function OnErrorPlaceholder({ message, action }) {
  return (
    <Placeholder>
      <div className="on-error bubble cell-red" onClick={action}>
        <span className="center">
          <InfoIcon />
        </span>
        <span className="retry">{message}</span>
      </div>
    </Placeholder>
  );
}

export function OnNoDataPlaceholder({ message, bg = "ON_LIGHT" }) {
  return (
    <Placeholder>
      <div
        className={`${
          bg === "ON_LIGHT" ? "no-data" : bg === "ON_DARK" ? "cell" : undefined
        } bubble`}
      >
        <span className="center">
          <InfoIcon />
        </span>
        <span className="retry">{message}</span>
      </div>
    </Placeholder>
  );
}
