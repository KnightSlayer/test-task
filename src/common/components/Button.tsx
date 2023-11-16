import { ReactNode, ButtonHTMLAttributes } from "react"
import styled from '@emotion/styled'
import {colors, desktopMediaQuery} from "../styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick?: (...props: any[]) => any
}
const ButtonStyled = styled.button`
  padding: 12px 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 2px;
  background: ${colors.pink};
  
  color: white;
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;

  cursor: pointer;
  
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
  
  ${desktopMediaQuery} {
    font-size: 20px;
  }
`
export const Button = (props: ButtonProps) => {
  return (
    <ButtonStyled
      {...props}
    />
  )
}