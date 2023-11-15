import { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
    />
  )
}