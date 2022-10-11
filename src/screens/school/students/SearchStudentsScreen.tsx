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

function SearchHeader(props: { isLoading?: boolean; onSubmit: (text: string) => void }) {
	const [search, setSearch] = useState('')

	return (
		<View style={{ width: '100%', maxWidth: 500 }}>
			<SimplePageHeader title='Pesquisar Aluno' />
			<View style={styles.container}>
				<TextInput
					style={styles.searchInput}
					placeholder='Nome ou Nº de matrícula'
					returnKeyType='search'
					onSubmitEditing={() => props.onSubmit(search)}
					value={search}
					onChangeText={text => setSearch(text)}
				/>
				<PrimaryButton
					title='Pesquisar'
					isLoading={props.isLoading}
					onPress={() => props.onSubmit(search)}
					textStyle={{ fontSize: 18 }}
				/>
			</View>
		</View>
	)
}

export function SearchStudentsScreen() {
	const [filteredStudents, setFilteredStudents] = useState<StudentData[]>([])

	const [searching, setSearching] = useState(false)
	const [allStudents, setAllStudents] = useState<StudentData[] | null>(null)
	const authCtx = useContext(AuthContext)

	function searchStudent(text: string) {
		if (text.trim().length > 0 && allStudents) {
			setSearching(true)
			if (/^\d+$/.test(text)) {
				setFilteredStudents(allStudents.filter(student => String(student.matricula).match(text)))
			} else {
				setFilteredStudents(
					allStudents.filter(student =>
						text
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
				setAllStudents(
					res
						.filter(s => s.status !== 'Inativo')
						.sort((a, b) => (a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0)),
				)
			})
		}
	}, [])

	function renderSearchHeader() {
		return (
			<>
				<SearchHeader onSubmit={text => searchStudent(text)} isLoading={searching} />
			</>
		)
	}

	if (!allStudents) {
		return <LoadingScreen />
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				style={{ width: '100%' }}
				ListHeaderComponent={renderSearchHeader}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					width: '100%',
					paddingBottom: 20,
					paddingHorizontal: '5%',
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
		width: '100%',
		maxWidth: 400,
		backgroundColor: COLORS.secondary400,
		fontSize: 16,
		textAlign: 'center',
		paddingVertical: 11,
		paddingHorizontal: 15,
		borderRadius: 60,
		marginBottom: 20,
	},
})
