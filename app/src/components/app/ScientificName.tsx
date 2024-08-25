export default function ScientificName({ children }: any) {
  const nameParts = children.split(" ");
  const genus = nameParts[0];
  const specificEpithet = nameParts.length > 2 ? nameParts[1] : null;
  const authorship = nameParts.slice(specificEpithet ? 2 : 1).join(" ");
  return (
    <>
      <span className="italic">
        {genus} {specificEpithet ? specificEpithet : ""}
      </span>
      &nbsp;
      <span>{authorship}</span>
    </>
  );
}
