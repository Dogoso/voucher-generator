import { useEffect, useState } from 'react';
import './App.css';
import Excel from "exceljs"
import PptxGenJS from 'pptxgenjs';
import { formatDate, formatUnity, getStateInitials, getVoucherCode } from './Utils/functions';

function App() {

  const [file, setFile] = useState(null)
  const [allVouchers, setAllVouchers] = useState([])

  useEffect(() => {
    if(file !== null) {
      readXLSX()
    }
  }, [file])

  useEffect(() => {
    if(allVouchers.length > 0) {
      createVouchers(allVouchers)
      setAllVouchers([])
      setFile(null)
    }
  }, [allVouchers])

  const createVouchers = (allVouchers) => {
    let pres = new PptxGenJS()
    allVouchers.forEach((curVoucher) => {
      let slide = pres.addSlide()
      let textBoxCupom = getVoucherCode(curVoucher)
      let textBoxCupomConfig = { 
        x: '63%', 
        y: '50%', 
        w: '30%', 
        color: 'FFFFFF', 
        fontSize: 24, 
        fontFace: 'Arial Black',
      }
      let textBoxTop = `Este voucher é de propriedade da empresa ${curVoucher.empresa}, Unidade ${formatUnity(curVoucher)}, inscrita no CNPJ: ${curVoucher.cnpj}, situada em ${curVoucher.endereco}, ${curVoucher.cidade} - ${getStateInitials(curVoucher.estado)}, CEP: ${curVoucher.cep}.`
      let textBoxTopConfig = { 
        x: 0.7, 
        y: '62%',
        w: '45%', 
        color: '000000', 
        fontSize: 12,
        fontFace: 'Liberation Sans',
      }
      let curDate = formatDate(new Date())
      curDate = curDate.replace(curDate.slice(3, 5), String(Number(curDate.slice(3, 5)) + 1).padStart(2, '0'))
      let textBoxBottom = `O código é válido para ${curVoucher.quantidade} licença${Number(curVoucher.quantidade) > 1 ? 's' : ''} do Curso: ${curVoucher.curso}, o cupom é válido até o dia ${curDate}.`
      let textBoxBottomConfig = { 
        x: 0.7, 
        y: '78%', 
        w: '45%', 
        color: '000000', 
        fontSize: 12,
        fontFace: 'Liberation Sans',
      }
      let textBoxFooter = `grupomayeread.com - contato@grupomayeread.com.br`
      let textBoxFooterConfig = { 
        x: 0.7, 
        y: '87.5%', 
        color: '000000', 
        fontSize: 12,
        fontFace: 'Liberation Sans', 
      }

      slide.addImage({ 
        path: 'resources/voucher.png', 
        w: '100%',
        h: '100%',
      })
      slide.addText(textBoxCupom, textBoxCupomConfig)
      slide.addText(textBoxTop, textBoxTopConfig)
      slide.addText(textBoxBottom, textBoxBottomConfig)
      slide.addText(textBoxFooter, textBoxFooterConfig)
    })
    pres.writeFile(`Vouchers-${formatDate(new Date())}.pdf`)
  }

  const readXLSX = async () => {
    const vouchers = []
    const workbook = new Excel.Workbook()
    await workbook.xlsx.load(file)
    workbook.eachSheet((worksheet) => {
      let attributes = []
      /*
        cidade
        quantidade 
        unidade 
        empresa 
        cnpj
        endereco 
        estado
        curso
        cep
      */
      worksheet.eachRow((row, rowId) => {
        if(rowId === 1) {
          row.eachCell((cell) => {
            attributes.push(
              (typeof(cell.value) === 'object' ? cell.value.text : cell.value).toLowerCase()
            )
          })
        } else {
          let curVoucher = rowId - 2
          vouchers.push({})
          console.log(curVoucher, vouchers, vouchers[curVoucher])
          vouchers[curVoucher].id = rowId
          row.eachCell((cell, cellId) => {
            let curAttribute = cellId - 1
            vouchers[curVoucher][attributes[curAttribute]] = typeof(cell.value) === 'object' ? cell.value.text : cell.value
          })
        }
      })
    });
    setAllVouchers(vouchers)
  }

  return (
    <section className='centered'>
      <h1 className='title'>Gerador de vouchers</h1>
      <div className='centered container'>
        <label className='label'>Selecione o arquivo XLSX:</label>
        <div>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
      </div>
      <small>Silas Juan &copy; todos os direitos reservados.</small>
    </section>
  );
}

export default App;
