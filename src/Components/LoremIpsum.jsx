import { useState } from "react";
import dbLorem from '../dbLorem.json';
import Paragraph1 from "./Paragraph1";

export default function LoremIpsum(){
  // console.log(dbLorem.data)
  // States
  let [stateGeneratedLoremParagraphs, updateStateGeneratedLoremParagraphs] = useState(['']);
  let [stateNoOfParagraphsUserWant, updateStateNoOfParagraphsUserWant] = useState(8);
  let [stateStatusMessage, updateStateStatusMessage] = useState ({
    message: 'hi there i am cortana',
    displayNone : 'displayNone',
    type : 'Error',
    classNames : {
      error: 'text-red-500',
      success: 'text-green-500'
    }
  });
  
  // helper functions
    let userUpdatedNumsParagraphs = (e)=>{
      updateStateNoOfParagraphsUserWant(Number(e.target.value));      
    }
    let generateLoremParagraphs = () => {
      // first validate is the supplied number of paragrahs is valid i.e. 1 to 150 ?
        if(stateNoOfParagraphsUserWant < 0 || stateNoOfParagraphsUserWant> 150){
          // console.log('wait there is an error');
          updateStateStatusMessage(previousState=>(
            {
              ...previousState,
              message: `We are only having maxium of 150 paragraphs as of now, so you're adviced to choose among 1 to 150 range`,
              displayNone: ''
            }
          ));
          // just return
        }else{
          // hide the error
          updateStateStatusMessage(previousState=>(
            {
              ...previousState,
              displayNone: 'displayNone'
            }
          ));          
        }


      // remaining code logic
      // just push the required nos of lorem paragraphs into the updateStateGeneratedLoremParagraphs
      let updatedParagraphData  = [];
        for(let i=0; i<stateNoOfParagraphsUserWant; i++){
          updatedParagraphData.push(dbLorem.data.at(i));
        }
      updateStateGeneratedLoremParagraphs(updatedParagraphData);
    };

  // Return JSX
  return (
    <div className="text-[1.2rem] mt-[1rem] m-[auto] p-[2rem] border-2 border-[#94360b] max-w-[50rem] flex flex-col items-center rounded-xl shadow-2xl gap-[1rem] ">
      <header className="flex flex-col gap-[1rem] justify-center items-center">
        <h1 className='font-semibold text-[2.5rem] smallCaps' >Lorem Ipsum Generator</h1>
        <form className="flex gap-[1rem] items-center ">
          <label htmlFor="inputNumsLoremIpsumParagraphsToGenerate">Paragraphs</label>
          <input type="number"  defaultValue={stateNoOfParagraphsUserWant} min="1" max="150" id='inputNumsLoremIpsumParagraphsToGenerate' required className="text-slate-900 w-[10rem] transition focus:outline focus:outline-2 focus:outline-yellow-500 p-[.5rem]  rounded-md" onChange={(e)=>userUpdatedNumsParagraphs(e)} />
          
          <input type="submit" value="Generate" className="wrapperGeneratePassword  flex gap-[1rem] items-center justify-center outline outline-2 outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer  pb-[.5rem] pt-[.5rem] p-[2rem] rounded-md hover:text-slate-50 text-slate-900" onClick={(e)=>{
            e.preventDefault();
            // let me ge
            generateLoremParagraphs();
          }} />

        </form>
        <div className={`${stateStatusMessage} ${stateStatusMessage.type.toLocaleLowerCase() === 'error' ? stateStatusMessage.classNames.error : stateStatusMessage.classNames.success} ${stateStatusMessage.displayNone} flex gap-[.5rem]` }>
          <span className="font-bold smallCaps text-[2rem]"
          >{stateStatusMessage.type}:</span>
          <span>{stateStatusMessage.message}</span>
        </div>
      </header>
      <section>
        <h2 className="displayNone">Generated Lorem Ipsum</h2>
        <div className="flex flex-col gap-[1rem]">

          {
            stateGeneratedLoremParagraphs.map((paragraph, key) => {
              
             return <Paragraph1 key={key} data={[key,paragraph]}></Paragraph1>
                         
            })
            
          }

        </div>
      </section>
    </div>
  );
}