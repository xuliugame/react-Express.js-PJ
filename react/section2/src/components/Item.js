import axios from 'axios';
import { useState } from 'react';
import Form from './Form';

/**
 * Component to display each data item
 * @param data
 * @param onChange
 * @returns {JSX.Element}
 * @constructor
 */
export default function Item ({ data, onChange }) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className={'item'}>
      <div>Name: {data.Name}</div>
      <div>Email: {data.Email}</div>
      <div>Age: {data.Age}</div>
      <div>Status: {data.Status.toString()}</div>
      <div>Class: {data.Class ? data.Class.join(', ') : ''}</div>
      <div>
        <button type={'button'}
                onClick={() => setShowEdit(prevState => !prevState)}>{showEdit ? 'Cancel' : 'Edit'}</button>
        <button type={'button'} onClick={() => {
          if (window.confirm('Are you sure?')) {
            // perform delete
            axios.delete(`/api/data/${data.ID}`)
              .then(onChange);
          }
        }}>Delete
        </button>
      </div>
      {
        showEdit && <Form data={data} onSubmit={() => {
          // on edit form submit, refresh list
          onChange();
          // hide this form
          setShowEdit(false);
        }}/>
      }
    </div>
  );
}
