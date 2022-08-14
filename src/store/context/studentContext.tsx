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
	name: string
	type: 'Student'
	points: number
}

export const StudentContext = createContext<StudentAuth>({
	studentData: {
		studentNumber: -1,
		name: '',
		type: 'Student',
		points: -1,
	},
	getStudentData: () => emptyStudent,
	updateStudentData: () => {},
})

const emptyStudent: StudentData = {
	studentNumber: -1,
	name: '',
	type: 'Student',
	points: -1,
}

export function StudentContextProvider(props: { children: React.ReactNode }) {
	const [studentData, setStudentData] = useState<StudentData>(emptyStudent)

	function updateStudentData(sData: StudentData) {
		console.log('uvaaa')

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
