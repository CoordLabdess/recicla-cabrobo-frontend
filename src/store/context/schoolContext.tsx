import React, { createContext, useState } from 'react'

export type AuthType = 'School' | 'School' | null

interface SchoolAuth {
	schoolData: SchoolData
	updateSchoolData: (sData: SchoolData) => void
	getSchoolData: () => SchoolData
}

interface SchoolData {
	name: string
	token: string
	type: 'School'
	points: number
	rank: number
}

export const SchoolContext = createContext<SchoolAuth>({
	schoolData: {
		token: '',
		name: '',
		type: 'School',
		points: -1,
		rank: -1,
	},
	getSchoolData: () => emptySchool,
	updateSchoolData: () => {},
})

const emptySchool: SchoolData = {
	token: '',
	name: '',
	type: 'School',
	points: -1,
	rank: -1,
}

export function SchoolContextProvider(props: { children: React.ReactNode }) {
	const [schoolData, setSchoolData] = useState<SchoolData>(emptySchool)

	function updateSchoolData(sData: SchoolData) {
		setSchoolData(sData)
	}

	function getSchoolData() {
		return schoolData
	}

	const value: SchoolAuth = {
		schoolData: schoolData,
		getSchoolData: getSchoolData,
		updateSchoolData: updateSchoolData,
	}

	return <SchoolContext.Provider value={value}>{props.children}</SchoolContext.Provider>
}
