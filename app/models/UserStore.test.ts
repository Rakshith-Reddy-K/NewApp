import { UserStoreModel } from "./UserStore"

test("can be created", () => {
  const instance = UserStoreModel.create({ users: [], totalFeePaid: 0 })

  expect(instance).toBeTruthy()
})
