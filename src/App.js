import { useEffect, useState } from 'react';
import './App.css';
import Excel from "exceljs"

function App() {

  const [file, setFile] = useState(null)
  const [allVouchers, setAllVouchers] = useState([])

  useEffect(() => {
    if(file !== null) {
      readXLSX()
    }
  }, [file])

  useEffect(() => {
    console.log(allVouchers)
  }, [allVouchers])

  const readXLSX = async () => {

    const vouchers = []

    const workbook = new Excel.Workbook()
    await workbook.xlsx.load(file)
    workbook.eachSheet((worksheet, sheetId) => {
      worksheet.eachRow((row, rowId) => {
        vouchers.push({})
        vouchers[rowId-1].id = rowId
        let attributes = ['cupom', 'quantidade', 'unidade', 'empresa', 'cnpj', 'endereco', 'cep']
        row.eachCell((cell, cellId) => {
          let curVoucher = rowId - 1
          let curAttribute = cellId - 1
          vouchers[curVoucher][attributes[curAttribute]] = cell.value
        })
      })
    });
    setAllVouchers(vouchers)
  }

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    </div>
  );
}

export default App;
