import React from "react";

const SizeTable = () => {
  const sizes = [
    { label: "S", height: "159-171", chest: "88-96", waist: "74-79", hip: "88-94" },
    { label: "M", height: "172-177", chest: "96-100", waist: "84-88", hip: "96-100" },
    { label: "L", height: "178-183", chest: "100-104", waist: "88-92", hip: "100-104" },
    { label: "XL", height: "184-189", chest: "104-108", waist: "92-96", hip: "104-108" },
    { label: "XXL", height: "190-195", chest: "108-112", waist: "96-100", hip: "108-112" },
    { label: "3XL", height: "196-201", chest: "112-118", waist: "100-106", hip: "112-118" },
    { label: "4XL", height: "202-207", chest: "118-124", waist: "106-112", hip: "118-124" },
  ];

  return (
    <div style={{ overflowX: "auto", marginTop: "20px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Velicina</th>
            <th style={thStyle}>Visina (cm)</th>
            <th style={thStyle}>Grudi (cm)</th>
            <th style={thStyle}>Struk (cm)</th>
            <th style={thStyle}>Kukovi (cm)</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((s) => (
            <tr key={s.label}>
              <td style={tdStyle}>{s.label}</td>
              <td style={tdStyle}>{s.height}</td>
              <td style={tdStyle}>{s.chest}</td>
              <td style={tdStyle}>{s.waist}</td>
              <td style={tdStyle}>{s.hip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  // border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#f2f2f2",
  textAlign: "center",
};

const tdStyle = {
  // border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
};

export default SizeTable;
