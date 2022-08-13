import { View, Text, StyleSheet, FlatList, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { Award, awards } from '../../../data/awards'
import { Ionicons } from '@expo/vector-icons'
import { AwardListItem } from '../../../components/awards/AwardListItem'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { ConfirmAwardModal } from '../../../components/awards/ConfirmAwardModal'
import { Student } from '../../../data/students'
import { RoundIconButton } from '../../../components/ui/RoundIconButton'

interface ChooseAwardScreenProps {
	route: RouteProp<{ params: { student: Student; mode: 'get' | 'manage' } }, 'params'>
}

export function ChooseAwardScreen(props: ChooseAwardScreenProps) {
	const navigation = useNavigation()
	const [confirmModal, setConfirmModal] = useState(false)
	const [award, setAward] = useState<Award | null>(null)

	return (
		<SafeAreaView style={styles.root}>
			<FlatList
				ListHeaderComponent={() => (
					<SimplePageHeader textStyle={styles.title} title='Selecione o Prêmio' />
				)}
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
				data={awards}
				renderItem={itemData => (
					<AwardListItem
						award={itemData.item}
						onPress={() => {
							if (props.route.params.mode === 'manage') {
								navigation.navigate(
									'EditAward' as never,
									{ mode: 'Edit', award: itemData.item } as never,
								)
							} else {
								setAward(itemData.item)
								setConfirmModal(true)
							}
						}}
					/>
				)}
			/>
			<View style={{ position: 'absolute', bottom: 20, right: 20 }}>
				<RoundIconButton
					iconColor={COLORS.secondary100}
					iconName={'add'}
					size={52}
					onPress={() => {
						navigation.navigate('EditAward' as never, { mode: 'create' } as never)
					}}
				/>
			</View>

			{/* <ConfirmAwardModal
				award={award}
				visible={confirmModal}
				onCancel={() => setConfirmModal(false)}
				onConfirm={() => setConfirmModal(false)}
				student={props.route.params.student}
			/> */}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 20,
		color: COLORS.primary500,
		fontWeight: '600',
	},
})
