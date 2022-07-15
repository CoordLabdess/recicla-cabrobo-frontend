import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'

interface ProfileHeaderProps {
	children?: React.ReactNode
}

export function ProfileHeader(props: ProfileHeaderProps) {
	return (
		<View>
			<View style={styles.root}>
				<View style={styles.infoContainer}>
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							resizeMode={'cover'}
							source={{
								uri: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
							}}
						/>
					</View>
					<View>
						<Text style={styles.name}>Fulano da Silva Sauro</Text>
						<Text style={styles.tag}>Aluno</Text>
					</View>
				</View>
				<Pressable>
					<Ionicons
						name='exit-outline'
						color={COLORS.primary500}
						size={36}
						onPress={() => console.log('exit')}
					/>
				</Pressable>
			</View>
			{props.children ? props.children : <></>}
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	infoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	imageContainer: {
		backgroundColor: '#ccc',
		borderRadius: 100,
		height: 92,
		width: 92,
		overflow: 'hidden',
		marginRight: 20,
	},
	image: {
		height: '100%',
	},
	name: {
		fontSize: 14,
	},
	tag: {
		color: '#7C7C7C',
	},
})
