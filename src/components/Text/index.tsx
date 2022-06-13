import React from 'react'
import { TextBaseProps, useTextProps } from '@rn-base/element'
import { Text as RNText } from 'react-native'

type TextProps = Omit<TextBaseProps, 'size'>

const Text: React.FC<TextProps> = props => {
  const p = useTextProps({ ...props, size: 14 })
  return <RNText {...p} />
}

export default Text
