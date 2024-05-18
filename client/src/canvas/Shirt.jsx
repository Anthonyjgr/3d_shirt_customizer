import React, { useEffect, useState } from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [values, setValues ] =  useState({})
  
  
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  
  const fullAspect = snap.fullDecal.image?.width / snap.fullDecal.image?.height;
  
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
  
  const stateString = JSON.stringify(snap);
  
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      // shirtPositionAndScale()
    };
    window.addEventListener('resize', handleResize);
    
      if(screenWidth <= 390){
        setValues ({scale: .6, position:[0,-.15,0]}) 
  
      }else if(screenWidth <= 600 && screenWidth >= 391){
        setValues ({scale: .7, position:[0,-.1,0]}) 
  
      }else if(screenWidth <= 1280 && screenWidth >= 601){
        setValues ({scale: .8, position:[0,-.15,0]}) 
  
      }else if(screenWidth <= 1400 && screenWidth >= 1281){
        setValues ({scale: .8, position:[-.15,0,0]}) 
  
      }else if(screenWidth <= 1600 && screenWidth >= 1401){
        setValues ({scale: .8, position:[-.1,0,0]}) 
      }else{
        setValues ({scale: 1, position:[-.15,0,0]}) 
      }
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);
  

  return (

    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        scale={
          snap.intro ? values?.scale : screenWidth <= 500 ? .8 : 1}
        position={snap.intro ? values?.position :  [0,0,0]}
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={.2} 
            map={logoTexture}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>

  )
};

export default Shirt;
