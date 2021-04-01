import React, { useCallback } from 'react'
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core'
import { Add, Close } from '@material-ui/icons'
import { AddInformationFieldsProps } from '~/types/components/AddInformationFields'

const AddInformationFields: React.FC<AddInformationFieldsProps> = ({
  list,
  name,
  text,
  control,
  setList,
  register,
  formControlClass,
}) => {
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

  return (
    <>
      {list.map((value, index) => (
        <FormControl key={index} className={formControlClass} required>
          <InputLabel htmlFor={`${name}${index}`} shrink>
            {text}
          </InputLabel>
          <Input
            id={`${name}${index}`}
            name={`${name}[${index}]`}
            defaultValue={value}
            inputRef={register({ required: true })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton disabled={list.length === 1} aria-label="Remover" onClick={() => handleRemove(index)}>
                  <Close />
                </IconButton>
                {list.length - 1 === index && (
                  <IconButton aria-label="Adicionar" onClick={handleAdd}>
                    <Add />
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        </FormControl>
      ))}
    </>
  )
}

export default AddInformationFields
