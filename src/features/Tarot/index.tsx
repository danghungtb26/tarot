import React from 'react'
import { Box } from '@rn-base/element'
import { sizes } from '@configs'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Card from './Card'
import { deg } from './defines'

const cards = Array.from({ length: 60 }).map((_, i) => i - 10)

type TarotScreenProps = {}

const maxMin = (value: number, max?: number, min?: number) => {
  'worklet'

  return Math.max(Math.min(value, max ?? 10 * deg), min ?? -49 * deg)
}

const TarotScreen: React.FC<TarotScreenProps> = () => {
  const position = useSharedValue<number>(0)
  const progress = useSharedValue<number>(0)
  const velocity = useSharedValue<number>(0)

  const panGesture = Gesture.Pan()
    .onStart(e => {
      position.value = progress.value
      velocity.value = withTiming(maxMin(e.velocityX / 750, 1.8, -1.8), { duration: 5000 })
    })
    .onUpdate(e => {
      if (e.velocityX > 400 || e.velocityX < -400) return
      progress.value = maxMin(position.value + e.translationX)
    })
    .onEnd(e => {
      const { velocityX } = e
      const nextPosition =
        Math.ceil(maxMin(progress.value + maxMin(velocityX, 1000, -1000) * 0.2) / deg) * deg
      velocity.value = withSpring(2)
      progress.value = withSpring(nextPosition)
    })

  return (
    <Box flex={1} center middle>
      <GestureDetector gesture={panGesture}>
        <Box width="100%" height={sizes.width} center color="red">
          {cards.map(i => {
            return <Card velocity={velocity} progress={progress} key={i} id={i} />
          })}
        </Box>
      </GestureDetector>
    </Box>
  )
}

export default TarotScreen
