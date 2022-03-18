import axios from 'axios';
import { useState } from 'react';

const defaultItem = {
  Name: '',
  Email: '',
  Age: '',
  Status: false,
  Class: []
};

/**
 * Form component, for both create and edit.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Form (props) {
  const [item, setItem] = useState({ ...defaultItem, ...props.data });

  /**
   * toggle item's Class property base on select status and value
   * @param status
   * @param value
   */
  function toggleItemClass (status, value) {
    setItem(prevState => {
      const NewClass = [...prevState.Class];
      if (status) {
        NewClass.push(value);
      } else {
        NewClass.splice(NewClass.indexOf(value), 1);
      }
      return {
        ...prevState,
        Class: NewClass
      };
    });
  }

  return (
    <form
      action={'/api/data'}
      method={'post'}
      onSubmit={e => {
        e.preventDefault();
        if (props.data) {
          // is edit
          axios.put(`/api/data/${props.data.ID}`, item)
            .then(() => {
              // update item to default status
              setItem({ ...defaultItem });
              // refresh list
              props.onSubmit();
            })
            .catch(err => {
              alert(`Error: ${err.message}`);
            });
        } else {
          // is create
          axios.post('/api/data', item)
            .then(() => {
              // update item to default status
              setItem({ ...defaultItem });
              // refresh list
              props.onSubmit();
            })
            .catch(err => {
              alert(`Error: ${err.message}`);
            });
        }

      }}>
      <h2>{props.data ? 'Edit user:' : 'Create new user:'}</h2>
      <div>
        <label>Name</label>
        <input required={true} value={item.Name}
               onInput={e => setItem(prevState => ({ ...prevState, Name: e.target.value }))}/>
      </div>
      <div>
        <label>Email</label>
        <input value={item.Email} type={'email'} required={true}
               onInput={e => setItem(prevState => ({ ...prevState, Email: e.target.value }))}/>
      </div>
      <div>
        <label>Age</label>
        <input value={item.Age} type={'number'} step={'1'} min={'0'} required={true}
               onInput={e => setItem(prevState => ({ ...prevState, Age: e.target.value }))}/>
      </div>
      <div>
        <label>Status</label>
        <input checked={item.Status} type={'checkbox'}
               onChange={e => setItem(prevState => ({ ...prevState, Status: e.target.checked }))}/>
      </div>
      <div>
        <label>English</label>
        <input checked={item.Class.includes('English')} type={'checkbox'}
               onChange={e => toggleItemClass(e.target.checked, 'English')}/>

        <label>Math</label>
        <input checked={item.Class.includes('Math')} type={'checkbox'}
               onChange={e => toggleItemClass(e.target.checked, 'Math')}/>

        <label>Chinese</label>
        <input checked={item.Class.includes('Chinese')} type={'checkbox'}
               onChange={e => toggleItemClass(e.target.checked, 'Chinese')}/>
      </div>
      <br/>
      <button>Submit</button>
    </form>
  );
}