import { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Button, Card, Screen, Text, TextField } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useStores } from "@/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

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
      <View style={$links}>
        <Text
          style={themed($linkToThirdPage)}
          text="Go to second Page"
          onPress={() => navigation.pop()}
        />
        <Text
          style={themed($linkToMainPage)}
          text="Go to main page"
          onPress={() => navigation.push("MainPage")}
        />
      </View>
      <Card
        style={$card}
        heading={formStore.getName}
        headingStyle={themed($cardContent)}
        RightComponent={<Text style={themed($cardPoints)} text={formStore.getPoints}></Text>}
      ></Card>
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
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#34373b",
}

const $form: ViewStyle = {
  width: "40%",
  alignSelf: "center",
}

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
}

const $cardContent: ThemedStyle<TextStyle> = () => ({
  color: "white",
})

// const $cardRightComponent: ViewStyle = {
//   height: 100,
//   borderRadius: 30,
//   backgroundColor: "black",
// }
const $cardPoints: ThemedStyle<TextStyle> = () => ({
  color: "white",
  alignSelf: "center",
  paddingRight: 30,
  backgroundColor: "black",
})
