import React, { useState } from 'react';

import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import services from '../../services/services';
import { useAuth } from '../../context/auth';

const EditarEvento = ({ route, navigation }) => {

  const id = route.params.item.id; 
  
  const { user, token } = useAuth();
  
  console.log(token)
  const [nomeEvento, setNomeEvento] = useState(route.params.item.name);
  const [descricaoEvento, setDescricaoEvento] = useState(route.params.item.description);
  const [valorEvento, setValorEvento] = useState(route.params.item.ticketPrice);
  const [dataInicial, setDataInicial] = useState(new Date());  

  const updateConcert = async () => {
    if (nomeEvento && descricaoEvento && valorEvento && dataInicial) {
      const data = {
        id,
        nomeEvento,
        descricaoEvento,
        valorEvento,
        dataInicial
      }      
      await services.updateConcerts(data, token);
    } else {
      console.log('Vazio');
    }
    Keyboard.dismiss();
    navigation.goBack();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={true} />
      <KeyboardAvoidingView style={css.container}>
        <Text style={css.tittle}>Editar Evento</Text>

        <TextInput
          style={css.input}
          placeholder="Evento"
          autoCorrect={false}
          value={nomeEvento}
          onChangeText={item => {
            setNomeEvento(item);
          }}
        />
        <DatePicker
          format="DD/MM/YYYY"
          style={css.dateComponente}
          date={dataInicial}
          onDateChange={date => setDataInicial(date)}
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          mode="date"
          placeholder="Selecione uma data"
          customStyles={{
            dateInput: {
              borderWidth: 0,
            },
          }}
        />
        <TextInput
          style={css.input}
          keyboardType="numeric"
          placeholder="Valor"
          autoCorrect={false}
          value={valorEvento}
          onChangeText={item => {
            setValorEvento(item);
          }}
        />

        <TextInput
          style={css.description}
          placeholder="Descrição"
          multiline={true}
          autoCorrect={false}
          value={descricaoEvento}
          onChangeText={item => {
            setDescricaoEvento(item);
          }}
        />

        <TouchableOpacity style={css.button} onPress={() => updateConcert()}>
          {/* 
          style={css.button}
          onPress={() => navigation.goBack()}>   */}
          <Text style={css.buttonText}>Editar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};


const css = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  button: {
    borderWidth: 2,
    borderRadius: 21,
    borderColor: '#FF7306',
    width: '70%',
    height: 45,
    backgroundColor: '#FF6400',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 9.5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 3,
    fontSize: 21,
    fontFamily: 'Nunito-Black',
  },
  input: {
    alignSelf: 'center',
    backgroundColor: '#FFF',
    color: 'black',
    opacity: 0.95,
    width: '90%',
    height: 40,
    borderRadius: 21,
    borderColor: '#000',
    padding: 10,
    marginTop: 15,
    fontSize: 15,
    fontFamily: 'Nunito-Regular',
    elevation: 9.5,
  },
  description: {
    alignSelf: 'center',
    backgroundColor: '#FFF',
    color: 'black',
    opacity: 0.95,
    width: '90%',
    height: 70,
    borderRadius: 21,
    borderColor: '#000',
    padding: 10,
    marginTop: 15,
    fontSize: 15,
    fontFamily: 'Nunito-Regular',
    elevation: 9.5,
  },
  dateComponente: {
    fontSize: 15,
    fontFamily: 'Nunito-Regular',
    width: '90%',
    opacity: 0.95,
    height: 40,
    borderRadius: 21,
    borderColor: '#000',
    paddingRight: 15,
    marginTop: 15,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    elevation: 9.5,
  },
  tittle: {
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Nunito-Bold',
    fontSize: 21,
    elevation: 10,
  },
});

export default EditarEvento;
