import React from "react";
import { Symbols } from "./type";

export const SquareIcon: React.FC<{
    symbol: Symbols,
    stroke?: 'default' | 'custom';
}> = ({ symbol, stroke = 'default' }) => {

  return (
    symbol ?
        (symbol === 'O') ?
            <svg  xmlns="http://www.w3.org/2000/svg" className={`icon${(stroke === 'custom') ? ' white-stroke' : ''}`} viewBox="0 0 128 128"><path d="M64,16A48,48 0 1,0 64,112A48,48 0 1,0 64,16"></path></svg>
        :
            <svg xmlns="http://www.w3.org/2000/svg" className={`icon${(stroke === 'custom') ? ' grey-stroke' : ''}`} viewBox="0 0 128 128"><path d="M16,16L112,112"></path><path d="M112,16L16,112"></path></svg>
     : null
  );
};

export default SquareIcon;
