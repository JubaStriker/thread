"use client"

interface Props {
    dateString: string;
}

const LocalTime = ({ dateString }: Props) => {
    const date = new Date(dateString);

    const time = date.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
    });

    const formattedDate = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return <>{`${time} - ${formattedDate}`}</>;
};

export default LocalTime;
