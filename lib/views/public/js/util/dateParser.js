function parseSecondsToDate (seconds) {
	var ret = {};
	var secondsIn = {
		day: 60*60*24,
		hour: 60*60,
		minute: 60
	}
	if (seconds >= secondsIn.day) {
		ret.days = parseInt(seconds / secondsIn.day);
		seconds -= ret.days * secondsIn.day;
	}
	if (seconds >= secondsIn.hour) {
		ret.hours = parseInt(seconds / secondsIn.hour);
		seconds -= ret.hours * secondsIn.hour;
	}
	if (seconds >= secondsIn.minute) {
		ret.minutes = parseInt(seconds / secondsIn.minute);
		seconds -= ret.minutes * secondsIn.minute;
	}
	ret.seconds = parseInt(seconds);
	return ret;
}
function makeItTwo (number) {
	if (number < 10) {
		number = "0" + number;
	}
	return number;
}
