import { useEffect, useState } from 'react';
import './App.css';
import Excel from "exceljs"
import PptxGenJS from 'pptxgenjs';
import { createWordInitials, getStateInitials } from './Utils/functions';

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

  const getVoucherCode = (voucher) => {
    let date = new Date().toLocaleDateString().replaceAll('/', '')
    return `${createWordInitials(voucher.empresa)}${createWordInitials(voucher.cidade)}${getStateInitials(voucher.estado)}${date}#${voucher.quantidade}@${voucher.unidade}`
  }

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
      let textBoxTop = `Este voucher é de propriedade da empresa ${curVoucher.empresa}, Unidade ${curVoucher.unidade}, inscrita no CNPJ: ${curVoucher.cnpj}, situada em ${curVoucher.endereco} - ${getStateInitials(curVoucher.estado)}, CEP: ${curVoucher.cep}.`
      let textBoxTopConfig = { 
        x: 0.7, 
        y: '62%',
        w: '45%', 
        color: '000000', 
        fontSize: 12,
        fontFace: 'Liberation Sans',
      }
      let curDate = new Date()
      curDate.setMonth(curDate.getMonth() + 1)
      let textBoxBottom = `O código é válido para ${curVoucher.quantidade} licença${Number(curVoucher.quantidade) > 1 ? 's' : ''} do Curso: ${curVoucher.curso}, o cupom é válido até o dia ${curDate.toLocaleDateString()}.`
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
    pres.writeFile(`Vouchers-${new Date().toLocaleDateString()}.pdf`)
  }

  const readXLSX = async () => {
    const vouchers = []
    const workbook = new Excel.Workbook()
    await workbook.xlsx.load(file)
    workbook.eachSheet((worksheet) => {
      worksheet.eachRow((row, rowId) => {
        let curVoucher = rowId - 1
        vouchers.push({})
        vouchers[curVoucher].id = rowId
        let attributes = [
          'cidade',
          'quantidade', 
          'unidade', 
          'empresa', 
          'cnpj', 
          'endereco', 
          'estado',
          'curso',
          'cep',
        ]
        row.eachCell((cell, cellId) => {
          let curAttribute = cellId - 1
          vouchers[curVoucher][attributes[curAttribute]] = typeof(cell.value) === 'object' ? cell.value.text : cell.value
        })
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
