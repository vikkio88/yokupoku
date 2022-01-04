import { useTheme } from 'next-themes';

const getColour = percent => {
    const r = percent < 50 ? 255 : Math.floor(255 - (percent * 2 - 100) * 255 / 100);
    const g = percent > 50 ? 255 : Math.floor((percent * 2) * 255 / 100);
    return 'rgb(' + r + ',' + g + ',0)';
};

const RoundIndicator = ({
    radius = 60, stroke = 5, max = 100,
    value = 10, showRail = true, invertColour = false,
    railColour = "#eaeaea", textColour = "black",
    style = {}, children = null, forceText = null
}) => {
    const { theme } = useTheme();
    textColour = theme === "dark" ? "white" : textColour;
    const colour = getColour(invertColour ? (max - value) : value);
    const cx = radius;
    const cy = radius;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - ((value / max) * circumference);
    const circleProps = {
        fill: "transparent",
        strokeWidth: stroke,
        strokeDasharray: `${circumference} ${circumference}`,
        r: normalizedRadius,
        cx,
        cy
    };
    return (
        <svg
            style={style}
            height={radius * 2}
            width={radius * 2}
        >
            {showRail && (
                <circle
                    stroke={railColour}
                    {...circleProps}
                />
            )}
            <circle
                stroke={colour}
                style={{ strokeDashoffset }}
                {...circleProps}
            />
            <text textAnchor="middle" x="50%" y="50%" dy={children ? ".1em" : ".3em"} style={{ fill: textColour, fontSize: '1.8em' }}>{forceText || value}</text>
            {children && <text textAnchor="middle" x="50%" y="50%" dy="1.3em" style={{ fill: textColour }}>{children}</text>}
        </svg>
    );
};

export default RoundIndicator;