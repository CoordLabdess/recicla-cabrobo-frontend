import { useLinkProps } from '@react-navigation/native'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { MaterialOutput } from '../../utils/school'
import { MaterialCategory } from '../../data/materialTable'

interface MaterialWeight {
	materialId: string
	nome: string
	pontosPorKg: number
	categoria: MaterialCategory
	weight: string
}

interface AddMaterialComponentProps {
	material: MaterialWeight
	materialWeight: string
	setMaterialsWeight: (materialData: MaterialWeight) => void
}

export function AddMaterialComponent(props: AddMaterialComponentProps) {
	return (
		<View
			style={[
				styles.shadowContainer,
				props.material.categoria === 'Plastico'
					? styles.plastic
					: props.material.categoria === 'Metal'
					? styles.metal
					: props.material.categoria === 'Papel'
					? styles.paper
					: styles.glass,
			]}
		>
			<View style={styles.cardContainer}>
				<View style={{ marginRight: 7 }}>
					<Ionicons name='trash' size={52} color='#fff' />
				</View>
				<View>
					<Text style={styles.title}>{props.material.nome}</Text>
					<View style={{ flexDirection: 'row', marginTop: 7 }}>
						<TextInput
							numberOfLines={1}
							keyboardType='number-pad'
							value={props.materialWeight}
							onChangeText={text => props.setMaterialsWeight({ ...props.material, weight: text })}
							style={[
								styles.input,
								props.material.categoria === 'Plastico'
									? styles.plasticInput
									: props.material.categoria === 'Metal'
									? styles.metalInput
									: props.material.categoria === 'Papel'
									? styles.paperInput
									: styles.glassInput,
							]}
						/>
						<Text style={styles.title}>Kg</Text>
					</View>
				</View>
				<View
					style={{
						flex: 1,
						height: '100%',
						justifyContent: 'space-between',
						alignItems: 'flex-end',
						position: 'absolute',
						right: 0,
						marginRight: 10,
					}}
				>
					<Pressable
						onPress={() => {
							console.log('oi')
						}}
					>
						<Ionicons name='information-circle' size={26} color='#fff' />
					</Pressable>
					<Text style={styles.pointsText}>{props.material.pontosPorKg}Pts/kg</Text>
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
		marginBottom: 40,
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
		fontSize: 22,
		fontWeight: '600',
	},
	input: {
		width: 90,
		height: 35,
		backgroundColor: '#fff',
		color: '#fff',
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
	plasticInput: {
		backgroundColor: '#8E2941',
	},
	paperInput: {
		backgroundColor: '#2B3592',
	},
	metalInput: {
		backgroundColor: '#C7922C',
	},
	glassInput: {
		backgroundColor: '#50873C',
	},
})
