import { View, Text, StyleSheet, FlatList, ListRenderItemInfo, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { ProfileHeader } from '../../../components/home/ProfileHeader'
import { RankElement } from '../../../components/home/RankElement'
import { Ionicons } from '@expo/vector-icons'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { Student, students } from '../../../data/students'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AuthContext } from '../../../store/context/authContext'
import { School, schools } from '../../../data/schools'
import { getGeneralRank } from '../../../utils/student'
import { StudentContext } from '../../../store/context/studentContext'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { getSchoolRank, SchoolRank } from '../../../utils/school'

export function SchoolRankScreen() {
	const authCtx = useContext(AuthContext)
	const [data, setData] = useState<SchoolRank[]>([])

	useLayoutEffect(() => {
		if (authCtx.token) {
			getSchoolRank(authCtx.token)
				.then(res => {
					setData(res.sort((a, b) => b.pontos - a.pontos))
				})
				.catch(err => authCtx.logout())
		}
	}, [])

	if (data.length < 1) {
		return <LoadingScreen />
	} else {
		return (
			<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
				<FlatList
					ListHeaderComponent={() => (
						<SimplePageHeader
							title={authCtx.type === 'Student' ? 'Ranking dos Alunos' : 'Ranking das Escolas'}
						/>
					)}
					alwaysBounceVertical={false}
					style={styles.contentList}
					data={data}
					showsVerticalScrollIndicator={false}
					renderItem={itemData => (
						<RankElement
							disableImage={authCtx.type === 'Student'}
							name={itemData.item.nome}
							points={itemData.item.pontos}
							index={itemData.index + 1}
						/>
					)}
				/>
			</SafeAreaView>
		)
	}
}
const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	contentList: {
		backgroundColor: '#34123',
		flexGrow: 1,
	},
})
