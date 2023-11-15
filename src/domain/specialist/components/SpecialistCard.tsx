import { SpecialistId } from "../Specialist";
import {useAppSelector} from "../../../store/hooks";
import {selectSpecialistById} from "../specialistSlice";

type SpecialistCardProps = {
  specialistId: SpecialistId
}

export const SpecialistCard = ({ specialistId }: SpecialistCardProps) => {
  const specialist = useAppSelector((state) => selectSpecialistById(state, { specialistId }))

  if (!specialist) {
    // TODO: may be load by id (lazy loading)
  }

  return (
    <div>
      { specialist.name }
    </div>
  )
}