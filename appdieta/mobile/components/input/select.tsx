import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { colors } from '../../constants/colors';

const schema = z.object({
    gender: z.string().min(1, { message: "O sexo é obrigatório" }),
    objective: z.string().min(1, { message: "O objetivo é obrigatório" }),
    level: z.string().min(1, { message: "Selecione seu nível" }),
});

type FormData = z.infer<typeof schema>;

interface OptionsProps {
    label: string;
    value: string | number;
}

interface SelectProps {
    name: string;
    control: any;
    placeholder?: string;
    error?: string;
    options: OptionsProps[];
}

export function Select({ name, control, placeholder, error, options }: SelectProps) {
    const [isDropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar se o dropdown está aberto

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <>
                        <TouchableOpacity onPress={() => setDropdownOpen(!isDropdownOpen)}>
                            <Text style={styles.input}>
                                {value ? options.find(option => option.value === value)?.label : placeholder || 'Selecione algo'}
                            </Text>
                        </TouchableOpacity>

                        {}
                        {isDropdownOpen && (
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.value.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity 
                                        onPress={() => {
                                            onChange(item.value);
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        <Text>{item.label}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </>
                )}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    input: {
        height: 44,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        borderRadius: 4,
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        marginTop: 4,
    },
});
