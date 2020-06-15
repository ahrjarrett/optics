export const addPx = (value: number | 'auto' = 0): string => {
  switch (value) {
    case 'auto':
      return value
    default:
      return `${value}px`
  }
}

export const flexFlow = (
  direction: 'column' | 'column-reverse' | 'row' | 'row-reverse' = 'column',
  wrap: 'wrap' | 'nowrap' | 'wrap-reverse' = 'nowrap',
) => ({
  display: 'flex',
  flexFlow: `${direction} ${wrap}`,
})
