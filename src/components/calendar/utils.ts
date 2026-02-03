export const dateWithHackXd = (date: Date) => {
    date.setHours(8)
        return date.toISOString().slice(0, 10)
};
