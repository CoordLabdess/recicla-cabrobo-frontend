import { View, Text, FlatList, ListRenderItemInfo, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { useContext, useLayoutEffect } from 'react'
import { StudentContext } from '../../store/context/studentContext'
import { getRanking } from '../../utils/student'

interface StatusItem {
	title: string
	icon: string
	value: number
	unit: string
	screen: string
}

interface UserStatusProps {
	points: number
}

function StatusCard(props: { itemData: ListRenderItemInfo<StatusItem> }) {
	const navigation = useNavigation()
	return (
		<Pressable
			style={styles.statusContainer}
			onPress={() => {
				navigation.navigate('Ranking' as never)
			}}
		>
			<View style={styles.statusIconContainer}>
				<Ionicons name={props.itemData.item.icon as any} color='#000' size={34} />
			</View>
			<View style={styles.statusInfoContainer}>
				<Text style={styles.statusTitleText}>{props.itemData.item.title}</Text>
				<Text style={styles.statusValueText}>
					{props.itemData.item.value}
					{props.itemData.item.unit}
				</Text>
			</View>
		</Pressable>
	)
}

export function UserStatus(props: UserStatusProps) {
	const navigation = useNavigation()

	const StudentCtx = useContext(StudentContext)
	useLayoutEffect(() => {
		getRanking(
			StudentCtx.getStudentData().token,
			String(StudentCtx.getStudentData().studentNumber),
		).then(res => {
			console.log(res)
			StudentCtx.updateStudentData({ ...StudentCtx.getStudentData(), rank: res })
		})
	}, [])
	return (
		<View style={styles.root}>
			{/*<FlatList
				alwaysBounceHorizontal={false}
				showsHorizontalScrollIndicator={false}
				data={data}
				ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
				horizontal
				renderItem={itemData => {
					return <StatusCard itemData={itemData} />
				}}
			/>*/}
			<Pressable style={styles.scoreContainer}>
				<Ionicons name='leaf-outline' size={26} style={{ marginRight: 5 }} />
				<View style={{ flex: 1 }}>
					<Text style={styles.scoreContainerTitle}>Pontos disponíveis</Text>
					<Text style={styles.scoreContainerText}>{props.points} pts</Text>
				</View>
			</Pressable>
			<Pressable
				android_ripple={{ color: '#ccc' }}
				style={styles.rankingContainer}
				onPress={() => {
					navigation.navigate('Ranking' as never)
				}}
			>
				<Ionicons name='medal-outline' size={26} style={{ marginRight: 5 }} />
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						flex: 1,
						justifyContent: 'space-between',
					}}
				>
					<View>
						<Text style={styles.rankingContainerTitle}>Sua Classificação</Text>
						<Text style={styles.rankingContainerText}>
							{StudentCtx.getStudentData().rank}º Lugar
						</Text>
					</View>
					<Ionicons name='chevron-forward' size={26} color={COLORS.secondary500} />
				</View>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		alignItems: 'flex-start',
		marginTop: 16,
	},
	statusContainer: {
		flexDirection: 'row',
		marginTop: 25,
		alignItems: 'center',
	},
	statusIconContainer: {
		marginHorizontal: 10,
	},
	statusInfoContainer: {},
	statusTitleText: {
		fontWeight: '400',
		color: '#7C7C7C',
	},
	statusValueText: {
		fontSize: 17,
		fontWeight: '400',
	},
	scoreContainer: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingVertical: 4,
	},
	scoreContainerTitle: {
		fontSize: 18,
	},
	scoreContainerText: {
		fontSize: 16,
		color: COLORS.secondary500,
	},
	rankingContainer: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		paddingVertical: 4,
	},
	rankingContainerTitle: {
		fontSize: 18,
	},
	rankingContainerText: {
		fontSize: 16,
		color: COLORS.secondary500,
	},
})
