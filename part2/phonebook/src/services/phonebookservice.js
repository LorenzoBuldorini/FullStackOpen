import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
  return request.then(response => {
		console.log("server response data",response.data)
		return response.data
	})
}

const create = newPerson => {
  const request = axios.post(baseUrl,newPerson)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
	console.log("id to delete ",id)
  const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => response.data)
}

const update = (person, newNumber) => {
	const personToUpdate = person
	console.log("person before update",person)
	const updatedPerson = { ...personToUpdate, number: newNumber }
	console.log("person after update",updatedPerson)
	console.log("id types",typeof person.id, typeof updatedPerson.id)
	//const request = axios.patch(`${baseUrl}/${updatedPerson.id}`,updatedPerson)
	const request = axios.put(`${baseUrl}/${person.id}`,updatedPerson)
	return request.then(response => response.data)
}
const phonebookService = { getAll, create, deletePerson, update };

export default phonebookService;