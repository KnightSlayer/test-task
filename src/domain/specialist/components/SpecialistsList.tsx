import styled from '@emotion/styled'
import { SpecialistId } from "../Specialist";
import { SpecialistCard } from "./SpecialistCard";
import { desktopMediaQuery } from "../../../common/styles";


const ContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  
  ${desktopMediaQuery} {
    gap: 20px;
  }
`


type SpecialistsListProps = {
  specialistIds: SpecialistId[]
}
export const SpecialistsList = ({ specialistIds }: SpecialistsListProps) => {

  return (
    <ContainerStyled>
      { specialistIds.map((specialistId) => (
        <SpecialistCard
          key={specialistId}
          specialistId={specialistId}
        />
      ))}
    </ContainerStyled>
  )
}