
export const getNowFormatted = () => {
    
    const date = new Date();

    const year = date.getFullYear();
    const months = date.getMonth();
    const day = date.getDate();

    const hours = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();

    return `${day}/${months}/${year} ${hours}:${mins}:${secs}`;

}