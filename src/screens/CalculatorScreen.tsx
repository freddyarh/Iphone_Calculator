
import { Text, View } from "react-native";
import { BotonCalculator } from "../components/BotonCalculator";
import { styles } from "../theme/appTheme";
import { useCalculator } from "../hooks/useCalculator";

export const CalculatorScreen = () => {

  const {
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
  } = useCalculator();

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