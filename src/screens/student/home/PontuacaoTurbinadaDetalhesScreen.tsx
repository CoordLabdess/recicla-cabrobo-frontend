import { RouteProp } from '@react-navigation/native'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { PrimaryTextInput } from '../../../components/ui/TextInputs'
import { COLORS } from '../../../constants/colors'
import { AtividadeDataOutput } from '../../../types/atividades.type'
import { formatDate } from '../../../utils/formatData'

interface PontuacaoTurbinadaDetalhesScreenProps {
	route: RouteProp<{ params: { atividade: AtividadeDataOutput } }>
}

export function PontuacaoTurbinadaDetalhesScreen(props: PontuacaoTurbinadaDetalhesScreenProps) {
	const atividade = props.route.params.atividade

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
			>
				<SimplePageHeader title='Detalhes da Atividade' />
				<View style={styles.taskHeader}>
					<Text style={styles.title}>{atividade.nome}</Text>
					<Text style={styles.fadeText}>{atividade.pontos}Pts</Text>
				</View>
				<View style={styles.descriptionContainer}>
					<Text style={styles.descriptionText}>{atividade.descricao}</Text>
				</View>
				<View style={styles.dateContainer}>
					<Text style={styles.dateText}>Data Limite: {formatDate(atividade.prazofinal)}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	taskHeader: {
		width: '100%',
		marginBottom: 20,
	},
	title: {
		fontWeight: '600',
		fontSize: 32,
	},
	fadeText: {
		fontSize: 24,
		color: COLORS.secondary500,
	},
	descriptionContainer: {
		backgroundColor: COLORS.secondary400,
		width: '100%',
		minHeight: 300,
		borderRadius: 40,
		paddingVertical: 24,
		paddingHorizontal: 30,
		marginBottom: 20,
	},
	descriptionText: {
		fontSize: 18,
	},
	dateContainer: {
		width: '100%',
		paddingHorizontal: 20,
	},
	dateText: {
		fontSize: 18,
	},
})
