export interface AddInformationFieldsProps {
  defaultValues: string[]
  list: number[]
  name: string
  text: string
  register: any
  setList: React.Dispatch<React.SetStateAction<number[]>>
  formControlClass?: string
}
