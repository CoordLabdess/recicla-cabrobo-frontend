import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../../constants/colors'
import { ProfileHeader } from '../../../components/home/ProfileHeader'
import { UserStatus } from '../../../components/home/UserStatus'
import { ProfileActions } from '../../../components/home/ProfileActions'
import { History } from '../../../components/home/History'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AuthContext } from '../../../store/context/authContext'
import { getStudentData, StudentData } from '../../../utils/student'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { StudentContext } from '../../../store/context/studentContext'

interface History {
	date: Date
	description: string
	points: number
}

const historyData: History[] = [
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
]

function Header() {
	return <ProfileHeader />
}

export function HomeScreen() {
	const authCtx = useContext(AuthContext)
	const studentCtx = useContext(StudentContext)
	const student = studentCtx.getStudentData()

	const token = authCtx.token

	useLayoutEffect(() => {
		if (token) {
			getStudentData(token)
				.then(res => {
					studentCtx.updateStudentData({
						name: res.nome,
						points: res.pontos,
						studentNumber: res.matricula,
						type: 'Student',
					})
				})
				.catch(err => {
					console.log(err)
				})
		}
	}, [])

	useEffect(() => {
		console.log(student)
	}, [studentCtx.studentData])

	if (!student.name || !student.studentNumber) {
		return <LoadingScreen />
	} else {
		return (
			<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
				<FlatList
					ListHeaderComponent={Header}
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical={false}
					data={historyData}
					style={styles.contentList}
					renderItem={itemData => (
						<History last={itemData.index + 1 >= historyData.length} itemData={itemData} />
					)}
				/>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	contentList: {
		backgroundColor: '#fff',
		flexGrow: 1,
	},
})
