import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { ProfileInfoCard } from '../../../components/delivery/ProfileInfoCard'
import { PrimaryButton } from '../../../components/ui/Buttons'

interface Student {
	id: number
	studentCode: string
	nome: string
	profileImg: string
	points: number
}

interface ConfirmStudentScreenProps {
	route: RouteProp<{ params: { student: Student } }, 'params'>
}

export function ConfirmStudentScreen(props: ConfirmStudentScreenProps) {
	const navigation = useNavigation()
	const [student, setStudent] = useState<Student>()

	useLayoutEffect(() => {
		setStudent(props.route.params.student)
	}, [props.route])

	return (
		<SafeAreaView style={styles.root}>
			<ScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
					paddingBottom: 20,
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
			>
				<SimplePageHeader title='Confira os dados do aluno' textStyle={styles.title} />

				<View style={[styles.container, { marginTop: 40, marginBottom: 50 }]}>
					<ProfileInfoCard
						name={student?.nome}
						points={student?.points}
						profileImg={student?.profileImg}
						uniqueCode={student?.studentCode}
						type='Student'
					/>
				</View>
				<View style={[styles.container]}>
					<PrimaryButton
						title='Continuar'
						isLoading={false}
						onPress={() => {
							navigation.navigate('Delivery3' as never)
						}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	container: {
		width: '100%',
		alignItems: 'center',
	},
	title: {
		fontSize: 22,
		color: COLORS.primary500,
		fontWeight: '600',
	},
})
