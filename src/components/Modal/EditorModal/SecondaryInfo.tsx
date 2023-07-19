import { getUniqueFormName } from "../../../utils/stringUtils";

type SecondaryInfoProps = {
  label?: string;
  details?: string[];
};

export const SecondaryInfo = ({ label, details }: SecondaryInfoProps) => {
  return details && label ? (
    <div>
      <h6>{label}</h6>
      {details.map((detail, i) => (
        <input
          name={getUniqueFormName("secondaryInfo")}
          key={`${detail}-${i}`}
          defaultValue={detail}
        />
      ))}
    </div>
  ) : (
    <></>
  );
};
