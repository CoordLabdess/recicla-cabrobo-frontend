import { View, Text, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { Award, awards } from '../../../data/awards'
import { Ionicons } from '@expo/vector-icons'
import { AwardListItem } from '../../../components/awards/AwardListItem'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { ConfirmAwardModal } from '../../../components/awards/ConfirmAwardModal'

export function ChooseAwardScreen() {
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
							setAward(itemData.item)
							setConfirmModal(true)
						}}
					/>
				)}
			/>
			<ConfirmAwardModal
				award={award}
				visible={confirmModal}
				onCancel={() => setConfirmModal(false)}
				onConfirm={() => setConfirmModal(false)}
			/>
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
