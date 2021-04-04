import { useCallback } from 'react'
import { UseComponentRulesProps } from '~/types/components/AddInformationFields/useComponentRules.d'

const useComponentRules = ({ name, list, control, setList }: UseComponentRulesProps) => {
  const handleAdd = useCallback(() => setList([...list, '']), [list])

  const handleRemove = useCallback(
    (index: number) => {
      const formData = control.getValues()
      const listFiltered: string[] = formData[name].filter((_: any, _index: number) => _index !== index)

      if (!listFiltered.length) {
        listFiltered.push('')
      }

      listFiltered.forEach((value, i) => control.setValue(`${name}[${i}]`, value))

      setList(listFiltered)
    },
    [list, name]
  )

  return { handleAdd, handleRemove }
}

export default useComponentRules
