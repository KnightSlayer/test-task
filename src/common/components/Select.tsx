import { ForwardedRef, forwardRef, ComponentProps } from "react"
import ReactSelect, { IndicatorSeparatorProps } from "react-select"

const IndicatorSeparator = ({}: IndicatorSeparatorProps) => {
  return null;
};

const components = { IndicatorSeparator }

export const Select = forwardRef((props: ComponentProps<typeof ReactSelect>, ref: ForwardedRef<ReactSelect>) => (
  <ReactSelect
    {...props}
    components={components}
    ref={ref as any}
  />
))
