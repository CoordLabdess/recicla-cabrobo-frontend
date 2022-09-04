import { View, Text, FlatList, Pressable, StyleSheet, ListRenderItemInfo } from 'react-native'
import { useLayoutEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { useState, useEffect } from 'react'
import { COLORS } from '../../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useLinkProps } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import { awards } from '../../../data/awards'
import { AwardListItem } from '../../../components/awards/AwardListItem'
import { History } from '../../../components/home/History'
import { Award, AwardHistory, getAwardList, getStudentAwardHistory } from '../../../utils/student'
import { StudentContext } from '../../../store/context/studentContext'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { AwardHistoryElement } from '../../../components/home/AwardHistoryElement'

interface History {
	date: Date
	description: string
	points: number
}

function AwardElement(props: { award: Award }) {
	return (
		<View style={{ alignItems: 'center' }}>
			<AwardListItem award={props.award} onPress={() => {}} />
		</View>
	)
}
function AwardElementSeparator() {
	return <View style={{ marginBottom: 20 }} />
}

export function PremiosDisponiveisScreen() {
	const [action, setAction] = useState<0 | 1>(0)
	const [awardCategory, setAwardCategory] = useState('Brinquedo')
	const [awardHistory, setAwardHistory] = useState<AwardHistory[] | null>(null)
	const [awards, setAwards] = useState<Award[] | null>(null)

	const student = useContext(StudentContext).getStudentData()

	useLayoutEffect(() => {
		getStudentAwardHistory(student.token)
			.then(res => setAwardHistory(res))
			.catch(error => {
				setAwardHistory([])
			})
		getAwardList(student.token)
			.then(res => setAwards(res.sort((a, b) => Number(b.preco) - Number(a.preco))))
			.catch(error => {
				setAwards([])
			})
	}, [])

	function PremiosDisponiveisHeader() {
		return (
			<View style={{ flex: 1, marginBottom: 30 }}>
				<SimplePageHeader title='Prêmios Disponíveis' style={{ marginTop: 20, marginBottom: 10 }} />

				<View style={styles.switcher}>
					<Pressable
						style={[styles.switch, action === 0 && styles.activeSwitch]}
						onPress={() => changeActionScope(0)}
					>
						<Ionicons name='person-outline' color='#000' size={20} style={{ marginRight: 10 }} />
						<Text>Prêmios</Text>
					</Pressable>
					<Pressable
						style={[styles.switch, action === 1 && styles.activeSwitch]}
						onPress={() => changeActionScope(1)}
					>
						<Ionicons name='list-outline' color='#000' size={20} style={{ marginRight: 10 }} />
						<Text>Histórico</Text>
					</Pressable>
				</View>
			</View>
		)
	}

	// function CategoryPicker() {
	// 	return (
	// 		<View style={{ width: '100%', marginBottom: 20 }}>
	// 			<View style={{ alignItems: 'center' }}>
	// 				<View style={{ borderRadius: 20, overflow: 'hidden', width: 250 }}>
	// 					<Picker
	// 						onValueChange={text => setAwardCategory(text)}
	// 						style={[styles.field, { fontSize: 20, fontWeight: '600' }]}
	// 						selectedValue={'Brinquedo'}
	// 						enabled
	// 					>
	// 						<Picker.Item label='Brinquedos' value='Brinquedo' />
	// 						<Picker.Item label='Eletrônicos' value='Eletrônico' />
	// 					</Picker>
	// 				</View>
	// 			</View>
	// 		</View>
	// 	)
	// }

	function changeActionScope(id: 0 | 1) {
		if (action !== id) setAction(id)
	}

	if (!awardHistory || !awards) {
		return <LoadingScreen />
	} else {
		return (
			<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
				{action === 0 ? (
					<FlatList
						ItemSeparatorComponent={AwardElementSeparator}
						showsVerticalScrollIndicator={false}
						alwaysBounceVertical={false}
						ListHeaderComponent={() => (
							<View>
								<PremiosDisponiveisHeader />
								{/* <CategoryPicker /> */}
							</View>
						)}
						data={awards}
						renderItem={itemData => <AwardElement award={itemData.item} />}
					/>
				) : (
					<FlatList
						ListHeaderComponent={PremiosDisponiveisHeader}
						showsVerticalScrollIndicator={false}
						alwaysBounceVertical={false}
						data={awardHistory}
						renderItem={itemData => (
							<AwardHistoryElement last={itemData.index + 1 >= awards.length} itemData={itemData} />
						)}
					/>
				)}
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
	},
	switcher: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 46,
	},
	switch: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		borderBottomColor: COLORS.secondary200,
		borderBottomWidth: 3,
	},
	activeSwitch: {
		borderBottomColor: COLORS.primary500,
	},
	indicator: {
		height: 2,
		width: '100%',
	},
	activeIndicator: {
		backgroundColor: COLORS.primary500,
	},
	field: {
		fontSize: 19,
		fontWeight: '600',
		padding: 11,
		borderRadius: 15,
		backgroundColor: COLORS.secondary400,
	},
})

const styles2 = StyleSheet.create({
	impactContainer: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 12,
	},
	impactHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	impactTitle: {
		fontSize: 23,
		fontWeight: '500',
	},
	impactValueContainer: {
		flexDirection: 'row',
	},
	impactValueText: {
		fontWeight: '500',
		marginRight: 10,
	},
})
