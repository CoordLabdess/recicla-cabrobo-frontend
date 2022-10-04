export function formatDate(date: string): string {
	if (date) {
		const d = date.split('-')
		// const month = String(new Date(date).getMonth()).padStart(2, '0')
		// const day = String(new Date(date).getDay()).padStart(2, '0')
		// const year = String(new Date(date).getFullYear()).padStart(4, '0')
		const day = d[2].substring(0, 2)
		const month = d[1]
		const year = d[0]
		return `${day}/${month}/${year}`
	} else {
		return `00/00/0000`
	}
}
