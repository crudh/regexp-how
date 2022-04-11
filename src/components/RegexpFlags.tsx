import { allFlags, flagNames } from "../constants";
import { Flag, Flags } from "../types";

const CheckBox = ({
  flag,
  isToggled,
  onToggle,
}: {
  flag: Flag;
  isToggled: boolean;
  onToggle: (flag: Flag) => void;
}) => {
  return (
    <div className="flex items-center pr-2">
      <input
        type="checkbox"
        id={`flag-checkbox-${flag}`}
        checked={isToggled}
        onChange={() => onToggle(flag)}
      />
      <label className="pl-1 text-sm" htmlFor={`flag-checkbox-${flag}`}>
        {flagNames[flag]}
      </label>
    </div>
  );
};

export const RegexpFlags = ({
  flags,
  onSetFlags,
}: {
  flags: Flags;
  onSetFlags: (flags: Flags) => void;
}) => {
  const handleToggleFlag = (flag: Flag) =>
    onSetFlags({ ...flags, [flag]: !flags[flag] });

  return (
    <div className="flex pt-1">
      {allFlags.map((flag) => (
        <CheckBox
          key={flag}
          flag={flag}
          isToggled={flags[flag]}
          onToggle={handleToggleFlag}
        />
      ))}
    </div>
  );
};
