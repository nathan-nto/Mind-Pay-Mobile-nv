import React, { useState, useCallback, forwardRef } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import Input from '../Input';

const InputMask = ({ type,rawText,setRawText,defaultValue, ...rest }, inputRef) => {
  const [text, setText] = useState('');
  // const [rawText, setRawText] = useState('');

  const handleChangeText = useCallback((maskedText, unmaskedText) => {
    setText(maskedText);
    setRawText(unmaskedText);
  }, [text]);
  return (
    <>
      <TextInputMask
        type={type}
        includeRawValueInChangeText
        value={text}
        defaultValue={defaultValue}
        customTextInput={Input}
        customTextInputProps={{
          ref: inputRef,
          rawText,
          onInitialData: setText,
        }}
        {...rest}
        onChangeText={handleChangeText}
      />
    </>
  );
};
export default forwardRef(InputMask);