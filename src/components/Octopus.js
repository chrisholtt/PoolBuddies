import Spline from '@splinetool/react-spline';
import { useRef } from 'react';
import '../stylesheets/Octopus.css'

export default function Octopus() {

    const octopus = useRef();


    function onLoad(spline) {
        const obj = spline.findObjectByName('octopus');
        // or
        // const obj = spline.findObjectById('8E8C2DDD-18B6-4C54-861D-7ED2519DE20E');
    
        // save it in a ref for later use
        octopus.current = obj;
      }

      function moveObj() {
        console.log(octopus.current); // Spline Object => { name: 'Cube', id: '8E8C2DDD-18B6-4C54-861D-7ED2519DE20E', position: {}, ... }
    
        // move the object in 3D space
        octopus.current.position.x += 10;
      }
    
  return (
    <>
    <div className='octopus'>
        <Spline scene="https://prod.spline.design/ka4X2Z4nx5UBPTEB/scene.splinecode" onLoad={onLoad}/>
    </div>
    
    </>  
    
  );
}

