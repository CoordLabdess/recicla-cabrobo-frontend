import { View, Text, Modal, StyleSheet } from 'react-native'
import { PrimaryButton } from '../ui/Buttons'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../constants/colors'

interface DeliveredModalProps {
	id: string
	visible: boolean
	name: string
	categoriesPoints: {
		plastic: number
		paper: number
		metal: number
		total: number
	}
}

function MaterialDetail(props: { title: string, points: number, color: string }) {
	return (
		<View
			style={{
				borderColor: props.color,
				borderWidth: 3,
				borderRadius: 100,
				padding: 5,
				width: 200,
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginBottom: 10,
			}}
		>
			<Text style={{ color: props.color, fontSize: 16, fontWeight: '600', textAlign: 'center' }}>{props.title}</Text>
            <View style={{flexDirection: 'row'}}>
			<Text style={{ color: props.color, fontSize: 16, fontWeight: '600', marginLeft: 10 }}>
				+{props.points} Pts
			</Text>
            </View>
		</View>
	)
}

export function DeliveredModal(props: DeliveredModalProps) {
	const navigation = useNavigation()
	return (
		<Modal visible={props.visible} transparent>
			<View style={styles.modalContainer}>
				<View style={styles.modalCardShadow}>
					<View style={styles.modalCard}>
						<View style={styles.modalMessageContainer}>
							<Text style={styles.modalMessage}>Entrega Realizada!</Text>
							<Text style={styles.studentName}>{props.name}</Text>
						</View>
						<View style={styles.detailsContainer}>
							<Text style={styles.minorTitle}>Pontuação:</Text>
							<MaterialDetail title='Plástico'points={props.categoriesPoints.plastic} color='#D63636' />
							<MaterialDetail title='Papel' points={props.categoriesPoints.paper} color='#2367CC' />
							<MaterialDetail title='Metal' points={props.categoriesPoints.metal} color='#F0C93E' />
							<MaterialDetail title='Total' points={props.categoriesPoints.total} color='#000000' />
						</View>
						<View style={styles.modalButtonsContainer}>
							<PrimaryButton
								title='Voltar ao Início'
								innerContainerStyle={{
									paddingVertical: 5,
									paddingHorizontal: 23,
								}}
								onPress={() => {
									navigation.navigate('Inicio' as never)
								}}
							/>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	)
}
const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000070',
	},
	modalCardShadow: {
		borderRadius: 16,
		backgroundColor: 'transparent',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	modalCard: {
		backgroundColor: '#fff',
		overflow: 'hidden',
        paddingVertical: 20,
		borderRadius: 16,
		width: 300,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalMessageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
	},
	modalMessage: {
		color: COLORS.primary500,
		fontSize: 25,
		textAlign: 'center',
		fontWeight: '600',
	},
	studentName: {
		color: COLORS.secondary500,
		fontSize: 18,
	},
	modalButtonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
        marginTop: 20
	},
	detailsContainer: {
		alignItems: 'flex-start',
	},
    minorTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.primary500,
        marginBottom: 5
    }
})
