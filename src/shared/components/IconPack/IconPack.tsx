import React from 'react';
import {
  FaBell,
  FaBomb,
  FaCloudMeatball,
  FaCloudMoonRain,
  FaCloudShowersHeavy,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaFlag,
  FaLock,
  FaStar,
  FaSun,
} from 'react-icons/fa';

type Props = { color?: string };
export default {
  FaSun: (props?: Props): JSX.Element => <FaSun style={{ color: props?.color ?? '#000' }} />,
  FaBell: (props?: Props): JSX.Element => <FaBell style={{ color: props?.color ?? '#000' }} />,
  FaStar: (props?: Props): JSX.Element => <FaStar style={{ color: props?.color ?? '#000' }} />,
  FaLock: (props?: Props): JSX.Element => <FaLock style={{ color: props?.color ?? '#000' }} />,
  FaBomb: (props?: Props): JSX.Element => <FaBomb style={{ color: props?.color ?? '#000' }} />,
  FaFlag: (props?: Props): JSX.Element => <FaFlag style={{ color: props?.color ?? '#000' }} />,
  FaCloudMeatball: (props?: Props): JSX.Element => (
    <FaCloudMeatball style={{ color: props?.color ?? '#000' }} />
  ),
  FaCloudMoonRain: (props?: Props): JSX.Element => (
    <FaCloudMoonRain style={{ color: props?.color ?? '#000' }} />
  ),
  FaCloudShowersHeavy: (props?: Props): JSX.Element => (
    <FaCloudShowersHeavy style={{ color: props?.color ?? '#000' }} />
  ),
  FaExclamationCircle: (props?: Props): JSX.Element => (
    <FaExclamationCircle style={{ color: props?.color ?? '#000' }} />
  ),
  FaExclamationTriangle: (props?: Props): JSX.Element => (
    <FaExclamationTriangle style={{ color: props?.color ?? '#000' }} />
  ),
};
