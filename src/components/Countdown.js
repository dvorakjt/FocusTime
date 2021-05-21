import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMilisecs = (minutes) => minutes * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ mins = 20, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);

  const [millisecs, setMillisecs] = useState(minutesToMilisecs(mins));

  const countDown = () => {
    setMillisecs((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  const minutes = Math.floor(millisecs / 1000 / 60) % 60;
  const seconds = Math.floor(millisecs / 1000) % 60;

  useEffect(() => {
    setMillisecs(minutesToMilisecs(mins));
  }, [mins]);

  useEffect(() => {
    onProgress(millisecs / minutesToMilisecs(mins));
    if(millisecs === 0) onEnd();
  }, [millisecs])

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(minutes)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: fontSizes.xxxl,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
