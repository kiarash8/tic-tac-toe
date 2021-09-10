import React from "react";
import { Winer } from "./type";

export const Background: React.FC<{
    winer: Winer;
}> = ({ winer }) => {
    const strokeColor = winer?.player === 'O' ? 'rgb(242, 235, 211)' : 'rgb(84, 84, 84)';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="background" style={{width: '216px'}}>
        <path d="M108,83L6,83"></path>
        <path d="M108,153L6,153"></path>
        <path d="M108,83L210,83"></path>
        <path d="M108,153L210,153"></path>
        <path d="M73,118L73,16"></path>
        <path d="M143,118L143,16"></path>
        <path d="M73,118L73,220"></path>
        <path d="M143,118L143,220"></path>
        {winer?.winLine && [
            // horizontal
            <path d="M209.1,48H6.9" style={{stroke: strokeColor, strokeWidth: '6px', strokeDasharray: 210, strokeDashoffset: 0}}></path>,
            <path d="M209.1,116H6.9" style={{stroke: strokeColor, strokeWidth: '6px', strokeDasharray: 210, strokeDashoffset: 0}}></path>,
            <path d="M209.1,184H6.9" style={{stroke: strokeColor, strokeWidth: '6px', strokeDasharray: 210, strokeDashoffset: 0}}></path>,
            // vertical
            <path d="M40,219.1V16.9" style={{stroke: strokeColor, strokeWidth: '6px', strokeDasharray: 210, strokeDashoffset: 0}}></path>,
            <path d="M108,221.6V19.4" style={{stroke: strokeColor, strokeWidth: '6px', strokeDasharray: 210, strokeDashoffset: 0}}></path>,
            <path d="M176,221.6V19.4" style={{stroke: strokeColor, strokeWidth: '6px', strokeDasharray: 210, strokeDashoffset: 0}}></path>,
            // diagonal
            <path d="M7,15.1L211.6,219" style={{stroke: strokeColor, strokeWidth: '6px', strokeDasharray: 285, strokeDashoffset: 0}}></path>,
            <path d="M208,14.8L4.1,219.4" style={{stroke: strokeColor, strokeWidth: '6px', strokeDasharray: 285, strokeDashoffset: 0}}></path>
        ][winer.winLine - 1]}
    </svg>
  );
};

export default Background;
