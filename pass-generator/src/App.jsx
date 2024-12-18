import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8); //for length of password
  const [numAllow, setNumAllow] = useState(false); //for number allowed or not
  const [charAllow, setCharAllow] = useState(false); //for character allowed or not
  const [password, setPassword] = useState("");
  //callback state is use to optimise the code itse through hm br br data ko re-render kr skte the accroding to change in dependencies
  const passwordGenerate = useCallback(
    function () {
      let pass = "";
      let str = "QWERTYUIOPLKJHGFDSAZXCVBMqwertyuiopasdfghjklzxcvbnm";
      if (numAllow) {
        str += "0987654321";
      }
      if (charAllow) {
        str += "!@#$%^&*(){}:;>,";
      }
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char); //concatinate the value otherwise the values will be overwrite with loop
      }
      setPassword(pass);
    },
    [length, numAllow, charAllow, setPassword]
  );
  //function for copy
  const copyPass = 
    useCallback(()=>{
      copy.current?.select()
      window.navigator.clipboard.writeText(password)
    } , [password])
  
  //use to run the function on onloading of the page it returns a arrow function and dependencies ki kiske change hone pr ky aana chahiye
  useEffect(() => {
    passwordGenerate();
  }, [length, numAllow, charAllow, passwordGenerate]);
  const copy = useRef(null)
  return (
    <>
      <div className="w-full max-w-md mx-auto  shadow-md rounded-lg px-7 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-3xl font-bold pt-3  text-center">
          Password Generator
        </h1>
        <div className="flex justify-evenly align-middle shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none rounded-md w-full py-1 mt-4 px-3"
            placeholder="password"
            readOnly
            ref={copy}
          />
          <button onClick={copyPass}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 mb-2 ml-2">
            <input
              type="range"
              min={8}
              max={42}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
             
            />
            <label>length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1 mb-2 ">
            <input
              type="checkbox"
              defaultChecked={numAllow}
              id="numberInput"
              onChange={() => {
                setNumAllow((prev) => !prev);
              }}
             
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 mb-2 ml-2">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id="charInput"
              onChange={() => {
                setCharAllow((prev) => !prev); //we get previous value in call back in set function
              }}
              
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
