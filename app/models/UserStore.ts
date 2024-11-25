import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { UserModel } from "./User"
import { api } from "@/services/api"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    users: types.array(UserModel),
    totalFeePaid: types.optional(types.number, 0),
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get userList() {
      console.log(store.users)
      return store.users.filter((user) => user.age > 0)
    },
    get totalFee() {
      return store.totalFeePaid
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async getUsers() {
      // Get users from external api
      const response = await api.getUsers()
      console.log(response)
      let feePaid = 0
      if (response.kind === "ok") {
        store.setProp("users", response.users)
        // Add the fee for each user to populate totalFeePaid
        response.users.forEach((user) => {
          feePaid += user.fee
        })
        store.setProp("totalFeePaid", feePaid)
      } else {
        console.error(`Error fetching users: ${JSON.stringify(response)}`)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
