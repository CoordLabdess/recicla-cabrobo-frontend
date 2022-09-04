import React, { createContext, useState } from 'react'
import { Student } from '../../data/students'

export type AuthType = 'Student' | 'School' | null

interface StudentAuth {
	studentData: StudentData
	updateStudentData: (sData: StudentData) => void
	getStudentData: () => StudentData
}

interface StudentData {
	studentNumber: number
	token: string
	name: string
	type: 'Student'
	points: number
	rank: number
}

export const StudentContext = createContext<StudentAuth>({
	studentData: {
		token: '',
		studentNumber: -1,
		name: '',
		type: 'Student',
		points: -1,
		rank: -1,
	},
	getStudentData: () => emptyStudent,
	updateStudentData: () => {},
})

const emptyStudent: StudentData = {
	token: '',
	studentNumber: -1,
	name: '',
	type: 'Student',
	points: -1,
	rank: -1,
}

export function StudentContextProvider(props: { children: React.ReactNode }) {
	const [studentData, setStudentData] = useState<StudentData>(emptyStudent)

	function updateStudentData(sData: StudentData) {
		setStudentData(sData)
	}

	function getStudentData() {
		return studentData
	}

	const value: StudentAuth = {
		studentData: studentData,
		getStudentData: getStudentData,
		updateStudentData: updateStudentData,
	}

	return <StudentContext.Provider value={value}>{props.children}</StudentContext.Provider>
}
