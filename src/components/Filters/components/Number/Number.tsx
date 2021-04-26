import React, { useState } from 'react';
import styled from 'styled-components';

import { StyledInput } from '../Input/Input';
import { Error } from '../../../forms/Message';
import { validateNumber } from '../../helpers';
import { NumberPropTypes, NumberProps } from './Number.types';

export const StyledNumber = styled(StyledInput)`
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
  appearance: textfield;
`;

const Number: React.FC<NumberProps> = ({
  value = '',
  onChange,
  min,
  max,
  placeholder = 'Number',
  patternMessage = 'Use only numbers',
  onError,
}) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const handleOnChange = (event) => {
    onChange(event);
    const error = !validateNumber(event.target.value, min, max);
    setIsInvalid(error);
    onError(error);
  };

  return (
    <>
      <StyledNumber
        placeholder={placeholder}
        step="any"
        type="number"
        value={value}
        onChange={handleOnChange}
        onKeyPress={handleKeyPress}
      />
      {isInvalid && <Error>{patternMessage}</Error>}
    </>
  );
};

export default Number;

Number.propTypes = NumberPropTypes;
