import { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Screen, Text, TextField } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useStores } from "@/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface SecondPageScreenProps extends AppStackScreenProps<"SecondPage"> {}

export const SecondPageScreen: FC<SecondPageScreenProps> = observer(
  function SecondPageScreen(_props) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const { navigation } = _props
    const { userStore } = useStores()
    const { themed } = useAppTheme()
    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top", "left", "right", "bottom"]}>
        <Text
          style={themed($linkToMainPage)}
          text="Go to main page"
          onPress={() => navigation.pop()}
        />
        <Text text="SecondPage" />
        <TextField
          style={themed($textBox)}
          label="User Data"
          value={JSON.stringify(userStore.userList)}
        ></TextField>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

// const $linkToThirdPage: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
//   color: colors.tint,
//   marginBottom: spacing.lg,
//   alignSelf: "flex-end",
// })

const $linkToMainPage: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: "flex-start",
})

const $textBox: ThemedStyle<TextStyle> = () => ({
  height: 100,
})
