import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { BotonCalculator } from "../components/BotonCalculator";
import { styles } from "../theme/appTheme";

enum Operators {
  add, sub, mul, spl
}

export const CalculatorScreen = () => {

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
    
      default:
        break;
    }

    setNumberBefore('0');

  }

  return (
    <View style={ styles.calculadoraContainer }>
      { numberBefore !== '0'  && (
        <Text style={ styles.resultadoPequeno }>{ numberBefore }</Text>
      )}
        <Text 
          style={ styles.resultado }
          numberOfLines={ 1 }
          adjustsFontSizeToFit
        >
          { number }
        </Text>
        <View style={ styles.fila }>
          <BotonCalculator texto="C" color="#9B9B9B" accion={ clean } />
          <BotonCalculator texto="+/-" color="#9B9B9B" accion={ positiveNegative }/>
          <BotonCalculator texto="del" color="#9B9B9B"  accion={ btnDel }/>
          <BotonCalculator texto="/" color="#FF9427"  accion={ btnSpl }/>
        </View>

        <View style={ styles.fila }>
          <BotonCalculator texto="7"  accion={ createNumber }/>
          <BotonCalculator texto="8"  accion={ createNumber }/>
          <BotonCalculator texto="9"  accion={ createNumber }/>
          <BotonCalculator texto="X" color="#FF9427" accion={ btnMul }/>
        </View>
        
        <View style={ styles.fila }>
          <BotonCalculator texto="4"  accion={ createNumber }/>
          <BotonCalculator texto="5"  accion={ createNumber }/>
          <BotonCalculator texto="6"  accion={ createNumber }/>
          <BotonCalculator texto="-" color="#FF9427" accion={ btnSub }/>
        </View>

        <View style={ styles.fila }>
          <BotonCalculator texto="1"  accion={ createNumber }/>
          <BotonCalculator texto="2"  accion={ createNumber }/>
          <BotonCalculator texto="3"  accion={ createNumber }/>
          <BotonCalculator texto="+" color="#FF9427" accion={ btnAdd }/>
        </View>

        <View style={ styles.fila }>
          <BotonCalculator texto="0" accion={ createNumber } ancho/>
          <BotonCalculator texto="."  accion={ createNumber }/>
          <BotonCalculator texto="=" color="#FF9427"  accion={ result }/>
        </View>
    </View>
  )
}