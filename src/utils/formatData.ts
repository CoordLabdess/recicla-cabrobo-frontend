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

type dateStringFormat = 'mm-dd-yyyy' | 'dd-mm-yyyy'

export function formatarDataStringToDate(
	inputDate: string,
	stringFormat: dateStringFormat,
	splitter: string,
): Date {
	if (stringFormat === 'dd-mm-yyyy') {
		const d = inputDate.split(splitter)
		const day = d[0].padStart(2, '0')
		const month = d[1].padStart(2, '0')
		const year = d[2].substring(0, 5)
		return new Date(Number(year), Number(month), Number(day))
	} else {
		const d = inputDate.split(splitter)
		const day = d[1].padStart(2, '0')
		const month = d[0].padStart(2, '0')
		const year = d[2].substring(0, 5)
		return new Date(Number(year), Number(month), Number(day))
	}
}

export function formatarDataDateToString(inputDate: Date, stringFormat: dateStringFormat): string {
	const day = inputDate.getDate()
	const month = inputDate.getMonth() + 1
	const year = inputDate.getFullYear()
	return stringFormat === 'dd-mm-yyyy' ? `${day}/${month}/${year}` : `${month}/${day}/${year}`
}
