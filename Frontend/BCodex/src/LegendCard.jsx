import { memo } from "react";

const LegendCard = memo(function LegendCard({ legend }) {
    return (
        <a
            href={`legend.html?id=${legend["ID"]}`}
            data-index={legend["ID"]}
            className="legend-profile"
            style={{ "--accent-color": legend["AccentColor"] }}
        >
            <span className="roster-number" data-index={legend["ID"] + 1}></span>
            <div className="legend-image">
                <img src={legend["Icon"]} alt="" />
            </div>
            <div className="legend-information">
                <p>{legend["Weapon-1"]} — {legend["Weapon-2"]}</p>
                <h3>{legend["Name"]}</h3>
            </div>
        </a>
    );
});

export default LegendCard;