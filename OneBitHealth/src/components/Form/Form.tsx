import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import ResultImc from "./ResultImc/ResultImc";
import { styles } from "./SForm";

export default function Form() {

  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [messageImc, setMessageImc] = useState("preencha o peso e altura");
  const [imc, setImc] = useState("")
  const [value, setValue] = useState("")

  function imcCalculator() {

    const heightNumber = Number(height.replace(",", "."))
    const weightNumber = Number(weight.replace(",", "."))
    console.log(height)
    console.log(weight)
    console.log(heightNumber)
    console.log(weightNumber)

    if (heightNumber <= 0 || weightNumber <= 0) return;
    const result = weightNumber / (heightNumber * heightNumber)
    console.log(result)
    setImc(result.toFixed(2))
  }

  function validationImc() {
    if (weight != "" && height != "") {
      imcCalculator()
      setHeight("")
      setWeight("")
      setMessageImc("Seu imc é igual:")
      finalImc()
      return
    }
    setImc("")
    setMessageImc("preencha peso e altura")

  }


  function finalImc() {
     const result = Number(imc)

    if (result < 18.5){
      setValue("Abaixo do Peso")
    }
    if (result > 18.5 && result < 25){
      setValue("Peso Normal")
    }
    if (result > 25 && result < 30){
      setValue("Sobrepeso")
    }
    else{
      setValue("Obesidade")
    };
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.texto}>Altura</Text>
        <TextInput style={styles.input}
          onChangeText={setHeight}
          value={height}
          placeholder="Ex 1.75"
          keyboardType="numeric" />

        <Text style={styles.texto}>Peso</Text>

        <TextInput style={styles.input}
          onChangeText={setWeight}
          value={weight}
          placeholder="Ex 80kg"
          keyboardType="numeric" />
        <TouchableOpacity
          style={styles.button}
          onPress={validationImc}
        >
          <Text style={styles.textButton}>Calcular</Text>
        </TouchableOpacity>
      </View>
      <ResultImc messageResultImc={messageImc} ResultImc={imc} />
      <Text>{value}</Text>
    </View>
  );
}
