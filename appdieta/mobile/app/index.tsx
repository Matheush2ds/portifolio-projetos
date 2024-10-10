import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo-dietaia.png')}
      />

      <Text style={styles.title}>
        Dieta<Text style={{ color: colors.white }}>.IA</Text>
      </Text>

      <Text style={styles.text}>
        Sua dieta com Inteligência Artificial
      </Text>

      <Link href= "/step" asChild>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}> Gerar Dieta</Text>
      </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.orange,
  },

  text: {
    fontSize: 16,
    color: colors.white,
    width: 240,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8
  },

  button: {
    backgroundColor: colors.orange,
    width: '100%',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35
  },

  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
