import DeleteButton from "./DeleteButton";
const Person = (props) => {
    let handleDeletePerson = props.handleDeletePerson
    return(
        <li key={props.person.id}>{props.person.name} {props.person.number}
          <DeleteButton onClick={() => handleDeletePerson(props.person.id)}/>
        </li>
    );
}

export default Person;