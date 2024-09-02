const ConvertTimeTohour = (hours) => {
    const totalSeconds = hours * 3600;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.round(totalSeconds % 60);
  
    return {
      hours: h,
      minutes: m,
      seconds: s
    };
}

export default ConvertTimeTohour