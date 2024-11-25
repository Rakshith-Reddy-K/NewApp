import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const FormStoreModel = types
  .model("FormStore")
  .props({
    name: types.optional(types.string, "WOD NEWTON"),
    points: types.optional(types.string, "189"),
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get getName() {
      return store.name
    },
    get getPoints() {
      return store.points
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    setName(name: string) {
      store.setProp("name", name)
    },
    setPoints(points: string) {
      store.setProp("points", points)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface FormStore extends Instance<typeof FormStoreModel> {}
export interface FormStoreSnapshotOut extends SnapshotOut<typeof FormStoreModel> {}
export interface FormStoreSnapshotIn extends SnapshotIn<typeof FormStoreModel> {}
export const createFormStoreDefaultModel = () => types.optional(FormStoreModel, {})
