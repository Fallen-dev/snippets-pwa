export const actions = {
  async submit(event) {
    const inputData = await event.request.formData()
    return {
      user: inputData.get('user'),
      language: inputData.get('lang'),
      code: inputData.get('code'),
      title: inputData.get('title')
    }
  }
}