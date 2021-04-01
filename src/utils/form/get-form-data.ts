const getFormData = (form: HTMLFormElement) => {
  const formData = new FormData(form)
  const entries = formData.entries()
  const data = Object.fromEntries(entries)

  return data
}

export default getFormData
