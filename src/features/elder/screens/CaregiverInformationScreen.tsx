import ResponsibleInformationModel from "@/features/elder/components/responsibleInformationModel";

type InformationCaregiver = {
  name: string;
  phone: string;
};

export default function CaregiverInformationScreen({
  name,
  phone,
}: InformationCaregiver) {
  return (
    <ResponsibleInformationModel
      name={name}
      phone={phone}
      ownerData="Cuidador"
    />
  );
}
