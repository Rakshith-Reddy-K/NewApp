import { FormStoreModel } from "./FormStore"

test("can be created", () => {
  const instance = FormStoreModel.create({})

  expect(instance).toBeTruthy()
})
