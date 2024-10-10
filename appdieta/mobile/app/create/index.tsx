import { Header } from '@/components/header';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { z } from 'zod';
import { Select } from '../../components/input/select';
import { colors } from '../../constants/colors';

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatório" }),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const genderOptions = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
    { label: "Outro", value: "outro" },
  ];

  return (
    <View style={styles.container}>
      <Header
        step="Passo 2"
        title="Finalizando dieta"
      />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo</Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione o seu sexo"
          error={errors.gender?.message}
          options={genderOptions}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});