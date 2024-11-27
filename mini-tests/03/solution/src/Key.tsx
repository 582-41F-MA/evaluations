type KeyProps = {
    value: string;
    onClick: (value: string) => void;
};

export default function Key({ value, onClick }: KeyProps) {
    function handleClick(): void {
        onClick(value);
    }

    return <button onClick={handleClick}>{value}</button>;
}
