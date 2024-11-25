import { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Button, Screen, Text, TextField } from "@/components"
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
    const [buttonText, setButtonText] = useState("Click to start a promise")
    const [timer, setTimer] = useState(100)
    const promiseWithInterval = () => {
      return new Promise((resolve) => {
        let count = 0
        const intervalId = setInterval(() => {
          count++
          if (count === 3) {
            clearInterval(intervalId)
            setButtonText("Finished")
            resolve("Interval")
          }
        }, 1000)
      })
    }

    const timerDecrement = () => {
      setTimeout(() => {
        setTimer((prevCount) => prevCount - 1)
      }, 1000)
    }
    useEffect(() => {
      timerDecrement()
    }, [timer])
    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top", "left", "right", "bottom"]}>
        <View style={$links}>
          <Text
            style={themed($linkToMainPage)}
            text="Go to main page"
            onPress={() => navigation.pop()}
          />
          <Text
            style={themed($linkToThirdPage)}
            text="Go to third Page"
            onPress={() => navigation.push("ThirdPage")}
          />
        </View>
        <Text text="SecondPage" />
        <TextField
          style={themed($textBox)}
          label="User Data"
          value={JSON.stringify(userStore.userList)}
        ></TextField>
        <Text text={"Timer " + timer} />
        <Button text={buttonText} onPress={promiseWithInterval} />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}

const $links: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}
const $linkToThirdPage: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: "flex-end",
})

const $linkToMainPage: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: "flex-start",
})

const $textBox: ThemedStyle<TextStyle> = () => ({
  height: 100,
})
