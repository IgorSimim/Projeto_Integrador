import React from "react";

export default function Usuariopdf(props) {
  const handleGeneratePDF = () => {
    if (props.gerar) {
      props.gerar();
    }
  };

  return (
    <div>
      <button
        className="btn btn-info"
        type="button"
        onClick={handleGeneratePDF}
      >
        Gerar PDF
      </button>
    </div>
  );
}
