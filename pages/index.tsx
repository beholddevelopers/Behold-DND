import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
//import styles from '../styles/Home.module.css';
import Paths from '../components/Session/Path/Component.tsx';
import Editor from '../components/Session/Doc-Editor/Component.tsx'
import HPContainer from '../components/Initiative-Tracker/Hitpoints-Containers/Component.tsx';

export default function Home() {
  //console.log(styles)
  return <div>
    <Paths data={[{start:{x:0,y:0},end:{x:100,y:100}}]}></Paths>
    <Paths data={[{start:{x:100,y:100},end:{x:200,y:200}}]}></Paths>
    <Editor/>
    <HPContainer/>
    <HPContainer/>
  </div>
  //return 

}
