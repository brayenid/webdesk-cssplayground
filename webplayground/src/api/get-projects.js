import { collection, getDocs } from '@firebase/firestore'
import { db } from '../firebase'

let projects = []

const getProjects = async () => {
  const fetchProjects = await getDocs(collection(db, 'showcase'))
  fetchProjects.forEach((doc) => {
    projects.push(doc.data())
  })
}
getProjects()

export default projects
