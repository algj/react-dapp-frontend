export function formatNumber(num, accuracy=2) {
  if (num === undefined) return "-";
  if (Number.isNaN(num) && typeof num != "number") return num;
  if (typeof num == "string") num -= 0;
  if (num === 0){
    return (0).toFixed(accuracy);
  } else if (num >= 1000000000000) {
    return Math.floor(num / 1000000000000).toLocaleString('fullwide', {useGrouping: false}) + ' T';
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(accuracy) + ' B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(accuracy) + ' M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(accuracy) + ' K';
  } else if (num >= 1) {
    return num.toFixed(accuracy);
  } else {
    let tempNum = num;
    while (tempNum < 1) {
      tempNum *= 10;
      accuracy++;
    }
    return num.toFixed(accuracy).replace(/\.?0+$/, ''); // honestly, this is cursed, but who cares, it works
  }
}

export function formatAddress(address) {
  let preprefix = "";
  if(address.startsWith("0x")){
    address = address.substring(2);
    preprefix="0𝚡";
  }
  const prefix = address.substring(0, 4);
  const suffix = address.substring(address.length - 4);
  return preprefix + prefix + "…" + suffix;
}