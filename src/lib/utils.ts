const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const timeUnits = {
    year: 365 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
} as const;

export const formatRelativeDate = (date: Date): string => {
    const now = new Date();
    const difference = date.getTime() - (now.getTime() + now.getTimezoneOffset() * 60000);

    for (const [unit, msPerUnit] of Object.entries(timeUnits)) {
        if (Math.abs(difference) >= msPerUnit) {
            return formatter.format(Math.trunc(difference / msPerUnit), unit as Intl.RelativeTimeFormatUnit);
        }
    }

    return formatter.format(0, "second");
}