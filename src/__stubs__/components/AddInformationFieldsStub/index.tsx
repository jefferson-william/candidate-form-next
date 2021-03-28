import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import AddInformationFields from '~/components/AddInformationFields'

interface AddInformationFieldsStubProps {
  defaultValues: string[]
  defaultList: number[]
}

const AddInformationFieldsStub: FC<AddInformationFieldsStubProps> = ({ defaultList, defaultValues }) => {
  const [list, setList] = useState<number[]>(defaultList)
  const { register } = useForm()

  return (
    <form>
      <AddInformationFields
        defaultValues={defaultValues}
        list={list}
        name="whereDidYouWork"
        text="Onde já trabalhou?"
        register={register}
        setList={setList}
        formControlClass="main__form-control"
      />
    </form>
  )
}

export default AddInformationFieldsStub
