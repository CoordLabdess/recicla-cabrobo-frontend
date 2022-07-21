import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AddMaterialComponent } from '../../../components/delivery/AddMaterialComponent'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'

export function InformMaterialsScreen() {
	return (
		<SafeAreaView style={styles.root}>
			<ScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
			>
				<SimplePageHeader title='Informe o Peso dos Materiais' textStyle={styles.title} />
				<View style={[styles.container]}>
					<AddMaterialComponent />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: '#fff',
		flex: 1,
	},
	container: {
		width: '100%',
		alignItems: 'center',
	},
	title: {
		fontSize: 22,
		color: COLORS.primary500,
		fontWeight: '600',
	},
})
