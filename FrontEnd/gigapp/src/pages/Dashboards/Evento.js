import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/auth';

import services from '../../services/services';

const Evento = ({ navigation }) => {

  // falta puxar as funções

  // Constantes que pegam os campos
  // const [idEvento, setIdEvento] = useState("");
  // const [tituloEvento, setTituloEvento] = useState("");
  // const [estabelecimentoEvento, setEstabelecimentoEvento] = useState("");
  // const [dataEvento, setDataEvento] = useState("");
  // const [descricaoEvento, setDescricaoEvento] = useState("");
  // const [banda1Evento, setBanda1Evento] = useState("");
  // const [banda2Evento, setBanda2Evento] = useState("");  

  // Post
  // const criarEvento = async () => {
  //   if (idEvento && tituloEvento && estabelecimentoEvento && dataEvento && descricaoEvento && banda1Evento && banda2Evento) {
  //     try { //falta vincular rota com backend e 
  //       const response = await api.post('/rota', { "tituloEvento": tituloEvento, "estabelecimentoEvento": estabelecimentoEvento, "dataEvento": dataEvento, "descricaoEvento": descricaoEvento, "banda1Evento": banda1Evento, "banda2Evento": banda2Evento })
  //       console.log(JSON.stringify(response.data))
  //     } catch (error) {
  //       console.log("DEU ERRO" + error)
  //     }
  //   }
  // }

  // Get
  // const [lista, setLista] = useState();

  // const listarEvento = async () => {
  //   try { //Falta rota
  //     const response = await api.get('/rota');
  //     console.log(JSON.stringify(response.data));
  //     setListas(response.data);

  //   } catch (error) {
  //     console.log('DEU RUIM' + error);
  //   }
  // }

  // // Put
  // const id = route.params._id; // puxar esse id quando criarmos o botão
  // const editarEvento = async (id) => {
  //   try { // ajustar rota 
  //     const response = await api.put(`/rota/${id}`, { "tituloEvento": tituloEvento, "estabelecimentoEvento": estabelecimentoEvento, "dataEvento": dataEvento, "descricaoEvento": descricaoEvento, "banda1Evento": banda1Evento, "banda2Evento": banda2Evento });
  //     console.log(JSON.stringify(response.data));
  //     setListas(response.data)

  //   } catch (error) {
  //     console.log('DEU RUIM' + error);
  //   }
  // }

  // // Delete
  // const deletarEvento = async (id) => {
  //   try { // ajustar rota
  //     const response = await api.delete(`/rota/${id}`)
  //     console.log(JSON.stringify(response.data));

  //   } catch (error) {
  //     console.log('DEU RUIM' + error);
  //   }
  //   listarEvento();
  // };

  const [concerts, setConcerts] = useState([]);
  const { user, token } = useAuth();

  async function handleDelete(id, token) {
    console.log(id);
    try {
      await services.deleteConcerts(id, token)

    } catch (error) {
      console.log('deu ruim ', error);
    }    
  }

  useEffect(async () => {
    const concerts = await services.getConcerts();
    setConcerts(concerts);

  }, [concerts]);

  if (!user.provider) {
    const EventoBanda = ({ item }) => {

      return (
        <View>
          <View style={css.icons}>
            <View style={css.iconMaps2}>
              <Icon
                name={'locate'}
                size={16}
                color={'#FF6400'}
                onPress={() => navigation.navigate('Maps')}
              />
            </View>
          </View>
          <View style={css.card}>
            <View style={css.content}>
              <View style={css.rows}>
                <Text style={css.label}>Evento: </Text>
                <Text style={css.tittle}>{item.name}</Text>
              </View>
              <View style={css.rows}>
                <Text style={css.label}>Estabelecimento: </Text>
                <Text
                  multimultiline={true}
                  numberOfLines={2}
                  style={css.tittle}>
                  {/* {item.estabelecimento} */}
                </Text>
              </View>
              <View style={css.rows}>
                <Text style={css.label}>Data: </Text>
                <Text style={css.description}>{item.date}</Text>
              </View>
              <View style={css.rows}>
                <Text style={css.label}>Descrição: </Text>
                <Text
                  style={css.description}
                  multimultiline={true}
                  numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <View style={css.rows}>
                <Text style={css.label}>Entrada: </Text>
                <Text style={css.tittle}>{item.ticketPrice}</Text>
              </View>
              <View style={css.rows}>
                <Text style={css.label}>Bandas: </Text>
                <Text
                  multimultiline={true}
                  numberOfLines={2}
                  style={css.description}>
                  {/* {item.banda1}, {item.banda2} */}
                </Text>
              </View>
            </View>
            <View style={css.buttons}>
              {/* <TouchableOpacity
                style={css.button}
                onPress={() => navigation.navigate('SelecaoBanda')}>
                <Text style={css.buttonText}>Candidatar-se</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={css.button}
                onPress={() => navigation.navigate('Avaliacao')}>
                <Text style={css.buttonText}>Avaliar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };
    return (
      <View style={css.containerList}>
        <Text style={css.title}>Seus eventos</Text>
        <View style={css.scroll}>
          <FlatList
            removeClippedSubviews={false}
            keyExtractor={(item) => item.id}
            data={concerts}
            renderItem={EventoBanda}

          />
        </View>
      </View>
    );
  }
  if (user.provider) {
    const EventoEstabelecimento = ({ item }) => {

      return (
        <View>
          <View style={css.icons}>
            <View style={css.iconMaps}>
              <Icon
                name={'locate'}
                size={16}
                color={'#FF6400'}
                onPress={() => navigation.navigate('Maps')}
              />
            </View>
            <View style={css.iconEdit}>
              <Icon
                name={'pencil-outline'}
                size={16}
                color={'#FF6400'}
                onPress={() => navigation.navigate('EditarEvento')}
              />
            </View>
            <View style={css.iconDelete}>
              <Icon
                name={'trash-bin'}
                size={16}
                color={'#FF6400'}
                onPress={() => handleDelete(item.id, token)}
              />
            </View>
          </View>
          <View style={css.card}>
            <View style={css.content}>
              <View style={css.rows}>
                <Text style={css.label}>Evento: </Text>
                <Text style={css.tittle}>{item.name}</Text>
              </View>
              <View style={css.rows}>
                <Text style={css.label}>Estabelecimento: </Text>
                <Text
                  multimultiline={true}
                  numberOfLines={2}
                  style={css.tittle}>
                  {item.id}
                </Text>
              </View>
              <View style={css.rows}>
                <Text style={css.label}>Data: </Text>
                <Text style={css.description}>{item.date}</Text>
              </View>
              <View style={css.rows}>
                <Text style={css.label}>Descrição: </Text>
                <Text
                  style={css.description}
                  multimultiline={true}
                  numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <View style={css.rows}>
                <Text style={css.label}>Entrada: </Text>
                <Text style={css.tittle}>{item.ticketPrice}</Text>
              </View>
              <View style={css.rows}>
                <Text style={css.label}>Bandas: </Text>
                <Text
                  multimultiline={true}
                  numberOfLines={2}
                  style={css.description}>
                  {item.name}
                </Text>
              </View>
            </View>
            <View style={css.buttons}>
              <TouchableOpacity
                style={css.button}
                onPress={() => navigation.navigate('SelecaoBanda')}>
                <Text style={css.buttonText}>Selecionar bandas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={css.button}
                onPress={() => navigation.navigate('AvaliacaoBanda')}>
                <Text style={css.buttonText}>Avaliar bandas</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };
    return (
      <View style={css.containerList}>
        <Text style={css.title}>Seus eventos</Text>
        <View style={css.scroll}>
          <FlatList
            removeClippedSubviews={false}
            keyExtractor={item => item.id}
            data={concerts}
            renderItem={EventoEstabelecimento}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <View style={css.error}>
          <ActivityIndicator size="large" color="#FF7306" />
        </View>
      </View>
    );
  }
};

const css = StyleSheet.create({
  container: {
    marginTop: 100,
    width: '100%',
    height: '100%',
  },
  title: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'Nunito-Bold',
    fontSize: 21,
    elevation: 7.5,
  },
  card: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 15,
    width: '90%',
    elevation: 7.5,
    borderRadius: 7.5,
  },
  content: {
    padding: 10,
    paddingBottom: 0,
  },
  label: {
    fontFamily: 'Nunito-Black',
    paddingRight: 5,
  },
  tittle: {
    fontFamily: 'Nunito-Regular',
    paddingRight: 65,
  },
  description: {
    fontFamily: 'Nunito-Regular',
    paddingRight: 65,
  },
  button: {
    borderWidth: 2,
    borderRadius: 21,
    borderColor: '#FF7306',
    width: '40%',
    height: 25,
    backgroundColor: '#FF6400',
    alignSelf: 'center',
    margin: 10,
    marginTop: 2.5,
    elevation: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 13,
    fontFamily: 'Nunito-Black',
  },
  buttons: {
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  iconMaps: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 4.5,
    padding: 4,
    paddingLeft: 4,
    elevation: 7.5,
    marginRight: '1%',
  },
  iconMaps2: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 4.5,
    padding: 4,
    paddingLeft: 4,
    elevation: 7.5,
    marginRight: '5%',
  },
  iconEdit: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 4.5,
    padding: 2.5,
    paddingLeft: 4,
    elevation: 7.5,
    marginRight: '1%',
  },
  iconDelete: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 4.5,
    padding: 2.5,
    paddingLeft: 3,
    paddingRight: 3,
    elevation: 7.5,
    marginRight: '5%',
  },
  rows: {
    display: 'flex',
    flexDirection: 'row',
  },
  scroll: {
    height: 460,
    width: '97%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 9.5,
    borderColor: '#E1E1E1',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  containerList: {
    width: '100%',
    height: '100%',
  },
  scroll: {
    height: '90%',
    width: '100%',
  },
  error: {
    marginTop: '70%',
    textAlign: 'center',
  },
});

export default Evento;
