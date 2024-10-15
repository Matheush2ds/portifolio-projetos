import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../constants/colors';
import { useDataStore } from '../../store/data';

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatório" }),
  objective: z.string().min(1, { message: "O objetivo é obrigatório" }),
  level: z.string().min(1, { message: "Selecione seu nível" }),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
  const router = useRouter(); 
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setPageTwo = useDataStore(state => state.setPageTwo);

  const genderOptions = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
  ];

  const levelOptions = [
    { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
    { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo' },
    { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo' },
    { label: 'Altamente ativo (exercícios 5 a 7 dias por semana)', value: 'Altamente ativo' },
  ];

  const objectiveOptions = [
    { label: 'Emagrecer', value: 'emagrecer' },
    { label: 'Hipertrofia', value: 'hipertrofia' },
    { label: 'Hipertrofia + Definição', value: 'hipertrofia e definição' },
    { label: 'Definição', value: 'definição' },
  ];

  function handleCreate(data: FormData) {
    setPageTwo({
      level: data.level,
      gender: data.gender,
      objective: data.objective,
    });

    router.push("/nutrition");
  }

  return (
    <View style={styles.container}>
      <Header
        step='Passo 2'
        title='Finalizando dieta'
      />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo:</Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione o seu sexo..."
          error={errors.gender?.message}
          options={genderOptions}
          accessibilityLabel="Selecione o seu sexo"
          accessibilityHint="Escolha entre masculino ou feminino"
        />

        <Text style={styles.label}>Selecione nível de atividade física:</Text>
        <Select
          control={control}
          name="level"
          placeholder="Selecione o nível de atividade física"
          error={errors.level?.message}
          options={levelOptions}
          accessibilityLabel="Selecione seu nível de atividade física"
          accessibilityHint="Escolha seu nível de atividade"
        />

        <Text style={styles.label}>Selecione seu objetivo:</Text>
        <Select
          control={control}
          name="objective"
          placeholder="Selecione seu objetivo"
          error={errors.objective?.message}
          options={objectiveOptions}
          accessibilityLabel="Selecione seu objetivo"
          accessibilityHint="Escolha seu objetivo fitness"
        />

        <Pressable
          style={styles.button}
          onPress={handleSubmit(handleCreate)}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
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
  button: {
    backgroundColor: colors.blue,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
});
