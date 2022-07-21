import { useLinkProps } from '@react-navigation/native'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

interface AddMaterialComponentProps {
	title?: string
	category?: 'Plastic' | 'Paper' | 'Metal' | 'Glass'
	value?: number
	setValue?: (value: number) => void
}

export function AddMaterialComponent(props: AddMaterialComponentProps) {
	return (
		<View
			style={[
				styles.shadowContainer,
				props.category === 'Plastic'
					? styles.plastic
					: props.category === 'Metal'
					? styles.metal
					: props.category === 'Paper'
					? styles.paper
					: styles.glass,
			]}
		>
			<View style={styles.cardContainer}>
				<View style={{ marginRight: 7 }}>
					<Ionicons name='trash' size={52} color='#fff' />
				</View>
				<View>
					<Text style={styles.title}>Garrafa Pet</Text>
					<View style={{ flexDirection: 'row' }}>
						<TextInput placeholder='0' keyboardType='number-pad' style={styles.input} />
						<Text style={styles.title}>Kg</Text>
					</View>
				</View>
				<View
					style={{
						flex: 1,
						height: '100%',
						justifyContent: 'space-between',
						alignItems: 'flex-end',
					}}
				>
					<Pressable
						onPress={() => {
							console.log('oi')
						}}
					>
						<Ionicons name='information-circle' size={26} color='#fff' />
					</Pressable>
					<Text style={styles.pointsText}>0,60Pts/kg</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	shadowContainer: {
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
	cardContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		width: 345,
		height: 100,
		borderRadius: 16,
		overflow: 'hidden',
	},
	plastic: {
		backgroundColor: '#D63636',
	},
	paper: {
		backgroundColor: '#2367CC',
	},
	metal: {
		backgroundColor: '#F0C93E',
	},
	glass: {
		backgroundColor: 'green',
	},
	title: {
		color: '#fff',
		fontSize: 25,
		fontWeight: '600',
	},
	input: {
		width: 90,
		height: 35,
		backgroundColor: '#fff',
		borderRadius: 10,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '500',
		marginRight: 6,
	},
	pointsText: {
		fontSize: 13,
		fontWeight: '500',
		color: '#fff',
	},
})
