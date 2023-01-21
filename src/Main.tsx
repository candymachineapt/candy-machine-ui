import {Routes, Route} from 'react-router-dom';
import {EditCandyMachine} from './components/EditCandyMachine';
import Home from './components/Home';
import CandyMachines from "./components/CandyMachines";
import FAQ from './components/FAQ';
import PrivateRouterPage from './components/PrivateRouterPage';
import React from "react";
import Concepts from './components/Concepts';
import {Feedback} from "./components/Feedback";
import { Success } from './components/Success';
import MintPage from './components/MintPage';
import FastTutorial from "./components/FastTutorial";

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/faq' element={<FAQ/>}/>
            <Route path='/tutorial' element={<FastTutorial/>}/>
            <Route path='/feedback' element={<Feedback/>}/>
            <Route path='/success' element={<Success/>}/>
            <Route path='/concepts' element={<Concepts/>}/>
            <Route path='/candy_machine/' element={<MintPage/>}/>
            <Route path='/candy_machine/:candyMachineAddress' element={<MintPage/>}/>
            <Route path='/candy_machines' element={<CandyMachines/>}/>
            <Route path='/edit_candy_machine/:candyMachineAddress'
                   element={
                       <PrivateRouterPage>
                           <EditCandyMachine/>
                       </PrivateRouterPage>
                }
            />
        </Routes>
    );
}
export default Main;