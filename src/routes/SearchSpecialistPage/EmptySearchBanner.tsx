import styled from '@emotion/styled'
import NotFoundCardIcon from '../../common/assets/not-found-card.svg'
import {desktopMediaQuery} from "../../common/styles";

const ContainerStyled = styled.div`
  margin: auto;
  width: fit-content;
  text-align: center;
`

const TextStyled = styled.div`
  font-weight: 500;
  
  width: 180px;
  font-size: 14px;
  
  ${desktopMediaQuery} {
    width: 264px;
    font-size: 20px;
  }
`


export const EmptySearchBanner = () => (
  <ContainerStyled>
    <img src={NotFoundCardIcon} />

    <TextStyled>
      К сожалению, нет анкет с такими параметрами
    </TextStyled>
  </ContainerStyled>
)