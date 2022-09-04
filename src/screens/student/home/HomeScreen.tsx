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
import {
	getRanking,
	getStudentData,
	getStudentHistory,
	History as H,
	StudentData,
} from '../../../utils/student'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { StudentContext } from '../../../store/context/studentContext'

function Header() {
	return <ProfileHeader />
}

export function HomeScreen() {
	const authCtx = useContext(AuthContext)
	const studentCtx = useContext(StudentContext)
	const student = studentCtx.getStudentData()
	const [history, setHistory] = useState<H[] | null>(null)

	const token = authCtx.token

	useLayoutEffect(() => {
		if (token) {
			getStudentData(token)
				.then(res => {
					studentCtx.updateStudentData({
						token: token,
						name: res.nome,
						points: res.pontos,
						studentNumber: res.matricula,
						type: 'Student',
						rank: -1,
					})
				})
				.catch(err => {})
		}
	}, [])

	useEffect(() => {
		getStudentHistory(student.token)
			.then(res => {
				setHistory(res)
			})
			.catch(() => {})
	}, [student.token])

	if (!student.name || !student.studentNumber || !student.token || !history) {
		return <LoadingScreen />
	} else {
		return (
			<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
				<FlatList
					ListHeaderComponent={Header}
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical={false}
					data={history}
					style={styles.contentList}
					renderItem={itemData => (
						<History last={itemData.index + 1 >= history.length} itemData={itemData} />
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
