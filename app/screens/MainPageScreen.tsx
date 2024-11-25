import { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "@/navigators"
import { Card, ListView, Screen, Text } from "@/components"
import { User, useStores } from "@/models"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"
import { delay } from "@/utils/delay"
import { ContentStyle } from "@shopify/flash-list"

import { isRTL } from "@/i18n"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface MainPageScreenProps extends AppStackScreenProps<"MainPage"> {}

export const MainPageScreen: FC<MainPageScreenProps> = observer(function MainPageScreen(_props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const { navigation } = _props
  const { userStore } = useStores()
  const { themed } = useAppTheme()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await userStore.getUsers()
      console.log()
      setIsLoading(false)
    })()
  }, [userStore])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([userStore.getUsers(), delay(750)])
    setRefreshing(false)
  }

  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top", "left"]}>
      <Text
        style={themed($linkToSecondPage)}
        text="Go to second page"
        onPress={() => navigation.push("SecondPage")}
      />
      <Text preset="default" tx="mainPage:feePaid" />
      <Text preset="default">{userStore.totalFee}</Text>
      <ListView<User>
        contentContainerStyle={themed([$listContentContainer])}
        estimatedItemSize={400}
        data={userStore.userList}
        onRefresh={manualRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Card
            heading={item.name}
            content={item.name + " " + item.lastname + "  Age: " + item.age}
            style={
              item.age < 30
                ? themed($youngUser)
                : item.age < 50
                  ? themed($midUser)
                  : themed($oldUser)
            }
          />
        )}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $youngUser: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "grey",
})

const $midUser: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "red",
})

const $oldUser: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "blue",
})

const $listContentContainer: ThemedStyle<ContentStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
})

const $linkToSecondPage: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.lg,
  alignSelf: isRTL ? "flex-start" : "flex-end",
})
