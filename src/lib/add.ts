type Result = { title: string, total?: number, items: RecordItem[] }[]

function add(output:Result,input:Result) {
  let amountOutput = 0
  let amountInput = 0
  if (!output || output.length === 0){return}
  output.forEach(item=>{
    const a = item.total || 0
    amountOutput += a
  })
  if (!input || input.length===0){return;}
  input.forEach(item=>{
    const b = item.total || 0
    amountInput += b
  })
  return {amountInput,amountOutput}
}
export default add