import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from './components/Form';
import Item from './components/Item';

function App () {
  // list to display
  const [data, setData] = useState([]);
  // search input value
  const [query, setQuery] = useState('');

  /**
   * fetch data list
   */
  function fetchData () {
    axios.get(query ? `/api/data/query?Name=${query}` : '/api/data')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        alert(`Error: ${err.message}`);
      });
  }

  /**
   * fetch data list on component mount
   */
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <Form onSubmit={fetchData}/>
      <h2>Data List:</h2>
      <div>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder={'Search by Name...'}/>
        <button onClick={fetchData} type={'button'}>Search</button>
      </div>
      <div className={'list'}>{data.map(v => <Item key={v.ID} data={v} onChange={fetchData}/>)}</div>
    </main>
  );
}

export default App;
