function parseTime(time) {
    const [hour, min] = time.split(':');
    console.log(time, hour, min);
    return Number(hour) * 60 + Number(min);
}

function lastTimestamp(content) {
    const len = content.length;
    console.log(content);
    for(let i = len - 1; i >= 0; --i) {
        if (content[i].timestamp) {
            return content[i].timestamp
        }
    }
    return undefined;
}

export function shouldInsertTimestamp(data) {
    const last = lastTimestamp(data.content);
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    if (last) {
        const lastTime = parseTime(last);
        console.log(lastTime, currentTime)
        return Math.abs(currentTime - lastTime) > 1;
    }
    return true;
}