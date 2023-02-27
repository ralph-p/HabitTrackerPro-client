import { Table, Td, Tr, Tbody, Text, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useGSDContext } from '../../context/context'
import { Task } from '../../hooks/types/task'
import { AddInput } from '../AddInput'



export const TaskNotes = () => {
	const { task, addTaskNote } = useGSDContext()
	if(!task) return <Spinner />

	const submitNote = (note: string, time?: string) => addTaskNote(task?.id, note, time)

	return (
		<>
			<AddInput callBack={submitNote} placeholder={`${task.name} note`} />
			<Table size="sm" variant="unstyled" backgroundColor={'gray.100'} borderRadius=".5em">
				<Tbody>
					{
						Object.entries(task?.noteObject as { date: string[] }).map((date, index) => {
							return (
								<Tr key={`${date[0]} - ${index}`}>
									<Td display="flex"><Text color={'blackAlpha.700'}>{date[0]}</Text></Td>
									<Td>
										{date[1].map((note, index) => (
											<Tr key={`${date[0]} - ${note} - ${index}`}>
												<Text color={'blackAlpha.600'}>{note}</Text>
											</Tr>
										))}
									</Td>
								</Tr>
							);
						})

					}
				</Tbody>
			</Table>
		</>
	)
}