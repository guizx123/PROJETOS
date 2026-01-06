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
  
  const handleHeight = (text: string) => {
    const cleaned = text.replace(/[^0-9,.]/g, "");
    setHeight(cleaned);
  };
  const handleWeight = (text:string) => {
    const cleaned = text.replace(/[^0-9,.]/g, ""); 
    setWeight(cleaned);
  };

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

    let classification = ""

    if (result < 18.5) {
      classification = "Abaixo do peso"
    } else if (result < 25) {
      classification = "Peso normal"
    } else if (result < 30) {
      classification = "Sobrepeso"
    } else {
      classification = "Obesidade"
    }

    setImc(result.toFixed(2))
    setValue(classification)
  }

  function validationImc() {
    if (weight != "" && height != "") {
      imcCalculator()
      setMessageImc("Seu imc é igual:")
      setHeight("")
      setWeight("")
      return
    }
    setImc("")
    setValue("")
    setMessageImc("preencha peso e altura")

  }



  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.texto}>Altura</Text>
        <TextInput style={styles.input}
          onChangeText={handleHeight}
          value={height}
          placeholder="Ex 1.75"
          keyboardType="numeric" />

        <Text style={styles.texto}>Peso</Text>

        <TextInput style={styles.input}
          onChangeText={(handleWeight)}
          value={weight}
          placeholder="Ex 80kg"
          keyboardType="numeric"
          inputMode="numeric" />
        <TouchableOpacity
          style={styles.button}
          onPress={validationImc}
        >
          <Text style={styles.textButton}>Calcular</Text>
        </TouchableOpacity>
      </View>
      <ResultImc messageResultImc={messageImc} ResultImc={imc} value={value} />
    </View>
  );
}
