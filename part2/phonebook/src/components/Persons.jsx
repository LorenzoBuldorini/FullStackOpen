import Person from "./Person";
const Persons= (props) => {
    const filteredpersons = props.people
    console.log(filteredpersons)
    return(
        <ul>
        {filteredpersons.map((p,i) =>(
          <Person key ={i} person={p} handleDeletePerson={props.handleDeletePerson}/>
        ))}
      </ul>
    );
}
export default Persons;