import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { ProfileInfoCard } from '../../../components/delivery/ProfileInfoCard'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { StudentData } from '../../../utils/student'
import { genericImgSrc } from '../../../constants/general'

interface ConfirmStudentScreenProps {
	route: RouteProp<{ params: { student: StudentData; type: 'materials' | 'turboTasks' } }, 'params'>
}

export function ConfirmStudentScreen(props: ConfirmStudentScreenProps) {
	const navigation = useNavigation()
	const student = props.route.params.student
	/*const [student, setStudent] = useState<Student>()

	useLayoutEffect(() => {
		setStudent(props.route.params.student)
	}, [props.route])*/

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
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
						escola={student.escola.nome}
						points={student.pontos}
						profileImg={genericImgSrc}
						uniqueCode={String(student.matricula)}
						type='Student'
						serie={student.serie}
					/>
				</View>
				<View style={[styles.container]}>
					<PrimaryButton
						title='Continuar'
						isLoading={false}
						onPress={() => {
							navigation.navigate(
								(props.route.params.type === 'materials'
									? 'Delivery3'
									: 'DeliveryInformTurboTask') as never,
								{
									id: student.id,
									name: student.nome,
									matricula: String(student.matricula),
								} as never,
							)
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
		fontSize: 20,
		color: COLORS.primary500,
		fontWeight: '600',
	},
})
