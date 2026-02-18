import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

const InputFields = ({
    placeholder = "",
    value,
    title ="",
    handleChangeText,
    className = "",
    type = '',
    otherStyles,
    ...props 
}) => {
  useState[form, setForm] = useState({
    
  })
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base '>{title}</Text>

      <TextInput
        className='flex-1 text-black text-base'
        value={value}
        placeholder={placeholder}
        onChangeText={handleChangeText}
        
      />

    </View>
  )
}

export default InputFields