import { View, Image, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/colors'

interface ProfileImageProps {
	size?: number
	imgUri: string
}

export function ProfileImage(props: ProfileImageProps) {
	return (
		<View style={[styles.profileImageContainer, { height: props.size, width: props.size }]}>
			<Image
				style={styles.profileImage}
				source={{
					uri: props.imgUri,
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	profileImageContainer: {
		height: 80,
		width: 80,
		borderRadius: 100,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.secondary400,
		marginRight: 10,
	},
	profileImage: {
		height: '100%',
		width: '100%',
	},
})
