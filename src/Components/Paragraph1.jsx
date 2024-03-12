export default function Paragraph1({data}){
  if(data[1].length <=0 ){
    return;
  }
  // console.log(data[1].length);
  // console.log('hi there')
  return (    
    <p>
      <span className="font-bold">#{data[0]+1} </span>
      <span>{data[1]}</span>      
    </p>
    
  );
}