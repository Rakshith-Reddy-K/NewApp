/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Button, Screen, Text, TextField } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useStores } from "@/models"

interface ThirdPageScreenProps extends AppStackScreenProps<"ThirdPage"> {}

export const ThirdPageScreen: FC<ThirdPageScreenProps> = observer(function ThirdPageScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { themed } = useAppTheme()
  const { navigation } = _props
  const { formStore } = useStores()

  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top", "left"]}>
      <View style={$view}>
        <View style={$links}>
          <Text
            style={themed($linkToThirdPage)}
            text="Go to second Page"
            onPress={() => navigation.push("SecondPage")}
          />
          <Text
            style={themed($linkToMainPage)}
            text="Go to main page"
            onPress={() => navigation.push("MainPage")}
          />
        </View>

        <Text preset="subheading" style={themed($subHeading)} text="History:" />
        <View style={$card}>
          <View style={{ flex: 2, backgroundColor: "grey" }}>
            <Text preset="subheading" style={themed($subHeading)} text={formStore.getName} />
          </View>
          <View style={{ flex: 1, backgroundColor: "black", alignSelf: "center" }}>
            <Text style={themed($cardPoints)} text={formStore.getPoints}></Text>
            <Text preset="formHelper" style={{ color: "white" }} text="Totol Points"></Text>
          </View>
        </View>
        <View style={$form}>
          <TextField
            label="Points"
            LabelTextProps={{ style: $textFieldLabel }}
            inputWrapperStyle={$textField}
            value={formStore.getPoints}
            onChangeText={formStore.setPoints}
          ></TextField>
          <TextField
            label="Name"
            LabelTextProps={{ style: $textFieldLabel }}
            inputWrapperStyle={$textField}
            value={formStore.getName}
            onChangeText={formStore.setName}
          ></TextField>
          <Button style={$buttonStyles} preset="filled">
            Submit
          </Button>
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#34373b",
}
const $view: ViewStyle = {
  width: "90%",
  alignSelf: "center",
}
const $form: ViewStyle = {
  width: "40%",
  alignSelf: "center",
}

// const $chart: ViewStyle = {
//   backgroundColor: "black",
// }

const $textField: ViewStyle = {
  backgroundColor: "white",
  borderColor: "black",
}

const $textFieldLabel: TextStyle = {
  color: "white",
}

const $buttonStyles: ViewStyle = {
  marginTop: 10,
  backgroundColor: "white",
  borderRadius: 10,
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

const $card: ViewStyle = {
  width: "80%",
  alignSelf: "center",
  height: 150,
  backgroundColor: "#232422",
  borderRadius: 30,
  borderColor: "#34373b",
  marginBottom: 20,
  flexDirection: "row",
}

// const $cardContent: ThemedStyle<TextStyle> = () => ({
//   color: "white",
// })

// const $cardRightComponent: ViewStyle = {
//   height: 100,
//   borderRadius: 30,
//   backgroundColor: "black",
// }
const $cardPoints: ThemedStyle<TextStyle> = () => ({
  color: "white",
  alignSelf: "center",
  paddingRight: 30,
})

const $subHeading: ThemedStyle<TextStyle> = () => ({
  color: "white",
  textDecorationLine: "underline",
  marginBottom: 20,
  padding: 20,
})
