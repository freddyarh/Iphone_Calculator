import { useRef, useState } from 'react';

enum Operators {
    add, sub, mul, spl
}

export const useCalculator = () => {

    const [number, setNumber] = useState('100');
    const [numberBefore, setNumberBefore] = useState('0');
  
    const lastOperation = useRef<Operators>();
  
    const clean = () => {
      setNumber('0');
      setNumberBefore('0');
    }
  
    const createNumber = ( numberText: string ) => {
  
      if( number.includes('.') && numberText === '.' ) return;
  
          if ( number.startsWith('0') || number.startsWith('-0') ) {
  
              // Punto decimal
              if ( numberText === '.' ) {
                  setNumber( number + numberText );
  
                  // Evaluar si es otro cero, y hay un punto
              } else if( numberText === '0' && number.includes('.')  ) {
                  setNumber( number + numberText );
  
                  // Evaluar si es diferente de cero y no tiene un punto
              } else if( numberText !== '0' && !number.includes('.') ) {
                  setNumber( numberText );
  
                  // Evitar 0000.0
              } else if( numberText === '0' && !number.includes('.') ) {
                  setNumber( number );
              } else {
                  setNumber( number + numberText ); 
              }
  
          } else {
              setNumber( number + numberText );
          }
    }
  
    const positiveNegative = () => {
      if ( number.includes('-') ) {
        setNumber( number.replace('-', '') );
      } else {
          setNumber( '-' + number );
      }
    }
  
    const btnDel = () => {
  
      if( number.length === 1 || (number.length === 2 && number.includes('-')) ){
        setNumber( '0' );
      }else{
        setNumber( number.slice( 0,  -1) )
      }
    }
  
    const changeNumtoBefore = () => {
      if( number.endsWith('.') ){
        setNumber( number.slice(0, -1) );
      }else{
        setNumberBefore( number );
      }
  
      setNumber( '0' );
    }
  
    const btnAdd = () => {
      changeNumtoBefore();
      lastOperation.current = Operators.add;
      console.log(lastOperation.current)
    }
    const btnSub = () => {
      changeNumtoBefore();
      lastOperation.current = Operators.sub;
    }
    const btnMul = () => {
      changeNumtoBefore();
      lastOperation.current = Operators.mul;
    }
    const btnSpl = () => {
      changeNumtoBefore();
      lastOperation.current = Operators.spl;
    }
  
    const result = () => {
  
      const num1 = Number(number);
      const num2 = Number(numberBefore);
  
      switch ( lastOperation.current ) {
        case Operators.add:
            setNumber(`${num2 + num1}`);
          break;
        case Operators.sub:
            setNumber(`${num2 - num1}`);
          break;
        case Operators.mul:
            setNumber(`${num2 * num1}`);
          break;
        case Operators.spl:
            setNumber(`${num2 / num1}`);
          break;
      }
  
      setNumberBefore('0');
  
    }

    return {
        number,
        numberBefore,
        clean,
        positiveNegative,
        btnDel,
        btnSpl,
        createNumber,
        btnMul,
        btnSub,
        btnAdd,
        result,
    }
}
