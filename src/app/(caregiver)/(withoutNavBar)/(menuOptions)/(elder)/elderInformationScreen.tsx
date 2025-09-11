import ResponsibleInformationModel from "@/components/responsibleInformationModel";

type ElderDataProfile = {
  name: string;
  phone: string;
};

export default function ElderInformationScreen({
  name,
  phone,
}: ElderDataProfile) {
  return (
    <ResponsibleInformationModel name={name} phone={phone} ownerData="Idoso" />
  );
}
