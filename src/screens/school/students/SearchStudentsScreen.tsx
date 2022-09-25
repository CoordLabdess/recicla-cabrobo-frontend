import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../../constants/colors'
import { StudentListItem } from '../../../components/manageStudents/StudentListItem'
import { useContext, useLayoutEffect, useState } from 'react'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { Student } from '../../../data/students'
import { AuthContext } from '../../../store/context/authContext'
import { getStudentsList } from '../../../utils/school'
import { StudentData } from '../../../utils/student'
import { LoadingScreen } from '../../ui/LoadingScreen'

export function SearchStudentsScreen() {
	const [filteredStudents, setFilteredStudents] = useState<StudentData[]>([])

	const [search, setSearch] = useState('')
	const [searching, setSearching] = useState(false)
	const [allStudents, setAllStudents] = useState<StudentData[] | null>(null)
	const authCtx = useContext(AuthContext)

	function searchStudent() {
		if (search.trim().length > 0 && allStudents) {
			setSearching(true)
			if (/^\d+$/.test(search)) {
				setFilteredStudents(allStudents.filter(student => String(student.matricula).match(search)))
			} else {
				setFilteredStudents(
					allStudents.filter(student =>
						search
							.toLowerCase()
							.trim()
							.split(/\s+/)
							.every(name => student.nome.toLowerCase().includes(name)),
					),
				)
			}
			setSearching(false)
		}
	}

	useLayoutEffect(() => {
		if (authCtx.token) {
			getStudentsList(authCtx.token).then(res => {
				setAllStudents(res)
			})
		}
	}, [])

	if (!allStudents) {
		return <LoadingScreen />
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				ListHeaderComponent={() => {
					return (
						<>
							<SimplePageHeader title='Pesquisar Aluno' />
							<View style={styles.container}>
								<TextInput
									style={styles.searchInput}
									placeholder='Pesquisar por nome ou Nº de matrícula'
									value={search}
									onChangeText={text => setSearch(text)}
								/>
								<PrimaryButton
									title='Pesquisar'
									isLoading={searching}
									onPress={searchStudent}
									textStyle={{ fontSize: 18 }}
								/>
							</View>
						</>
					)
				}}
				style={{ width: '100%' }}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingBottom: 20,
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				data={filteredStudents}
				renderItem={itemData => <StudentListItem student={itemData.item} />}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	container: {
		alignItems: 'center',
		borderBottomWidth: 1,
		marginTop: 20,
		paddingBottom: 23,
		borderColor: COLORS.secondary400,
		marginBottom: 20,
	},
	searchInput: {
		backgroundColor: COLORS.secondary400,
		fontSize: 16,
		textAlign: 'center',
		paddingVertical: 11,
		paddingHorizontal: 15,
		borderRadius: 60,
		marginBottom: 20,
	},
})
