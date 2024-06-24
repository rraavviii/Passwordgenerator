import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false)
  const [cahrallowed, setcharallowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEGFHIJKLMNOPQRSTIVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberallowed) {
      str += "0123456789"
    }
    if (cahrallowed) {
      str += "@#$%&*()+"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberallowed, cahrallowed, setPassword])
const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,length)
  window.navigator.clipboard.writeText(password)
}, [password])

  useEffect(() => {
    passwordgenerator()
  }, [length, numberallowed, cahrallowed, passwordgenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} placeholder='Password' readOnly ref={passwordRef}
            className='outline-none w-full py-1 px-3' />

          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-5m gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberallowed}
              id='numberinput'
              className='cursor-pointer'
              onChange={() => {
                setnumberallowed((prev) => !prev)
              }}
            />
            <label htmlFor="">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={cahrallowed}
              id='charinput'
              className='cursor-pointer'
              onChange={() => {
                setcharallowed((prev) => !prev)
              }}
            />
            <label htmlFor="">Charector</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
