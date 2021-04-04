import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AddInformationFieldsStubProps } from '~/__stubs__/module/Candidate/molecules/AddInformationFieldsStub/index.d'
import AddInformationFields from '~/module/Candidate/components/molecules/AddInformationFields'

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
