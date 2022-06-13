import React from 'react'
import { Box } from '@rn-base/element'
import { StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Text } from '@components'

import Animated, { interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { deg, r, rCard } from './defines'

const BoxAnimated = Animated.createAnimatedComponent(Box)

type CardProps = {
  id: number
  progress: Animated.SharedValue<number>
  velocity: Animated.SharedValue<number>
}

const Card: React.FC<CardProps> = ({ id, progress, velocity }) => {
  const a = useDerivedValue(() => {
    return interpolate(
      progress.value / deg,
      [-(id - 2) - 0.001, -(id - 2), -id, -(id + 2), -(id + 2) + 0.0001].reverse(),
      [0, 0, (-card_size.height * 1) / 2, 0, 0]
    )
  })
  const mVelocity = useDerivedValue(() => {
    const velocityAbs = Math.abs(velocity.value)
    return (
      (interpolate(
        progress.value / deg,
        [
          -id - 4 - 0.001,
          -id - 4,
          -id - 3,
          -id - 2,
          -id - 1,
          -id - 0.05,
          -id,
          -id + 0.05,
          -id + 0.35,
          -id + 1,
          -id + 2,
          -id + 3,
          -id + 4,
          -id + 45 + 0.0001,
        ],
        [
          0, // -4-1
          0, // -4
          interpolate(velocityAbs, [0, 0.5, 1, 2], [0, 0.4, 0.7, 0]), // -3
          interpolate(velocityAbs, [0, 0.5, 1, 2], [0, 1.1, 2, 0]), // -2
          interpolate(velocityAbs, [0, 0.5, 1, 2], [0, 1.6, 1.8, 0]), // -1
          interpolate(velocityAbs, [0, 0.5, 1, 2], [0, 2, 1.8, 1.9]), // 0 - 0.05
          interpolate(velocityAbs, [0, 0.5, 1, 2], [2, 2, 1.8, 2]), // 0
          interpolate(velocityAbs, [0, 0.5, 1, 2], [0, 2, 1.7, 1.9]), // 0 + 0.05
          interpolate(velocityAbs, [0, 0.5, 0.5001, 1, 2], [2, 0, 0, 1.6, 1.8]), // 0+0.35
          interpolate(velocityAbs, [0, 0.5, 1, 2], [0, 0, 1.2, 0]), // +1
          interpolate(velocityAbs, [0, 0.5, 1, 2], [0, 0, 1, 0]), // +2
          interpolate(velocityAbs, [0, 0.5, 1, 2], [0, 0, 0.8, 0]), // +3
          0, // +4
          0, // +4 +1
        ]
      ) *
        -card_size.height) /
      4
    )
  })
  const style = useAnimatedStyle(() => {
    const minDeg = Math.min(Math.max(id * deg + progress.value, -11 * deg), 11 * deg)
    const alpha = (minDeg * Math.PI) / 3 / 60
    const translateX = r * Math.sin(alpha)
    const translateY = (1 - Math.cos(alpha)) * r + mVelocity.value

    return {
      transform: [{ translateY }, { translateX }, { rotateZ: `${minDeg}deg` }],
    }
  })

  return (
    <BoxAnimated position="absolute" style={style} padding={2} color="#fff" radius={5}>
      <FastImage style={styles.image} source={require('@assets/tarot.png')} />
      <Text position="absolute" color="#fff">
        {id}
      </Text>
    </BoxAnimated>
  )
}

export default Card
const card_size = {
  width: rCard * 2,
  height: (rCard / 15) * 29 * 2,
}

const styles = StyleSheet.create({
  image: {
    // aspectRatio: 15 / 29,
    width: card_size.width,
    height: card_size.height,
    borderRadius: 5,
  },
})
