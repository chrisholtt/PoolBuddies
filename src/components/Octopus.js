import Spline from '@splinetool/react-spline';
import { useRef } from 'react';
import '../stylesheets/Octopus.css'

export default function Octopus() {

    const octopus = useRef();


    function onLoad(spline) {
        const obj = spline.findObjectByName('octopus');
        octopus.current = obj;
      }

      function moveObj() {
        console.log(octopus.current); 
        octopus.current.position.x += 10;
      }
    
  return (
    <>
    <div className='octopus-div'>
        {/* <Spline scene="https://prod.spline.design/ka4X2Z4nx5UBPTEB/scene.splinecode" onLoad={onLoad} moveObj={moveObj}/>
        <iframe src='https://my.spline.design/untitled-af7e234bef0a2a24d362d1313dbc1b51/' frameborder='0' width='100%' height='100%'></iframe> */}
        <img src='/static/Octopus.jpg' className='octopus' />
    </div>
    
    </>  
    
  );
}

