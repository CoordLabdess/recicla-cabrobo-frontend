import React, { createContext, useState } from 'react'

export type AuthType = 'School' | 'School' | null

interface SchoolAuth {
	schoolData: SchoolData
	updateSchoolData: (sData: SchoolData) => void
	getSchoolData: () => SchoolData
}

interface SchoolData {
	id: string
	cpf: string
	nome: string
	type: 'School'
	email: string
	nomeGestor: string
	points: number
	rank: number
}

export const SchoolContext = createContext<SchoolAuth>({
	schoolData: {
		nome: '',
		cpf: '',
		email: '',
		id: '',
		nomeGestor: '',
		type: 'School',
		points: -1,
		rank: -1,
	},
	getSchoolData: () => emptySchool,
	updateSchoolData: () => {},
})

const emptySchool: SchoolData = {
	cpf: '',
	nome: '',
	email: '',
	id: '',
	nomeGestor: '',
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
