type PrimaryInfoProps = {
  label: string;
  value: string;
};
export const PrimaryInfo = ({ label, value }: PrimaryInfoProps) => {
  return (
    <div>
      <h6>{label}</h6>
      <input name="primaryInfo" defaultValue={value} />
    </div>
  );
};
