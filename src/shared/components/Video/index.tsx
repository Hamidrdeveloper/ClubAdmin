/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Component, ReactElement, useRef } from "react";
import {
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
  } from 'video-react';
import React from 'react'
import Styles from './Video.style';
import { Button } from "antd";
import { Link } from "react-router-dom";
 const VideoRender= ({value}): ReactElement =>{

  return (
    <>
      <Styles.MainContainer
       style={{
        width: `200px`,
        height: `150px`,
        alignItems: "center",
    justifyContent: "center",
    display: "contents",
      }} >
          <Button type="primary" size={'large'}  onClick={()=>window.open(value, '_blank', 'noreferrer')}>
            {"Open Video"}
          </Button>
    
   </Styles.MainContainer>

    </>
  )
}
export default VideoRender;
