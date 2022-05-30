import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, FlatList, Alert, Text, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { Header } from "../../components/Header";
// import { istTotal } from "../../components/ListTotal"

interface ListTotalTelephonyProps {
    id: string,
    line_number: string,
    chip_number: string,
    data_plan: string,
    account_name: string,
    telephone_operator: string
}

interface TotalProps {
    id: string;
    ddNumber: string;
}

export function ListTotal() {
    const [status, setStatus] = useState('')
    const [telephonyData, setTelephonyData] = useState<ListTotalTelephonyProps[]>([])

    async function loadDataTelephony() {
        const data = await AsyncStorage.getItem('@mytelephony:telephone')
        if (data) {
            console.log(data)
            setTelephonyData(JSON.parse(data))
        }
    }

    function totalLinhas(linhas: string) {
        return telephonyData.reduce((total, v) => v.telephone_operator.includes(linhas) ? total += 1 : total += 0, 0)
    }

    function totalVivo(linhas: string) {
        return telephonyData.reduce((total, v) => v.telephone_operator.includes(linhas) ? total += 1 : total += 0, 0)
    }

    function totalClaro(linhas: string) {
        return telephonyData.reduce((total, v) => v.telephone_operator.includes(linhas) ? total += 1 : total += 0, 0)
    }

    function totalTim(linhas: string) {
        return telephonyData.reduce((total, v) => v.telephone_operator.includes(linhas) ? total += 1 : total += 0, 0)
    }

    function totalOi(linhas: string) {
        return telephonyData.reduce((total, v) => v.telephone_operator.includes(linhas) ? total += 1 : total += 0, 0)
    }

    function totalDDD(ddd: string) {
        return telephonyData.reduce((totalDDD, number) => number.line_number.includes(ddd) ? totalDDD += 1 : totalDDD += 0, 0)
    }

    function totalPlan(plan: string) {
        return telephonyData.reduce((totalPlan, v) => v.data_plan.includes(plan) ? totalPlan += 1 : totalPlan += 0, 0)
    }

    useEffect(() => {
        loadDataTelephony()
    }, [])

    useFocusEffect(useCallback(() => {
        loadDataTelephony()
    }, []))

    useEffect(() => {
        async function saveTelephone() {
            await AsyncStorage.setItem('@mytelephony:telephone', JSON.stringify(telephonyData))
        }
        saveTelephone()
    }, [telephonyData])

    return (
        <ScrollView>
            <View style={styles.container}>
                <Header title='Totais de Cadastros' />
                <View style={styles.content}>
                    <Text style={styles.textCard}>Total Linhas Cadastradas:{totalLinhas('')}</Text>
                    <Text style={styles.textCard}>Total Linhas Vivo:{totalVivo('Vivo')}</Text>
                    <Text style={styles.textCard}>Total Linhas Claro:{totalClaro('Claro')}</Text>
                    <Text style={styles.textCard}>Total Linhas Oi:{totalTim('Oi')}</Text>
                    <Text style={styles.textCard}>Total Linhas Tim:{totalOi('Tim')}</Text>
                    <Text style={styles.textCard}>Total Linhas com DDD 24:{totalDDD('24')}</Text>
                    <Text style={styles.textCard}>Total Linhas com DDD 31:{totalDDD('31')}</Text>
                    <Text style={styles.textCard}>Total Planos com 10gb:{totalPlan('10gb')}</Text>
                    <Text style={styles.textCard}>Total Planos com 20gb:{totalPlan('20gb')}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f0f2f5'
    },
    content: {
        marginTop: 5,
        marginLeft: 5,
        padding: 6,
    },
    textCard: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        flexDirection: 'row',
    }
})


