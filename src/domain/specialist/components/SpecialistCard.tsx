import styled from '@emotion/styled'
import { memo, useMemo } from "react";
import { OnlineStatus, Sex, SpecialistId } from "../Specialist";
import { useAppSelector } from "../../../store/hooks";
import { selectSpecialistById } from "../specialistSlice";
import { colors, desktopMediaQuery } from "../../../common/styles";
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
  padding-bottom: 8px;

  ${desktopMediaQuery} {
    padding-bottom: 16px;
  }
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

const TopLineStyled = styled.div`
  display: flex;
  gap: 4px;
`
const TopLineTextStyled = styled.div`
  font-weight: 500;
  line-height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  font-size: 14px;

  .div {
    white-space: nowrap;
  }

  ${desktopMediaQuery} {
    font-size: 26px;
  }
`

const OnlineMarkedStyled = styled.div`
  background-color: ${colors.green};
  border-radius: 100%;
  flex-shrink: 0;
  
  width: 8px;
  height: 8px;
  
  ${desktopMediaQuery} {
    width: 12px;
    height: 12px;
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

  const topLineText =  `${ specialist.name }, ${ specialist.age }`

  return (
    <ContainerStyled>
      <PhotoStyled src={photoUrl} />
      <RatingContainerStyled>
        РЕЙТИНГ
        <RatingValueStyled isNew={specialist.rating === 0}>
          { specialist.rating || 'NEW'}
        </RatingValueStyled>
      </RatingContainerStyled>

      <TopLineStyled>
        <TopLineTextStyled title={topLineText} >
          { topLineText }
        </TopLineTextStyled>
        <OnlineMarkedStyled />
        { specialist.onlineStatus === OnlineStatus.ONLINE && <OnlineMarkedStyled />}
      </TopLineStyled>
    </ContainerStyled>
  )
})