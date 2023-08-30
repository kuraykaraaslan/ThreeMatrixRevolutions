import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import Terrain from './elements/terrain';
import Rain from './elements/rain';
import Building from './elements/building';
import { Plane } from '@react-three/drei';
import Smiths from './elements/person/smith';
import SingleSmith from './elements/person/smith/single';

import SingleNeo from './elements/person/neo/single';

import Windows from './elements/window';

import Water from './elements/water';

import {useThree} from '@react-three/fiber';

import Box from './elements/box';

function limitCamera(camera)
{
            // limit camera position
            if (camera.position.y < 0.5) {
                camera.position.y = 0.5;
            } else if (camera.position.y > 60) {
              camera.position.y = 60;
            } 
    
            if (camera.position.x < -20) 
            {
              camera.position.x = -20;
            } else if (camera.position.x > 20)
            {
              camera.position.x = 20;
            } 
    
            if (camera.position.z < -50)
            {
              camera.position.z = -50;
            } else if (camera.position.z > 50)  
            {
              camera.position.z = 50;
            }
}

export default function MainScene() {

    const { camera } = useThree();

    useFrame(() => {

        //limitCamera(camera);
               

    });

    return (
        <>
            <ambientLight intensity={1} />
            {/* Road */}
            <Terrain position={[0, 0, 0]} size={[50, 100]} image='road1'/> 
            {/* Road Lines */}
            <Plane position={[0.2, 0.001, 0]} args={[0.2, 100]} rotation={[-Math.PI / 2, 0, 0]} material-color={'yellow'} />
            <Plane position={[-0.2, 0.001, 0]} args={[0.2, 100]} rotation={[-Math.PI / 2, 0, 0]} material-color={'yellow'} />
            {/* Pavement */}
            <Terrain position={[17, 0.2, 0]} size={[5, 100]} image='pav2'  />
            <Box position={[17, 0.1, 0]} size={[5, 0.1, 100]} color={'grey'} />
            <Terrain position={[14.49, 0, 0]} size={[0.5, 100]} image='pav2' rotation={[-Math.PI / 2, -Math.PI / 2, 0]} />
            {/* Pavement 2 */}
            <Terrain position={[-17, 0.2, 0]} size={[5, 100]} image='pav2' />
            <Box position={[-17, 0.1, 0]} size={[5, 0.1, 100]} color={'grey'} />
            <Terrain position={[-14.49, 0, 0]} size={[0.5, 100]} image='pav2' rotation={[-Math.PI / 2, -Math.PI / 2, 0]} />
            {/* Pavement Lines */}
            <Rain area={[20, 50]} steps={100} speed={0.1} />
            
            <Building position={[22, 0, 0]} size={[6, 50, 100]} />
            <Building position={[-22, 0, 0]} size={[6, 50, 100]} rotation={[0, Math.PI, 0]} />

            {/* Smiths on the pavement */}
            <Smiths rotation={[0, -Math.PI/2, 0]} start={[17, 0.2, -49]} end={[17, 0.2, 49]} number={70} />
            <Smiths rotation={[0, -Math.PI/2, 0]} start={[16, 0.2, -48]} end={[16, 0.2, 48]} number={68} />

            {/* Smiths on the pavement 2 */}
            <Smiths rotation={[0, Math.PI/2, 0]} start={[-17, 0.2, -49]} end={[-17, 0.2, 49]} number={35} />
            <Smiths rotation={[0, Math.PI/2, 0]} start={[-16, 0.2, -48]} end={[-16, 0.2, 48]} number={34} />

            {/*  Water */}
            <Water position={[0, 0.1, 0]} area={[20,50]} />

            {/* Windows */}
            <Windows rotation={[0, -Math.PI/2, 0]} start={[-18.5, 10, -45]} end={[-18.5, 10, 45]} number={9} />
            <Windows rotation={[0, -Math.PI/2, 0]} start={[-18.5, 22, -45]} end={[-18.5, 22, 45]} number={9} />
            <Windows rotation={[0, -Math.PI/2, 0]} start={[-18.5, 34, -45]} end={[-18.5, 34, 45]} number={9} />


            <Windows rotation={[0, Math.PI/2, 0]} start={[18.5, 10, -45]} end={[18.5, 10, 45]} number={9} />
            <Windows rotation={[0, Math.PI/2, 0]} start={[18.5, 22, -45]} end={[18.5, 22, 45]} number={9} />
            <Windows rotation={[0, Math.PI/2, 0]} start={[18.5, 34, -45]} end={[18.5, 34, 45]} number={9} />

            {/* Single Smith */}

            <SingleSmith position={[0, 0.2, -10]} />
            <SingleNeo position={[0, 0.2, 10]} rotation={[0, Math.PI, 0]} />
    </>
    )
}

// export default function Main() {
