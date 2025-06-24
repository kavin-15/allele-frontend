import React, {useState} from "react";

const AlleleSelector = ({onSelectionChange})=>{
    const allele = ["Different Allele"];
    const regions = ["Different Regions"];
    const timeperiods = ["Different time periods"];

    const [selectedAllele, setselectedAllele] = useState(allele[0]);
    const [selectedregions, setselectedregion] = useState(regions[0]);
    const [selectedtimeperiod, setselectedtimeperiod] = useState(timeperiods[0]);

    const handleChange = (type, value) => {
        const newAllele = type === "allele" ? value: selectedAllele;
        const newregions = type === "region" ? value: selectedregions;
        const newtimeperiods = type === "allele" ? value: selectedtimeperiod;

        setselectedAllele(newAllele);
        setselectedregion(newregions);
        setselectedtimeperiod(newtimeperiods);

        if(onSelectionChange){
            onSelectionChange({
                allele: newAllele,
                regions: newregions,
                timeperiods: newtimeperiods
            });
        }
    };
    return(
        <div style={{padding:'20px'}}>
             <label>
                Allele:
                <select value={selectedAllele} onChange={e => handleChange("allele", e.target.value)}>
                {allele.map((allele, index) => (
                    <option key={index} value={allele}>{allele}</option>
                ))}
                </select>
            </label>

            <label style={{ marginLeft: '20px' }}>
                Region:
                <select value={selectedregions} onChange={e => handleChange("region", e.target.value)}>
                {regions.map((region, index) => (
                    <option key={index} value={region}>{region}</option>
                ))}
                </select>
            </label>

            <label style={{ marginLeft: '20px' }}>
                Time Period:
                <select value={selectedtimeperiod} onChange={e => handleChange("timePeriod", e.target.value)}>
                {timeperiods.map((period, index) => (
                    <option key={index} value={period}>{period}</option>
                ))}
                </select>
            </label>
        </div>
    );
};

export default AlleleSelector;