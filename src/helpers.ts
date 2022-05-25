export const isMobile = (): boolean => {
  const regex =
    /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i;

  if (regex.test(navigator.userAgent)) return true;
  return false;
};

export const getAge = (birthdate: string | undefined): number => {
  if (!birthdate) return 0;

  const birthdateTimestamp = new Date(birthdate).getTime();

  if (isNaN(birthdateTimestamp)) return 0;

  const todayTimestamp = new Date().getTime();
  const diff = new Date(todayTimestamp - birthdateTimestamp).getFullYear();

  return diff - 1970;
};

export class DateTime {
  private today: Date;
  private date: Date;

  constructor(date: string = '') {
    this.today = new Date();
    const regex = RegExp(/\b[1-9]{1}\d{3}-\d{2}-\d{2}\b/);
    this.date = regex.test(date) ? new Date(date) : new Date();
  }

  getToday() {
    return this.today
      .toLocaleDateString('ja', {
        month: '2-digit',
        year: 'numeric',
        day: '2-digit',
      })
      .split('/')
      .join('-');
  }

  getDate() {
    return this.date
      .toLocaleDateString('ja', {
        month: '2-digit',
        year: 'numeric',
        day: '2-digit',
      })
      .split('/')
      .join('-');
  }

  getTimestamp() {
    return this.date.getTime();
  }

  daysDiff() {
    const todayTimestamp = new Date().getTime();

    let timestampDiff = this.getTimestamp() - todayTimestamp;

    let pastOrFuture = 1;

    if (timestampDiff < 0) {
      timestampDiff *= -1;
      pastOrFuture = -1;
    }

    let days = 0;
    if (pastOrFuture === 1) {
      days = Math.ceil(timestampDiff / 60 / 60 / 24 / 1000) * pastOrFuture;
    } else {
      days = Math.floor(timestampDiff / 60 / 60 / 24 / 1000) * pastOrFuture;
    }

    return days;
  }

  daysDiffFrom(dateToCompare: DateTime) {
    let timestampDiff = this.getTimestamp() - dateToCompare.getTimestamp();

    let pastOrFuture = 1;

    if (timestampDiff < 0) {
      timestampDiff *= -1;
      pastOrFuture = -1;
    }

    let days = 0;
    if (pastOrFuture === 1) {
      days = Math.ceil(timestampDiff / 60 / 60 / 24 / 1000) * pastOrFuture;
    } else {
      days = Math.floor(timestampDiff / 60 / 60 / 24 / 1000) * pastOrFuture;
    }

    return days;
  }

  setYear(n: number) {
    if (!isNaN(n)) this.date.setFullYear(n);
  }

  addYear(n: number) {
    if (!isNaN(n)) this.date.setFullYear(this.date.getFullYear() + n);
  }

  subtractYear(n: number) {
    if (!isNaN(n)) this.date.setFullYear(this.date.getFullYear() - n);
  }

  setMonth(n: number) {
    if (!isNaN(n)) this.date.setMonth(n - 1);
  }

  addMonth(n: number) {
    if (!isNaN(n)) this.date.setMonth(this.date.getMonth() + n);
  }

  subtractMonth(n: number) {
    if (!isNaN(n)) this.date.setMonth(this.date.getMonth() - n);
  }

  setDay(n: number) {
    if (!isNaN(n)) this.date.setDate(n);
  }

  addDay(n: number) {
    if (!isNaN(n)) this.date.setDate(this.date.getDate() + n);
  }

  subtractDay(n: number) {
    if (!isNaN(n)) this.date.setDate(this.date.getDate() - n);
  }
}
