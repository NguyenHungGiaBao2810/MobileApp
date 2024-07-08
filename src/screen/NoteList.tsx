import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';

const Timesheet: React.FC = () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [timesheetEntries, setTimesheetEntries] = useState<any[]>([]);

  const onSubmit = (data: any) => {
    setTimesheetEntries([...timesheetEntries, data]);
    reset();
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.hours}</Text>
      <Text style={styles.cell}>{item.description}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
    behavior="padding"
    style={styles.container}>
      <FlatList
        data={timesheetEntries}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Ngày</Text>
            <Text style={styles.headerCell}>Số giờ</Text>
            <Text style={styles.headerCell}>Mô tả</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <Controller
          control={control}
          name="date"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Ngày"
            />
          )}
        />
        {errors.date && <Text style={styles.errorText}>Vui lòng nhập ngày.</Text>}

        <Controller
          control={control}
          name="hours"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Số giờ"
            />
          )}
        />
        {errors.hours && <Text style={styles.errorText}>Vui lòng nhập số giờ.</Text>}

        <Controller
          control={control}
          name="description"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Mô tả"
            />
          )}
        />
        {errors.description && <Text style={styles.errorText}>Vui lòng nhập mô tả.</Text>}

        <Button title="Thêm" onPress={handleSubmit(onSubmit)} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerCell: {
    width: '30%',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cell: {
    width: '30%',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: '#ff0000',
    marginBottom: 10,
  },
});

export default Timesheet;
