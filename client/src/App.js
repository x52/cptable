import React, { useMemo, useState, useEffect } from "react";
import axios from 'axios';
import Table from "./Table";
import Video from "./Video";
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
 import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';


function App() {

  const [data, setData] = useState([]);


  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:4000/city");
      setData(result.data);
    })();
  }, []);


    const columns = [
{dataField:'_id', text:'Id'},
{dataField:'city', text:'City',sort:true, filter: textFilter()},
{dataField:'loc', text:'Location',sort:true, filter: textFilter()},
{dataField:'pop', text:'Population',sort:true, filter: textFilter()},
{dataField:'state', text:'State',sort:true, filter: textFilter()},
];


  

  return (
    <div className="App">
    <Video />
      <Table columns={columns} data={data} />
      
    </div>
  );
}

export default App;


