import React, { useRef, useState } from 'react'


export default function Box(props) {
    if (props.position) {
        var position = props.position;
    }
    else {
        var position = [0, 0, 0];
    }

    if (props.size) {
        var size = props.size;
    }
    else {
        var size = [1, 1, 1];
    }

    var final_position = [position[0], position[1] + (size[1] / 2), position[2]];

    if (props.color) {
        var color = props.color;
    }
    else {
        var color = 'red';
    }


    return (
      <mesh
        {...props}
        >
        <boxGeometry args={size} position={final_position} />
        <meshStandardMaterial color={color} />
      </mesh>
    )
  }
  