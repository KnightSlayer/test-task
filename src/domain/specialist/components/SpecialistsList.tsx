import { SpecialistId } from "../Specialist";
import { SpecialistCard } from "./SpecialistCard";

type SpecialistsListProps = {
  specialistIds: SpecialistId[]
}
export const SpecialistsList = ({ specialistIds }: SpecialistsListProps) => {

  return (
    <div>
      { specialistIds.map((specialistId) => (
        <SpecialistCard
          key={specialistId}
          specialistId={specialistId}
        />
      ))}
    </div>
  )
}