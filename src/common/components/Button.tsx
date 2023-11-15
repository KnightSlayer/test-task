import { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick?: (...props: any[]) => any
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
    />
  )
}