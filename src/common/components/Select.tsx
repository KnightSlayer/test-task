import { ForwardedRef, forwardRef, ComponentProps } from "react"
import ReactSelect from "react-select"

export const Select = forwardRef((props: ComponentProps<typeof ReactSelect>, ref: ForwardedRef<ReactSelect>) => (
  <ReactSelect
    {...props}
    ref={ref as any}
  />
))
