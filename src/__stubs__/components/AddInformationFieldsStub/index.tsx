import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import AddInformationFields from '~/components/AddInformationFields'

interface AddInformationFieldsStubProps {
  list: string[]
}

const AddInformationFieldsStub: FC<AddInformationFieldsStubProps> = ({ list }) => {
  const [values, setList] = useState<string[]>(list)
  const { register, control } = useForm()

  return (
    <form>
      <AddInformationFields
        list={values}
        name="whereDidYouWork"
        text="Onde já trabalhou?"
        control={control}
        register={register}
        setList={setList}
        formControlClass="main__form-control"
      />
    </form>
  )
}

export default AddInformationFieldsStub
