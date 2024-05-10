export function getDate(epoch) {
    const dateObj = new Date(epoch * 1000);
    const month = dateObj.getMonth() + 1; // months from 1-12
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
  
    // Using padded values, so that 2023/1/7 becomes 2023/01/07
    const pMonth = month.toString().padStart(2, "0");
    const pDay = day.toString().padStart(2, "0");
    const newPaddedDate = `${year}/${pMonth}/${pDay}`;
  
    return newPaddedDate;
}


export function getDateDiff(date, cb) {
    const timeDiff = new Date(date * 1000).getTime() - new Date().getTime();
  
    const dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));

    return dayDiff
  }
  