
import React, { useEffect, useRef, useState, useCallback, useImperativeHandle } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useField } from '@unform/core'
import { Container, TextInput, Icon } from './styles';

export default function Input({ name, onChangeText, icon, senha,editable,desc,onInitialData,rawText, ...rest }, ref) {
  const inputRef = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)
  const [pass, setPass] = useState(senha || false)

  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if (inputRef.current.value) {
      setIsField(true);
    } else {
      setIsField(false);
    }
  }, []);

  useEffect(() => {
    if (onInitialData) onInitialData(defaultValue);
  }, [defaultValue, onInitialData]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      getValue() {
        if (rawText) return rawText;
        if (inputRef.current) return inputRef.current.value;
        return '';
      },
      setValue(ref, value) {
        if (ref) {
          ref.setNativeProps({ text: value, fontFamily: 'Poppins_300Light' });
          inputRef.current.value = value;
        }

      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName,rawText, registerField])

  useEffect(() => {

    inputRef.current.value = defaultValue;

  }, [defaultValue]);


  const handleSecure = useCallback(() => {
    setPass(!pass)
  },[pass])

  return (
    <>
      <Container isFocused={isFocused} isErrored={!!error} editable={editable} desc={desc}>
        {icon && <Icon editable={editable} name={icon} size={20} isFocused={isFocused} isField={isField} />}
        <TextInput
          {...rest}
          ref={inputRef}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          secureTextEntry={pass}
          editable={editable}
          selectionColor="#fff"
          onChangeText={(value) => {
            if (inputRef.current) {
              inputRef.current.value = value;
            }
            if (onChangeText) onChangeText(value);
          }}
        />
        {senha &&
          <TouchableOpacity onPress={handleSecure}>
           { !pass && <Icon name="eye" size={20} color={'#666360'} />}
           { pass && <Icon name="eye-off" size={20} color={'#666360'} />}

          </TouchableOpacity>
        }
      </Container>

      { error && <Text style={{ color: '#fff', fontFamily: 'Montserrat_100Thin' }}>{error}</Text>}
    </>
  )
}