import moment from 'moment';

export const formatTime = (time: Date) => 
    moment(time).format("LLL");

export const elapsedTime = (time: Date) =>
    moment(time).fromNow();