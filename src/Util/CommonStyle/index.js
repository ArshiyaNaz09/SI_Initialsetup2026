import React, { Component } from 'react';
import Toast from 'react-native-root-toast';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


/* --------------------------------   FontFamily   -------------------------- */
const FontFamily = {
    bold: "OpenSans-Bold",
    regular: "OpenSans-Regular",
    italic: "OpenSans-Italic",
};

/* -------------------------------    Color   -------------------------------- */
const Colors = {
    primary: '#5c6672',
    secondary: '#738591'
};

/* --------------------------------    Icons  ------------------------------- */
export { FontFamily, Colors };
import LeftLogoIcon from '../../assets/img/icons/leftLogo.svg';
import RightLogoIcon from '../../assets/img/icons/rightLogo.svg';
import ActiveAdafsaIns from '../../assets/img/icons/svg/activeAdafsaInspectionIcon.svg';
import ActiveCompletedTask from '../../assets/img/icons/svg/activeCompleredTaskIcon.svg';
import ActiveDirectTask from '../../assets/img/icons/svg/ActiveDirectTaskIcon.svg';
import ActiveScheduledTask from '../../assets/img/icons/svg/activeScheduledTaskIcon.svg';
import ActiveSelfIns from '../../assets/img/icons/svg/activeSelfInspectionIcon.svg';
import DailyIcon from '../../assets/img/icons/svg/dailyIcon.svg';
import DashboardIcon from '../../assets/img/icons/svg/dashboardIcon.svg';
import Delayed from '../../assets/img/icons/svg/delayedIcon.svg';
import Download from '../../assets/img/icons/svg/download.svg';
import InactiveAdafsaIns from '../../assets/img/icons/svg/inactiveADAFSAInspectionIcon.svg';
import InactiveCompletedTask from '../../assets/img/icons/svg/inactiveCompletedTaskIcon.svg';
import InactiveDirectTask from '../../assets/img/icons/svg/inactiveDirectTaskIcon.svg';
import InactiveScheduledTask from '../../assets/img/icons/svg/inactiveScheduledTaskIcon.svg';
import InactiveSelfIns from '../../assets/img/icons/svg/inactiveSelfinspectionIcon.svg';
import PendingTask from '../../assets/img/icons/svg/pendingtaskIcon.svg';
import RecallsIcon from '../../assets/img/icons/svg/recallsIcon.svg';
import InProgress from '../../assets/img/icons/svg/inprogress.svg';
import ManualIcon from '../../assets/img/icons/manualsIcon.jpg';
import SI_Logo_ArabicIcon from '../../assets/img/icons/arabicSelfinspectionLogo.svg'
import SI_Logo_EnglishIcon from '../../assets/img/icons/selfInspectionImage.svg'

export const IconLeftActive = (props) => {
    return<ActiveDirectTask width={25} height={25} />;}
export const IconRightActive = (props) => {
    return<ActiveCompletedTask width={25} height={25} />;}
export const IconLeftInActive = (props) => {
    return<InactiveDirectTask width={25} height={25} />;}
export const IconRightInActive = (props) => {
    return<InactiveCompletedTask width={25} height={25} />;}
export const IconLeftActiveRoutine = (props) => {
    return<ActiveScheduledTask width={25} height={25} />;}
export const IconLeftInActiveRoutine = (props) => {
    return<InactiveScheduledTask width={25} height={25} />;}
export const IconLeftActiveDaily = (props) => {
    return<ActiveSelfIns width={25} height={25} />;}
export const IconRightActiveDaily = (props) => {
    return<ActiveAdafsaIns width={25} height={25} />;}
export const IconLeftInActiveDaily =(props) => {
    return <InactiveSelfIns width={25} height={25} />;}
export const IconRightInActiveDaily = (props) => {
    return<InactiveAdafsaIns width={25} height={25} />;}

// export const PendingtaskIcon = <PendingTask width={35} height={35} />;
export const PendingtaskIcon = (props) => {
    return <PendingTask width={35} height={35} {...props} />;};
export const DownloadIcon = (props) => {
    return <InProgress width={35} height={35} {...props}/>;}
export const DelayedIcon = () => {
    return<Delayed width={35} height={35} />;}
export const SI_Logo_Arabic = (props) => {
    return<SI_Logo_ArabicIcon width={170} height={50} {...props} />;}
export const SI_Logo_English = (props) => {
    return<SI_Logo_EnglishIcon width={170} height={50} {...props} />;}

export const LeftLogo = (props) => <LeftLogoIcon {...props} />;

export const RightLogo = (props) => <RightLogoIcon {...props} />;

export {
    ManualIcon,/*  SI_Logo_Arabic, SI_Logo_English,  LeftLogo, RightLogo,*/ DailyIcon, DashboardIcon, Download
    , RecallsIcon
}

export const toast = (text) => {
    Toast.show(text, {
        duration: Toast.durations.SHORT,
        position: 0,
    })
}

export async function getUserdetails() {
    try {
        return JSON.parse(await AsyncStorage.getItem('userdetails'));
    } catch (e) {
        console.log('getUser -> e', e);
    }
}

export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;