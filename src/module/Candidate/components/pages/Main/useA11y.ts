import { useCallback } from 'react'

const useA11y = () => {
  const a11yProps = useCallback(
    (index: number) => ({
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    }),
    []
  )

  return {
    a11yProps,
  }
}

export default useA11y
