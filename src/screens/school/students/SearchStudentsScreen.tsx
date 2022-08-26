import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../../constants/colors'
import { StudentListItem } from '../../../components/manageStudents/StudentListItem'
import { useState } from 'react'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { Student, students } from '../../../data/students'

export function SearchStudentsScreen() {
	const [filteredStudents, setFilteredStudents] = useState<Student[]>([])

	const [search, setSearch] = useState('')
	const [searching, setSearching] = useState(false)

	async function fetchStudent(filter: string) {
		return new Promise((resolve, reject) => {
			return setTimeout(() => {
				if (/^\d+$/.test(filter)) {
					resolve(students.filter(students => students.id === parseInt(filter)))
				} else {
					resolve(
						students.filter(students =>
							filter
								.toLowerCase()
								.trim()
								.split(/\s+/)
								.every(name => students.nome.toLowerCase().includes(name)),
						),
					)
				}
			}, 1000)
		})
	}

	function searchStudent() {
		if (search.trim().length > 0) {
			setSearching(true)
			fetchStudent(search).then(res => {
				setFilteredStudents(res as Student[])
				setSearching(false)
			})
		}
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
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
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{filteredStudents.length > 0 && typeof students != 'undefined' ? (
					<FlatList
						keyboardShouldPersistTaps='always'
						style={{ width: '100%' }}
						contentContainerStyle={{
							flexGrow: 1,
							justifyContent: 'flex-start',
							paddingVertical: 20,
							paddingHorizontal: '5%',
							alignItems: 'center',
						}}
						alwaysBounceVertical={false}
						showsVerticalScrollIndicator={false}
						data={filteredStudents}
						renderItem={itemData => <StudentListItem student={itemData.item} />}
					/>
				) : (
					<Text style={{ fontSize: 19, color: COLORS.secondary400 }}>
						Sem resultados correspondentes
					</Text>
				)}
			</View>
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
