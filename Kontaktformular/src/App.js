import React, {useReducer} from 'react';
import './App.css';

function App() {

  const initials = {
    name: '',
    length: 0,
    validName: '',
    validMail: false,
    validTel: false,
    // message:'',
    vailidMessage: false,
    checkConditions: true,
    isValid: false,
    selectedDepartment: "",
    // requiredField: true,
    myErrors: {
      name: '',
      conditions: '',
      email: '',
      message: '',
      department: ''
    }
  }
// Switch-Case Fälle
  const [formState, dispatch] = useReducer( (state, action) => {
    switch (action.type) {
      case 'CHECK_NAME':
        // const name_error = action.name.length <= 5 ? 'Der Name muss mindestens 5 Zeichen enthalten' : ""
        return {
          name: action.name,
          //validName: action.name.length >= 8 // ? true : name_error,
          // myErrors: {...state.myErrors, name_error}, 
        };
      case 'CHECK_MAIL':
        console.log(action)
        return {   
          validMail: action.mail.includes('@') && action.mail.includes('.') ? true : false
        }
      case 'CHECK_MESSAGE':
        return {
          validMessage: action.message_length >= 10 ? true : false
        }
      case 'CHECK_DEPARTMENT':
        return {
          selectedDepartment: action.department.value
        }
      case 'CHECK_CONDITIONS':
        return {
          checkedConditions: action.checked
        }
      default:
        return state;
    }
    }, initials);
// Switch-Case Ende
///////////////////////////////////////
    /*const changeHandler = (event) => {
      dispatch( {
        type: 'CHANGE',
        value: event.target.value,
      });
    }

    const submitHandler = (event) => {
      event.preventDefault();
      alert(formState.name);
      dispatch({
        type: 'SUBMIT'
      })
    } */
    const checkName = (event) => {
      dispatch({
        type:"CHECK_NAME",
        name: event.target.value
      })
    }

    const checkMail = (event) => {
      dispatch({
        type:"CHECK_MAIL",
        mail: event.target.value,
      })

    }

    const checkMessage = (event) => {
      dispatch({
        type:"CHECK_MESSAGE",
        message_length: event.target.value.length
      })
    }

    const checkDepartment = (event) => {
      dispatch({
        type:"CHECK_DEPARTMENT",
        department: event.target.value
      })
    }

    const checkConditions = (event) => {
      dispatch({
        type:"CHECK_CONDITIONS",
        checked: event.target.checked
      })
    }

    return (
    <form className='container' action=''>
      <h2>Kontaktformular</h2> 
        <div className='div-container'>
          <label htmlFor='name_field'>Vor- und Nachname:</label>
            <input type="text" value={formState.validName} onChange={checkName}/>
        </div>
        <div className='div-container'>
          <label htmlFor='email'>Email:</label>
            <input type="email" name='email' onChange={checkMail}></input>
        </div>
        <div className='div-container'>
          <label>Telefon:</label>
            <input type="tel" value={formState.tel}></input>
        </div>
        <div className='div-container'>
          <select onChange={checkDepartment}>Wähle was du möchtest:
              <option value="1">Angebot</option>
              <option value="2">Anfrage</option>
              <option selected value="3">Bestellung</option>
              <option value="4">Beratung</option>
          </select>
        </div>
        <div className='div-container'>
          <label> Nachricht:
            <textarea placeholder='Deine Nachricht..' onChange={checkMessage}/>
          </label>
        </div>
        <div className='div-container'>
          <label>AGB's gelesen
            <input type="checkbox" onChange={checkConditions}/>
            {formState.requiredField && <span>Dies ist ein Pflichtfeld</span>}

          </label>
        </div>
        <div className='div-container'>
            Antwort per
          <label>Telefon
            <input type="radio"/>
          </label>
          <label>per E-Mail
            <input type="radio"/>
          </label>
        </div>
        <button disabled={formState.isValid}>
        Senden
        </button>
    </form>
  );
  }

export default App;
