import React from "react";
import { useTable } from "react-table";
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
 import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';


export default function Table({ columns, data }) {
 
  
const pagination = paginationFactory({
page:1,
sizePerPage:5,
lastPageText: '>>',
firstPageText: '<<',
nextPageText: '>',
showTotal:true,
alwaysShowAllBtns:true,
onPageChange: function(page, sizePerPage) {
console.log('page',page);
console.log('sizePerPage',sizePerPage);
},
onSizePerPageChange: function (page, sizePerPage){
console.log('page',page);
console.log('sizePerPAge',sizePerPage);
}
}); 


  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
  <BootstrapTable 
  bootstrap4 
  keyField='id' 
  columns={columns} 
  data={data} 
  pagination={pagination}
  filter={filterFactory()}
  />
  
  );
}