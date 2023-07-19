import { getUniqueFormName } from "../../../utils/stringUtils";

type BulletPointsProps = {
  label: string;
  details: string[];
};

export const BulletPoints = ({ label, details }: BulletPointsProps) => {
  return (
    <div>
      <h6>{label}</h6>
      {details.map((detail, i) => (
        <input key={`${detail}${i}`} name={getUniqueFormName("details")} defaultValue={detail} />
      ))}
    </div>
  );
};
