import styled from '@emotion/styled'
import { memo, useMemo } from "react";
import { Sex, SpecialistId } from "../Specialist";
import { useAppSelector } from "../../../store/hooks";
import { selectSpecialistById } from "../specialistSlice";
import { desktopMediaQuery } from "../../../common/styles";
import noPhotoManSrc from "../../../common/assets/no-photo-man.svg"
import noPhotoWomanSrc from "../../../common/assets/no-photo-woman.svg"
import noPhotoSrc from "../../../common/assets/no-photo.svg"

const ContainerStyled = styled.div`
  width: 140px;
  position: relative;
  
  ${desktopMediaQuery} {
    width: 352px;
  }
`
const PhotoStyled = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
`

const RatingContainerStyled = styled.div`
  box-sizing: border-box;
  font-weight: 500;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  
  top: 4px;
  left: 4px;
  padding: 4px 1px;
  width: 28px;
  height: 28px;
  font-size: 4px;
  
  ${desktopMediaQuery} {
    top: 12px;
    left: 12px;
    width: 52px;
    height: 52px;
    font-size: 8px;
    padding: 8px 2px;
  }
`

const RatingValueStyled = styled.div<{ isNew: boolean }>`
  font-size: ${props => props.isNew ? '8px' : '16px'};
  
  ${desktopMediaQuery} {
    font-size: ${props => props.isNew ? '16px' : '24px'};
  }
`




type SpecialistCardProps = {
  specialistId: SpecialistId
}

export const SpecialistCard = memo(({ specialistId }: SpecialistCardProps) => {
  const specialist = useAppSelector((state) => selectSpecialistById(state, { specialistId }))

  if (!specialist) {
    // TODO: may be load by id (lazy loading)
  }

  const photoUrl = useMemo(() => {
    if (specialist.photoUrl) return specialist.photoUrl

    switch (specialist.sex) {
      case Sex.MALE: return noPhotoManSrc
      case Sex.FEMALE: return noPhotoWomanSrc
      default: return noPhotoSrc
    }
  }, [specialist.photoUrl, specialist.sex])


  return (
    <ContainerStyled>
      <PhotoStyled src={photoUrl} />
      <RatingContainerStyled>
        РЕЙТИНГ
        <RatingValueStyled isNew={specialist.rating === 0}>
          { specialist.rating || 'NEW'}
        </RatingValueStyled>
      </RatingContainerStyled>
      { specialist.name }
    </ContainerStyled>
  )
})